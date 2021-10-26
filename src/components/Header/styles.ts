import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme}) => theme.display.padding_app}px;
  padding-top: ${({theme}) => theme.display.padding_app + getStatusBarHeight()}px;
  background-color: ${({ theme }) => theme.colors.main};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const Icons = styled.View`
  flex-direction: row;
`;

export const Wrapper = styled.View`
  padding-left: 20px;
`;