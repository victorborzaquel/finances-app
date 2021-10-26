import { ptBR_Calendar } from "./ptBR/calendar.ptBR";
import { ptBR_Currency } from "./ptBR/currency.ptBR";
import { ptBR_Date } from "./ptBR/date.ptBR";
import { ptBR_Dictionary } from "./ptBR/dictionary.ptBR";
import { ptBR_Number } from "./ptBR/number.ptBR";
import { ptBR_Operators } from "./ptBR/operators.ptBR";
import { us_Calendar } from "./us/calendar.us";
import { us_Currency } from "./us/currency.us";
import { us_Date } from "./us/date.us";
import { us_Dictionary } from "./us/dictionary.us";
import { us_Number } from "./us/number.us";
import { us_Operators } from "./us/operators.us";

export const languages = {
  calendar: {
    'auto': us_Calendar,
    'pt-BR': ptBR_Calendar,
    'us': us_Calendar
  },
  dictionary: {
    'auto': us_Dictionary,
    'pt-BR': ptBR_Dictionary,
    'us': us_Dictionary
  },
  currency: {
    'auto': us_Currency,
    'pt-BR': ptBR_Currency,
    'us': us_Currency
  },
  number: {
    'auto': us_Number,
    'pt-BR': ptBR_Number,
    'us': us_Number,
  },
  operators: {
    'auto': us_Operators,
    'pt-BR': ptBR_Operators,
    'us': us_Operators,
  },
  date: {
    'auto': us_Date,
    'pt-BR': ptBR_Date,
    'us': us_Date,
  }
}