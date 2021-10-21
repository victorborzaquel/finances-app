import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled, { DefaultTheme } from "styled-components/native";

export const Container = styled.View<{color: keyof DefaultTheme['colors']}>`
  height: ${getStatusBarHeight()}px;
  width: 100%;
  background-color: ${({ theme, color }) => theme.colors[color]};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
`;
