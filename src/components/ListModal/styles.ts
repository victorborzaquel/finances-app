import { FlatList } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { DataProps } from ".";
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

export const List = styled(FlatList as new () => FlatList<DataProps>)`
  
`;

export const ItemSeparator = styled.View`
  /* width: 100%; */
  background-color: ${({ theme}) => theme.colors.line};
  margin-left: ${({ theme }) => theme.display.padding_app}px;
  margin-right: ${({ theme }) => theme.display.padding_app * 2}px;
  height: 1px;
`;
export const Item = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.display.padding_app / 2}px;
  padding-left: ${({ theme }) => theme.display.padding_app}px;
`;

export const ItemTitle = styled.Text`
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
  padding-left: ${({ theme }) => theme.display.padding_app}px;
`;