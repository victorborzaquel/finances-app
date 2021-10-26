import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ButtonType } from "../../global/interfaces";

interface Props {
  press: boolean;
  color: ButtonType;
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<Props>`
  height: ${({ theme }) => theme.display.button_height}px;
  width: 100%;
  flex-shrink: 1;
  background-color: ${({ theme, press, color }) => press 
    ? theme.colors[color]
    : theme.colors[`${color}_background`]
  };
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text.attrs({
  adjustsFontSizeToFit: true,
  numberOfLines: 1
})<Props>`
  color: ${({ theme, press, color }) => press
    ? theme.colors[`${color}_background`]
    : theme.colors[color]
  };
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
  padding: ${RFValue(10)}px;
`;