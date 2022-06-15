import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ButtonType } from "../../global/interfaces";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View<{ color: ButtonType }>`
  width: 100%;
  height: ${getStatusBarHeight() + RFValue(165)}px;
  background-color: ${({ theme, color }) => theme.colors[color]};
  padding-top: ${getStatusBarHeight() + RFValue(20)}px;
`;

export const GoBackButtonWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.display.padding_app}px;
`;

export const DeleteTransactionButton = styled.TouchableOpacity`
  
`;

export const AmountButton = styled.TouchableOpacity`
flex: 1;
align-items: flex-end;
justify-content: flex-end;
`;

export const Transfer = styled.TouchableOpacity.attrs({ activeOpacity: 0.6 })`
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

export const TransferIndicator = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.display.padding_app / 2}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const TransferTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const Amount = styled.Text.attrs({
  adjustsFontSizeToFit: true,
  numberOfLines: 1
})`
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.extra_largue * 1.5}px;
  padding: ${({ theme }) => theme.display.padding_app}px;
`;

export const Form = styled.ScrollView`
  width: ${({ theme }) => theme.display.window_width}px;
  padding: 0 ${({ theme }) => theme.display.padding_app}px;
`;

export const Footer = styled.View`
  padding: ${({ theme }) => theme.display.padding_app}px;

`;
