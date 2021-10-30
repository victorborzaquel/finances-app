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
import DraggableFlatList from 'react-native-draggable-flatlist'

import {
  AccountBalance,
  AvatarButton,
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
import { t } from 'i18n-js'
import { useData } from '../../hooks/data';
import { RootSignInNavigationProps } from '../../routes/SignInRoutes';
import { TransactionType } from '../../global/interfaces';
import { UIButton } from '../../components/UIButton';
import { Card } from '../../components/Card';
import { PaidCard } from '../../components/PaidCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AccountCard } from '../../components/AccountCard';

export function Dashboard() {
  const { user, transactions, updateData, updateUser } = useAuth();
  const { toCurrency } = useLocalization();
  const [date, setDate] = useState(new Date())
  
  const navigation = useNavigation<RootDashboardNavigationProps<'Dashboard'>>();
  const navigationTab = useNavigation<RootSignInNavigationProps<'DashboardRoutes'>>();

  const [amountVisible, setAmountVisible] = useState(true);

  const [cardVisible, setCardVisible] = useState([true]);
  
  const theme = useTheme();
  const style = useStyle();
  const {getBalance, filterTransactions, replaceFilter} = useData()

  const balance = getBalance(new Date())

  function getGreetingTime() {
    const HourNow = new Date().getHours();

    if (HourNow >= 6 && HourNow < 12) {
      return t('Good Morning');
    } else if (HourNow >= 12 && HourNow <= 18) {
      return t('Good afternoon');
    } else {
      return t('Good night');
    }
  }

  function handleSettings() {
    navigation.navigate('Settings');
  }
  function handleUserDetails() {
    navigation.navigate('UserDetails');
  }

  function handleEditHome() {
    navigation.navigate('EditDashboard');
  }

  function handleAmountVisible() {
    updateUser({...user, money_hide: !user.money_hide})
  }

  function hideAmount() {
    return user.money_hide && style.money.hide;
  }

  function handleTransactions({transactionType, accountId}: {
    transactionType?: TransactionType;
    accountId?: string;
  }) {
    if (transactionType) replaceFilter({ date, transactionType })
    if (accountId) replaceFilter({ date, accountId })

    navigationTab.navigate('TransactionsRoutes', { screen: 'Transaction' })
  }

  return (
    <>
    <StatusBarBackground color="main" />
    <Container>
      
      <Header>
        <HeaderContent>
          <UserAvatar>
            <AvatarButton onPress={handleUserDetails}>
              <AvatarImage />
            </AvatarButton>
            
            <Greetings>
              <GreetingText>{getGreetingTime()}</GreetingText>
              <UserName>{user.first_name}</UserName>
              {/* <UserName>Date: Abril</UserName> */}
            </Greetings>
          </UserAvatar>

          {/* <SettingButton style={shadow.two} onPress={handleSettings}>
            <UIIcon
              icon_interface="settings"
              color="background"
              size={24}
            />
          </SettingButton> */}
        </HeaderContent>
      </Header>

      <Content>
        <AccountBalance>
          <Card contentPadding>
            <BalanceHeader>
              <BalanceButton onPress={() => handleTransactions({})}>
                <BalanceText>{t('Accounts balance')}</BalanceText>
                <BalanceAmount style={hideAmount()}>{toCurrency(balance.income - balance.expense)}</BalanceAmount>
              </BalanceButton>

              <IconEyeButton onPress={handleAmountVisible}>
                <UIIcon icon_interface={amountVisible ? "eye" : "eye-off"} size={24}  />
              </IconEyeButton>
            </BalanceHeader>

            <TransactionsBalance>
              <BalanceButton enabled={!user.money_hide} onPress={() => handleTransactions({transactionType:'income'})}>
                <BalanceText>{t('Incomes')}</BalanceText>
                <TransactionAmount type="income" style={hideAmount()}>{toCurrency(balance.income)}</TransactionAmount>
              </BalanceButton>

              <BalanceButton enabled={!user.money_hide} onPress={() => handleTransactions({transactionType:'expense'})}>
                <BalanceText>{t('Expenses')}</BalanceText>
                <TransactionAmount type="expense" style={hideAmount()}>{toCurrency(balance.expense)}</TransactionAmount>
              </BalanceButton>
            </TransactionsBalance>
          </Card>
        </AccountBalance>

        <PaidCard type="expense" />
        <PaidCard type="income" />
        <AccountCard goTo={handleTransactions} />
        
        {/* <UIButton
          title="Editar página inicial"
          color="main"
          onPress={handleEditHome}
        /> */}
      </Content>
    </Container>
    </>
    
  );
}
