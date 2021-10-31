import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Wrapper = styled.View``;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.main};
  padding: ${({ theme })=> theme.display.padding_app}px;
  padding-top: ${({ theme })=> theme.display.padding_app + getStatusBarHeight()}px;
  padding-bottom: ${RFValue(100)}px;
  flex-direction: row;
  
  align-items: flex-start;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

export const UserAvatar = styled.View`
  flex-direction: row;
`;

export const AvatarButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  
`;

export const Greetings = styled.View`
  padding-left: 14px;
`;

export const GreetingText = styled.Text.attrs({
  numberOfLines: 1
})`
  color: ${({ theme }) => theme.colors.main_light};
  font-family: ${({ theme }) => theme.fonts.family.text};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.main_hover_title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.largue}px;
  line-height: ${({ theme }) => theme.fonts.size.largue}px;
`;  

export const SettingButton = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.main_dark};
  height: ${RFValue(40)}px;
  width: ${RFValue(40)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme })=> theme.display.border_radius}px;
`;

export const Content = styled.View`
  padding: 0 ${({ theme })=> theme.display.padding_app}px;
  padding-bottom: ${RFValue(50)}px;
`;

export const AccountBalance = styled.View`
  width: 100%;
  margin-top: -${RFValue(70)}px;
  flex: 1;
`;

export const BalanceHeader = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
`;

export const BalanceText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.small}px;
`;

export const BalanceAmount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.largue}px;
`;

export const IconEyeButton = styled(BorderlessButton)`
  margin: 0 ${({ theme })=> theme.display.padding_app}px;
`;

export const TransactionsBalance = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const BalanceButton = styled(RectButton)``;

export const TransactionAmount = styled.Text<{type: 'income' | 'expense'}>`
  color: ${({ theme, type }) => type === 'income' ? theme.colors.success_dark : theme.colors.attention_dark};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

