function isSameDay(first: Date, second: Date){
  const firstDate = new Date(first)
  const secondDate = new Date(second)
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  )
}

function isSameMonth(first: Date, second: Date){
  const firstDate = new Date(first)
  const secondDate = new Date(second)
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth()
  )
}

function isSameYear(first: Date, second: Date){
  return (
    new Date(first).getFullYear() === new Date(second).getFullYear()
  )
}

export {
  isSameDay,
  isSameMonth,
  isSameYear
}