import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
`;

export const CloseModal = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; 
`;

export const Modal = styled.Modal.attrs({
  animationType: 'slide',
  transparent: true,
})``;

export const Content = styled.View`
  background-color: ${({theme}) => theme.colors.background_secondary};
  top: ${({theme}) => (
    theme.display.window_height 
    - (theme.display.button_height + RFValue(100) + theme.display.window_width)
  )}px;
  height: ${({theme}) => (
    theme.display.button_height + RFValue(100) + theme.display.window_width

  )}px;
  width: 100%;
  border-top-right-radius: ${({theme}) => theme.display.padding_app}px;
  border-top-left-radius: ${({theme}) => theme.display.padding_app}px;
  justify-content: space-between;
`;

export const Display = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => theme.display.padding_app}px;
  height: ${RFValue(100)}px;
`;

export const Total = styled.Text.attrs({
  numberOfLines: 2
})`
  font-family: ${({ theme }) => theme.fonts.family.title};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fonts.size.extra_largue}px;
  text-align: right;
  flex-shrink: 1;
  margin-left: 7px;
`;

export const Delete = styled.TouchableOpacity`
  padding-left: ${({ theme }) => theme.display.padding_app}px;
`;

export const CalculatorButtons = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.line};
`;


export const Buttons = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.colors.line};
`;

export const ButtonContainer = styled.TouchableOpacity`

`;

export const ButtonWrapper = styled.View`
  width: ${({theme}) => theme.display.window_width / 4}px;
  height: ${({theme}) => theme.display.window_width / 4}px;
  justify-content: center;
  align-items: center;
`;

export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.extra_largue}px;
`;