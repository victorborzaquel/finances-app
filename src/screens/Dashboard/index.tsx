import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { AvatarImage } from '../../components/AvatarImage';
import { StatusBarBackground } from '../../components/StatusBarBackground';
import { shadow } from '../../global/styles/shadow';
import { useAuth } from '../../hooks/auth';
import { useLocalization } from '../../hooks/localization';
import { useStyle } from '../../hooks/style';
import { RootDashboardNavigationProps } from '../../routes/DashboardRoutes';4
import  * as Localization from 'expo-localization';
import { UIIcon } from '../../components/UIIcon';
import { isSameMonth } from '../../utils/dateUtils'

import {
  AccountBalance,
  BalanceAmount,
  BalanceButton,
  BalanceHeader,
  BalanceText,
  Container,
  Content,
  Greetings,
  GreetingText,
  Header,
  HeaderContent,
  IconEyeButton,
  SettingButton,
  TransactionAmount,
  TransactionsBalance,
  UserAvatar,
  UserName,
  Wrapper
} from './styles';
import I18n from 'i18n-js';

export function Dashboard() {
  const { user, transactions } = useAuth();
  const { toCurrency } = useLocalization();
  const theme = useTheme();
  const style = useStyle();
  const navigation = useNavigation<RootDashboardNavigationProps<'Dashboard'>>();

  const [amountVisible, setAmountVisible] = useState(true);

  function getGreetingTime() {
    const HourNow = new Date().getHours();

    if (HourNow >= 6 && HourNow < 12) {
      return 'Bom dia';
    } else if (HourNow >= 12 && HourNow <= 18) {
      return 'Boa tarde';
    } else {
      return 'boa noite';
    }
  }

  function handleSettingsPress() {
    navigation.navigate('Settings');
  }

  function handleAmountVisible() {
    setAmountVisible(curr => !curr)
  }

  function hideAmount() {
    return !amountVisible && style.money.hide;
  }

  function getBalance() {
    return transactions.reduce((acc, curr) => {
      if (!curr.confirmed) return acc

      switch (curr.type) {
        case 'expense' : return Number(acc) - Number(curr.amount)
        case 'income' : return Number(acc) + Number(curr.amount)
        default : return acc
      }
    }, 0)
  }

  const mothBalance = (() => transactions.reduce((acc, curr) => {
      if (!curr.confirmed || !isSameMonth(curr.date, new Date())) return acc

      const { expense, income } = acc

      switch (curr.type) {
        case 'income': return {expense, income: Number(income) + Number(curr.amount)}
        case 'expense': return {income, expense: Number(expense) + Number(curr.amount)}
        default: return acc
      }
  }, {expense: 0, income: 0}))()
  
  return (
    <Container>
      <StatusBarBackground color="main" />
      <Header>
        <HeaderContent>
          <UserAvatar>
            <AvatarImage />
            <Greetings>
              <GreetingText>{getGreetingTime()}</GreetingText>
              <UserName>{user.first_name}</UserName>
            </Greetings>
          </UserAvatar>

          <SettingButton style={shadow.two} onPress={handleSettingsPress}>
            <UIIcon
              icon_interface="settings"
              color="background"
              size={24}
            />
          </SettingButton>
        </HeaderContent>
      </Header>

      <Content>
        <AccountBalance>
          <BalanceHeader>
            <Wrapper>
              <BalanceText>Total na sua conta</BalanceText>
              <BalanceAmount style={hideAmount()}>{toCurrency(getBalance())}</BalanceAmount>
            </Wrapper>

            <IconEyeButton onPress={handleAmountVisible}>
              <UIIcon icon_interface={amountVisible ? "eye" : "eye-off"} size={24}  />
            </IconEyeButton>
          </BalanceHeader>

          <TransactionsBalance>
            <BalanceButton>
              <BalanceText>Receitas</BalanceText>
              <TransactionAmount type="income" style={hideAmount()}>{toCurrency(mothBalance.income)}</TransactionAmount>
            </BalanceButton>

            <BalanceButton>
              <BalanceText>Despesas</BalanceText>
              <TransactionAmount type="expense" style={hideAmount()}>{toCurrency(mothBalance.expense)}</TransactionAmount>
            </BalanceButton>
          </TransactionsBalance>
        </AccountBalance>
        
        {/* <UIIcon icon_name="home" color_name="orange" /> */}
      </Content>
    </Container>
  );
}
