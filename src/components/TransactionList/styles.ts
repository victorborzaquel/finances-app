import { FlatList } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components/native";
import { ITransaction, TransactionType } from "../../global/interfaces";

export const Container = styled.View`
  flex: 1;
`;

export const Transaction = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.display.padding_app / 2}px;
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