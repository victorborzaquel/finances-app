import styled, { css } from "styled-components/native";

interface IContainer {
  contentPadding: boolean;
}

interface IHeader {
  contentPadding: boolean;
}

export const Container = styled.View<IContainer>`
  border-radius: ${({ theme }) => theme.display.border_radius}px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  width: 100%;
  margin-bottom: 12px;
  flex: 1;

  ${({contentPadding}) => contentPadding && css`
    padding: ${({ theme }) => theme.display.padding_app / 1.5}px;
  `}
`;

export const Header = styled.View<IHeader>`
  padding-bottom: ${({ theme }) => theme.display.padding_app / 1.5}px;

  ${({contentPadding}) => !contentPadding && css`
    padding: ${({ theme }) => theme.display.padding_app / 1.5}px;
  `}
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;