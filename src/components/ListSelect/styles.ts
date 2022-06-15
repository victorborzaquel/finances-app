import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_secondary};
  width: 100%;
  border-top-right-radius: ${({ theme }) => theme.display.border_radius}px;
  border-top-left-radius: ${({ theme }) => theme.display.border_radius}px;

  padding: ${({ theme }) => theme.display.padding_app}px 0;
`;

export const Category = styled.View``;

export const ItemSeparator = styled.View`
  background-color: ${({ theme }) => theme.colors.line};
  margin-left: ${({ theme }) => theme.display.padding_app}px;
  margin-right: ${({ theme }) => theme.display.padding_app * 2}px;
  height: 1px;
`;
export const Button = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.display.padding_app / 2}px;
  padding-left: ${({ theme }) => theme.display.padding_app}px;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
  padding-left: ${({ theme }) => theme.display.padding_app}px;
`;