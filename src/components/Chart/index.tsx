import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { t } from 'i18n-js';
import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { VictoryPie } from 'victory-native';
import ColorsData from '../../data/ColorsData';
import { TransactionType } from '../../global/interfaces';
import { ITotalBalance, ITotalByCategories } from '../../hooks/data';
import { useLocalization } from '../../hooks/localization';


import {
  Amount,
  Category,
  CategoryButton,
  Container,
  Content,
  Name,
  Total
} from './styles';

type Props = {
  data: {
    balance: ITotalBalance[TransactionType];
    balanceByCategories: ITotalByCategories[TransactionType];
  }
  goTo(categoryId: string): void;
}

export function Chart({ data, goTo }: Props) {
  const { balance, balanceByCategories } = data
  const theme = useTheme()
  const { toCurrency } = useLocalization()
  const isFocused = useIsFocused()
  const scrollRef = useRef<ScrollView>()

  const VictoryPieData = balanceByCategories.filter(category => category.percentage > 0)

  const BalanceList = () => (
    <>
      {balanceByCategories.map(category => (
        <Category key={category.id} color={ColorsData[category.color_name]}>
          <CategoryButton onPress={() => goTo(category.id)}>
            <Name>{category.name}</Name>
            <Amount>{toCurrency(category.amount)}</Amount>
          </CategoryButton>
        </Category>
      ))}
    </>
  )

  useEffect(() => {
    if (!isFocused) scrollRef.current?.scrollTo({ y: 0, animated: false })
  }, [isFocused])

  return (
    <Container
      contentContainerStyle={{
        paddingBottom: useBottomTabBarHeight(),
      }}
      ref={scrollRef as any}
    >
      <Content>
        <VictoryPie
          data={VictoryPieData}
          colorScale={VictoryPieData.map(category => ColorsData[category.color_name])}
          style={{
            labels: {
              fontSize: theme.fonts.size.medium,
              fontFamily: theme.fonts.family.title,
              fontWeight: 'bold',
              fill: theme.colors.background_secondary
            }
          }}
          labelRadius={80}
          x="percentageFormatted"
          y="amount"
          animate={{
            duration: 300,
          }}
        />

        {!!balance && <Total>{t('Total') + ': ' + toCurrency(balance)}</Total>}

        <BalanceList />
      </Content>
    </Container>
  );
}
