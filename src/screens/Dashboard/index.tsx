import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { AvatarImage } from '../../components/AvatarImage';
import { StatusBarBackground } from '../../components/StatusBarBackground';
import { UIIcon } from '../../components/UIIcon';
import { shadow } from '../../global/styles/shadow';
import { useAuth } from '../../hooks/auth';
import { useStyle } from '../../hooks/style';
import { RootDashboardNavigationProps } from '../../routes/DashboardRoutes';

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

export function Dashboard() {
  const { user } = useAuth();
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
            <Feather
              name="settings"
              color={theme.colors.background}
              size={RFValue(24)}
            />
          </SettingButton>
        </HeaderContent>
      </Header>

      <Content>
        <AccountBalance>
          <BalanceHeader>
            <Wrapper>
              <BalanceText>Total na sua conta</BalanceText>
              <BalanceAmount style={hideAmount()}>R$ 3.000,00</BalanceAmount>
            </Wrapper>

            <IconEyeButton>
            <Feather
              name={amountVisible ? "eye" : "eye-off"} 
              size={24} 
              color={theme.colors.title} 
              onPress={handleAmountVisible}
            />
            </IconEyeButton>
          </BalanceHeader>

          <TransactionsBalance>
            <BalanceButton>
              <BalanceText>Receitas</BalanceText>
              <TransactionAmount type="income" style={hideAmount()}>R$ 5.000,00</TransactionAmount>
            </BalanceButton>

            <BalanceButton>
              <BalanceText>Despesas</BalanceText>
              <TransactionAmount type="expense" style={hideAmount()}>R$ 2.000,00</TransactionAmount>
            </BalanceButton>
          </TransactionsBalance>
        </AccountBalance>
        <UIIcon icon_name="home" color_name="orange" />
      </Content>

    </Container>
  );
}
