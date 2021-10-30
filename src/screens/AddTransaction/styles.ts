import { Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ButtonType } from "../../global/interfaces";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View<{color: ButtonType}>`
  width: 100%;
  height: ${getStatusBarHeight() + RFValue(200)}px;
  background-color: ${({ theme, color }) => theme.colors[color]};
  justify-content: flex-end;
  align-items: flex-end;
`;

export const GoBackButtonWrapper = styled.View`
  position: absolute;
  top: ${({ theme }) => getStatusBarHeight() + theme.display.padding_app}px;
  left: ${({ theme }) => theme.display.padding_app}px;
`;

export const AmountButton = styled.TouchableOpacity``;

export const Amount = styled.Text.attrs({
  adjustsFontSizeToFit: true,
  numberOfLines: 1
})`
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.extra_largue * 1.5}px;
  padding: ${({ theme }) => theme.display.padding_app}px;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;

export const Forms = styled.ScrollView.attrs({
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: false,
  // bounces: false,
})`
  flex: 1;
`;

export const Form = styled.ScrollView`
  width: ${({ theme })=> theme.display.window_width}px;
  padding: 0 ${({ theme }) => theme.display.padding_app}px;
`;

export const TransferIndicator = styled.View`
  align-items: center;
  padding: ${({ theme }) => theme.display.padding_app / 2}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const TransferText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const Footer = styled.View`
  padding: ${({ theme }) => theme.display.padding_app}px;
`;