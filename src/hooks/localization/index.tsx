import React, { 
  createContext, 
  ReactNode, 
  useContext, 
  useEffect, 
  useState 
} from "react"
import I18n from 'i18n-js'
import { LanguageType } from "../../global/interfaces"
import { languages } from "../../global/language"
import { useAuth } from "../auth"
import  * as Localization from 'expo-localization'
import { format } from 'date-fns'
import { isSameDay } from "../../utils/dateUtils"
import { subDays, addDays } from 'date-fns'

type Convert = (key: string | number) => string;
type ConvertNumber = (key: string | number) => string | number;
type ToDate = (date: Date, type: ConvertDateType, today?: boolean) => string

type IOperatorKey = keyof typeof languages.operators.us;
type IOperatorLocale =  typeof languages.operators.us;
type ConvertDateType = keyof typeof languages.date.us.convert;

const LocalizationContext = createContext({} as {
  toCurrency: Convert;
  toMath: Convert;
  toOperator: ConvertNumber;
  toNumber: Convert;
  localizationLoaded: boolean;
  toDate: ToDate;
  toPercentage(what: number, isFor: number, precision?: number): string;
})

function LocalizationProvider({children}: {children: ReactNode}) {
  const {
    user, 
    translateDefaultData
  } = useAuth()
  const [language, setLanguage] = useState<LanguageType>('pt-BR')
  const [currency, setCurrency] = useState<LanguageType>('pt-BR')
  const [localizationLoaded, setLocalizationLoaded] = useState(false)

  I18n.locale = language
  I18n.translations = languages.dictionary
  ;(async () => { I18n.defaultLocale = await getSupportedLanguage() })()
  I18n.fallbacks = true

  const operatorsLocale = languages.operators.us
  const [operatorsKeys, operatorsValues]  = Object
    .entries(operatorsLocale)
    .reduce((acc, curr) => 
    [[...acc[0],curr[0]],[...acc[1],curr[1]]],
    [[],[]] as Array<string[]>
  )
  
  function toCurrency(amount: string | number) {
    return I18n.toCurrency(Number(amount), languages.currency[currency])
  }
  function toNumber(number: string | number) {
    return I18n.toNumber(Number(number), languages.number[language])
  }
  function toPercentage(what: number, isFor: number, precision=0) {
    return I18n.toPercentage((what / isFor * 100), { precision })
  }
  function toOperator (operator: string | number) {
    const operatorName = operatorsKeys[operatorsValues.indexOf(String(operator))] as IOperatorKey
    if (!operatorName) return operator
    return languages.operators[language][operatorName]
  }
  function toMath (math: string | number) {
    return String(math)
      .trim()
      .split(' ')
      .map(item => operatorsValues.includes(item) ? toOperator(item) : toNumber(item))
      .join(' ')
  }
  function toDate(date: Date, type: ConvertDateType, today?: boolean) {
    if (today) {
      if (isSameDay(date, new Date())) return languages.calendar[language].today
      else if (isSameDay(date, subDays(new Date(), 1))) return languages.calendar[language].yesterday
      else if (isSameDay(date, addDays(new Date(), 1))) return languages.calendar[language].tomorrow
    }
    const { convert, locale } = languages.date[language]

    return format(new Date(date), convert[type], { locale })
  }

  async function getSupportedLanguage() {
    const { locale } = await Localization.getLocalizationAsync()
    const country = locale.split('-')[0]
    
    switch (country) {
      case 'pt': return 'pt-BR'
      case 'us': return 'us'
      default: return 'us'
    }
  }

  async function setCurrentLanguage() {
    setLocalizationLoaded(false)
    
    try {
      const currLanguage = await getSupportedLanguage()

      if (user.language !== 'auto') {
        setLanguage(user.language)
        I18n.locale = user.language
      } else {
        setLanguage(currLanguage)
        I18n.locale = currLanguage
      }

      if (user.currency !== 'auto') {
        setCurrency(user.currency)
      } else {
        setCurrency(currLanguage)
      }

      translateDefaultData()
    } catch (error: any) {
      throw new Error(error)
    } finally {
      
      setLocalizationLoaded(true)
    }
  }

  useEffect(() => {
    setCurrentLanguage()
  },[user.language, user.currency])
  
  return (
    <LocalizationContext.Provider value={{
      toCurrency,
      toMath,
      toNumber,
      toOperator,
      toDate,
      toPercentage,
      localizationLoaded,
    }}>
      {children}
    </LocalizationContext.Provider>
  )
}

function useLocalization() {
  const context = useContext(LocalizationContext)
  return context
}

export {
  LocalizationProvider,
  useLocalization
}