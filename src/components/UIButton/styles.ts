import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ButtonType } from "../../global/interfaces";

interface IContainer {
  press: boolean;
  color: ButtonType;
  heightDivider: number;
}

interface ITitle {
  press: boolean;
  color: ButtonType;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
}) <IContainer>`
  height: ${({ theme, heightDivider }) => theme.display.button_height / heightDivider}px;
  width: 100%;
  flex-shrink: 1;
  background-color: ${({ theme, press, color }) => press
    ? theme.colors[`${color}_hover_background`]
    : theme.colors[`${color}_background`]
  };
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text.attrs({
  adjustsFontSizeToFit: true,
  numberOfLines: 1
}) <ITitle>`
  color: ${({ theme, press, color }) => press
    ? theme.colors[`${color}_hover_title`]
    : theme.colors[`${color}_title`]
  };
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
  padding: 0 ${RFValue(10)}px;
`;