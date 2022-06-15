import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: ${RFValue(55) + getStatusBarHeight()}px;
  padding: ${({ theme }) => theme.display.padding_app}px;
  padding-bottom: ${({ theme }) => theme.display.padding_app / 1.5}px;
  background-color: ${({ theme }) => theme.colors.main};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.background_secondary};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const IconButton = styled.TouchableOpacity.attrs({ activeOpacity: 0.6 })`
  margin-left: ${({ theme }) => theme.display.padding_app}px;
  padding: 3px;
  justify-content: center;
  align-items: center;
`;

export const Icons = styled.View`
  flex-direction: row;
`;

export const Wrapper = styled.View`
  padding-left: ${({ theme }) => theme.display.padding_app}px;
`;