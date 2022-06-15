import styled from "styled-components/native";

export const Container = styled.ScrollView.attrs({
  nestedScrollEnabled: true
})`
  width: ${({ theme }) => theme.display.window_width}px;
  padding: 0 ${({ theme }) => theme.display.padding_app}px;
`;

export const Content = styled.View`
  align-items: center;
`;

export const Total = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.largue}px;
  padding-bottom: 12px;
`;

export const Category = styled.View<{ color: string }>`
  width: 100%;
  border-left-width: 10px;
  border-left-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.display.border_radius}px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  margin-bottom: 7px;
`;

export const CategoryButton = styled.TouchableOpacity.attrs({ activeOpacity: 0.6 })`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.display.padding_app / 2}px ${({ theme }) => theme.display.padding_app}px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;
