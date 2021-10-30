import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ICategory } from "../../global/interfaces";

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

export const Buttons = styled.View`
  flex-direction: row;
`;

export const Inputs = styled.View`
  padding: ${({theme}) => theme.display.padding_app}px;
`;