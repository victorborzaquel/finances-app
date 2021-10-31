import styled from "styled-components/native";
import { ThemeColorType } from "../../global/interfaces";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.display.button_height}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text<{color: ThemeColorType}>`
  padding-left: ${({ theme }) => theme.display.padding_app}px;
  color: ${({ theme, color }) => !!color ? theme.colors[color] : theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;
