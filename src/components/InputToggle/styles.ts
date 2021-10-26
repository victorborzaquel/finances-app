import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.display.padding_app / 2}px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  padding-left: ${({ theme }) => theme.display.padding_app}px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.subtitle};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;
