import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50%;
  padding-bottom: 30px;
  padding: ${({ theme }) => theme.display.padding_app}px;
`;

export const LogoTitle = styled.Text`
  color: ${({ theme }) => theme.colors.main};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.extra_largue}px;
`;

export const Buttons = styled.View`
  background-color: ${({ theme }) => theme.colors.main};
  flex: 1;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  padding: ${({ theme }) => theme.display.padding_app}px;
  justify-content: center;
`;

export const Button = styled(RectButton)<{loading: boolean}>`
  height: ${({ theme }) => theme.display.button_height}px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  border-radius: ${({ theme }) => theme.display.border_radius}px;
  flex-direction: row;
  align-items: center;
  opacity: ${({loading}) => loading ? 0.5 : 1};
`;

export const ButtonLogoWrapper = styled.View`
  height: 100%;
  width: ${({ theme }) => theme.display.button_height}px;
  align-items: center;
  justify-content: center;
`;
export const ButtonLogo = styled.Image`
  height: ${RFValue(30)}px;
  width: ${RFValue(30)}px;
`;

export const ButtonTitle = styled.Text`
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const Loader = styled.View<{loading: boolean}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: ${({loading}) => loading ?  'flex' : 'none'};
`;