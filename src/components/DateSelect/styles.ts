import { BorderlessButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: ${({ theme })=> theme.display.button_height / 1.3}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Arrows = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 ${({ theme }) => theme.display.padding_app * 2}px;
`;

export const ChangeDateButton = styled(BorderlessButton)`
  
`;

export const SelectDateButton = styled.TouchableOpacity`
  position: absolute;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;