import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.display.padding_app}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const Input = styled.TextInput`
  padding-left: ${({ theme }) => theme.display.padding_app}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
  flex: 1;
`;
