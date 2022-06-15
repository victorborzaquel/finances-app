
import styled from "styled-components/native";
import { TransactionType } from "../../global/interfaces";

export const Container = styled.View`
  flex: 1;
`;

export const Transaction = styled.View`
  flex: 1;
`;

export const TransactionButton = styled.TouchableOpacity.attrs({ activeOpacity: 0.6 })`
  width: 100%;
  padding: ${({ theme }) => theme.display.padding_app / 2}px;
`;

export const Header = styled.View`
  align-items: flex-end;
  padding-right: ${({ theme }) => theme.display.padding_app / 2}px;
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.small}px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;