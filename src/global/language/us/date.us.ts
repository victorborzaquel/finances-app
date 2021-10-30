import locale from 'date-fns/locale/en-US'

export const us_Date = {
  convert: {
    month: 'MMMM',
    allDate: 'EE, dd LLL yyyy',
    shortMonth: 'LLL',
    fullMonth: 'MMMM yyyy',
    semiMonth: 'MM yyyy',
    dayOfWeek: 'EEEE dd',
    shortDayOfWeek: 'EE, dd'
  },
  locale,
}