import { FlatList } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components/native";
import { ITransaction, ITransfer, TransactionType } from "../../global/interfaces";

export const Container = styled.View<{space: number}>`
  flex: 1;
  /* padding-bottom: ${({ space }) => space + getBottomSpace()}px; */
`;

export const HeaderButton = styled(BorderlessButton)`
  padding: 3px;
  justify-content: center;
  align-items: center;
`;

export const BalanceButton = styled(RectButton)<{align?: 'flex-end' | 'flex-start' | 'center'}>`
  align-items: ${({align}) => align || 'flex-start'};
  padding: 5px 0;
  width: 33%;
  justify-content: space-between;
`;

export const BalanceText = styled.Text.attrs({
  adjustsFontSizeToFit: true,
  numberOfLines: 1
})`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.small}px;
`;

export const BalanceAmount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.largue}px;
`;

export const TransactionsBalance = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background_secondary}90;
  padding: 0 ${({ theme }) => theme.display.padding_app}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.line};
`;

export const BalanceWrapper = styled.View`
  /* padding: 10px 0; */
`;

export const TransactionAmount = styled.Text.attrs({
  adjustsFontSizeToFit: true,
  numberOfLines: 1
})<{type: TransactionType}>`
  color: ${({ theme, type }) => {
    switch (type) {
      case 'expense': return theme.colors.attention_dark
      case 'income': return theme.colors.success_dark
      default: return theme.colors.secondary_dark
    }
  }};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;


export const TransactionList = styled(FlatList as new () => FlatList<ITransaction | ITransfer>)`

`;

export const TransactionHeader = styled.View`
  width: 100%;
  padding: ${({ theme }) => theme.display.padding_app}px;
  padding-bottom: ${({ theme }) => theme.display.padding_app / 2}px;
`;

export const TransactionHeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const Transaction = styled(RectButton)<{confirmed: boolean}>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.display.padding_app / 2}px;
  padding-left: ${({ theme }) => theme.display.padding_app}px;
  padding-right: ${({ theme }) => theme.display.padding_app}px;
  background-color: ${({ theme, confirmed }) => confirmed ? 'transparent' : theme.colors.attention_background};
`;

export const Description = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Titles = styled.View`
  padding-left: ${({ theme }) => theme.display.padding_app / 2}px;
`;

export const CategoryTitle = styled.Text`
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const AccountTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.small}px;
  line-height: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const Transfer = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.display.padding_app / 2}px;
  padding-left: ${({ theme }) => theme.display.padding_app}px;
  padding-right: ${({ theme }) => theme.display.padding_app}px;
`;

export const TransferDescription = styled.View`
  align-items: center;
`;

export const TransferTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const Amount = styled.Text<{type: TransactionType}>`
  color: ${({ theme, type }) => {
    switch (type) {
      case 'income': return theme.colors.success_dark
      case 'expense': return theme.colors.attention_dark
      case 'transfer': return theme.colors.secondary_dark
      case 'credit-card': return theme.colors.title
      default: return theme.colors.title
    }   
  }};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;