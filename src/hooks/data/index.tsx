import React, { createContext, ReactNode, useContext, useState } from 'react'
import { ICategory, IFilter, ITransaction, ITransfer, IUpdateFilter } from '../../global/interfaces'
import { isSameMonth } from '../../utils/dateUtils'
import { useAuth } from '../auth'

export interface ITotalByCategory extends ICategory {
  amount: number;
  categoryPercentage: string;
  percentage: number;
  percentageFormatted: string;
}

export interface ITotalByCategories {
  expense: ITotalByCategory[];
  income: ITotalByCategory[];
  transfer: ITotalByCategory[];
  'credit-card': ITotalByCategory[];
}

export interface ITotalBalance {
  expense: number;
  income: number;
  transfer: number;
  'credit-card': number;
  date: Date;
}

export interface IUseBalance {
  balance: ITotalBalance;
  balanceByCategories: ITotalByCategories;
}

const DataContext = createContext({} as {
  getBalance(date: Date, useFilter?: boolean): ITotalBalance;
  getBalanceByCategories(date: Date): ITotalByCategories;
  filterTransactions(): (ITransaction | ITransfer)[];
  updateFilter(filter: IFilter): void;
  replaceFilter(filter: IFilter): void;
  resetFilter(): void;
  filter: IFilter;
})

export const useData = () => useContext(DataContext)

export function DataProvider({children}: {children: ReactNode}) {
  const [filter, setFilter] = useState({date: new Date()} as IFilter)

  const auth = useAuth()

  function getBalance(date: Date, useFilter?: boolean) {
    const data = !!useFilter ? filterTransactions() as ITransaction[] : auth.transactions

    return data.reduce((acc, curr) => {
      if (!isSameMonth(curr.date, date)) return acc
      if (Object.keys(curr).includes('confirmed') && !curr.confirmed) return acc

      return {...acc, [curr.type]: Number(acc[curr.type]) + Number(curr.amount)}
    }, {date, expense: 0, income: 0, transfer: 0 ,'credit-card': 0})
  }

  function getBalanceByCategories(date: Date): ITotalByCategories{
    const balance = getBalance(date)
    
    const totalByCategory = [] as ITotalByCategory[]
    auth.categories.forEach(category => {
      const categoryBalance = auth.transactions.reduce((acc, curr) => {
        const isCountable = curr.category_id === category.id && isSameMonth(curr.date, balance.date) && curr.confirmed
        return isCountable ? acc + curr.amount : acc
      }, 0)

      const percentage = Number((categoryBalance / balance[category.type]  * 100).toFixed(0))
      
      if (categoryBalance > 0) {
        totalByCategory.push({
          ...category,
          amount: categoryBalance,
          percentage,
          percentageFormatted: `${percentage}%`,
          categoryPercentage: `${category.name}  ${percentage}%`,
        })
      }
    })

    return totalByCategory.reduce((acc, curr) => {
      const last = acc[curr.type] ? acc[curr.type] : []
      
      return {...acc, [curr.type]: [...last, curr]}
    },{expense: [], income: [], transfer: [] ,'credit-card': []})
  } 

  function filterTransactions() {
    const filtered = (a:any,b:any) => (!!a && !!b) ? (a === b) : true

    const isTransfer = Object.keys(filter).includes('transactionType')
      ? filter.transactionType === 'transfer' ? 'transfer' : 'transaction'
      : 'all'

    const checkType = (type: 'transfer' | 'transaction', data: ITransfer[] | ITransaction[]) => (
      isTransfer === 'all' || isTransfer === type
        ? data
        : []
    )

    const transfersFilter = checkType('transfer',auth.transfers
      .filter(transfer => (
          isSameMonth(transfer.date, filter.date) &&
          (filtered(transfer.account_origin_id, filter.categoryId) ||
          filtered(transfer.account_destination_id, filter.categoryId))
        )
      ))

    const transactionsFilter = checkType('transaction',auth.transactions
      .filter(transaction => (
          isSameMonth(transaction.date, filter.date) &&
          filtered(transaction.category_id, filter.categoryId) &&
          filtered(transaction.type, filter.transactionType) &&
          filtered(transaction.account_id, filter.accountId) &&
          filtered(transaction.confirmed, filter.transactionConfirmed)
        )
      ))

    return [...transfersFilter,...transactionsFilter]
      .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
  }

  function updateFilter(filter: IUpdateFilter) {
    setFilter(curr => ({...curr, ...filter}))
  }

  function replaceFilter(filter: IFilter) {
    setFilter(filter)
  }

  function resetFilter() {
    setFilter({ date: new Date()})
  }

  return (
    <DataContext.Provider value={{
      getBalance,
      getBalanceByCategories,
      filterTransactions,
      filter,
      updateFilter,
      replaceFilter,
      resetFilter
    }}>
      {children}
    </DataContext.Provider>
  )
}