import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, NativeSyntheticEvent, NativeScrollEvent, Platform } from 'react-native'
import { useTheme } from 'styled-components/native'
import { GoBackButton } from '../../components/GoBackButton'
import { InputModal } from '../../components/InputModal'
import { InputToggle } from '../../components/InputToggle'
import { UIButton } from '../../components/UIButton'
import { ButtonType, IAccount, ICategory, TransactionType } from '../../global/interfaces'
import { useLocalization } from '../../hooks/localization'
import DateTimePicker from '@react-native-community/datetimepicker'
import { InputText } from '../../components/InputText'
import { useAuth } from '../../hooks/auth'
import UUID from 'react-native-uuid'

import {
  Amount,
  AmountButton,
  Buttons,
  Container, 
  Footer, 
  Form, 
  Forms, 
  GoBackButtonWrapper, 
  Header,
} from './styles';
import { CalculatorModal } from '../../components/CalculatorModal';
import { CategoryModal } from '../../components/CategoryModal';
import { AccountModal } from '../../components/AccountModal'
import { otherCategory } from '../../data/CategoryDefaultData'
import { RootTransactionsRouteProps } from '../../routes/TransactionsRoutes'

export function TransactionEdit() {
  const route = useRoute<RootTransactionsRouteProps<'TransactionEdit'>>()
  console.log(route.params)

  return (
    <Container>

    </Container>
  );
}
