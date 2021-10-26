import React, { useEffect } from 'react';
import  * as Localization from 'expo-localization';

import {
  Container
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, View } from 'react-native';
import { languages } from '../../global/language';
import { useLocalization } from '../../hooks/localization';
import { useAuth } from '../../hooks/auth';


const { CURRENT_USER_ID_KEY } = process.env;
const { USER_KEY } = process.env;
const { TRANSACTIONS_KEY } = process.env;
const { TRANSFERS_KEY } = process.env;
const { CREDIT_CARDS_KEY } = process.env;
const { CREDIT_CARDS_TRANSACTIONS_KEY } = process.env;
const { CATEGORIES_KEY } = process.env;
const { ACCOUNTS_KEY } = process.env;
const { EXPENSES_LIMIT_KEY } = process.env;

export function Test() {
  const {toMath, toOperator} = useLocalization()
  const {transactions } = useAuth()
  async function view() {
    // const userId = '551440f5-4045-455b-9262-a03fcca87deb'
    console.log(transactions)
    // console.log(toOperator('/'))
    }


  useEffect(() => {

  },[])

  return (
    <Container>
      <View style={{height: 200}} />
        <Button title="test" onPress={view} />
    </Container>
  );
}
