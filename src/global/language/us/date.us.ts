import locale from 'date-fns/locale/en-US'

export const us_Date = {
  convert: {
    month: 'MMMM',
    allDate: 'MM LLL yyyy dd',
    shortMonth: 'MM',
    fullMonth: 'MMMM yyyy',
    semiMonth: 'MM yyyy',
    dayOfWeek: 'EEEE dd',
    shortDayOfWeek: 'EE, dd'
  },
  locale,
}