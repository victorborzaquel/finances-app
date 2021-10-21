import styled from "styled-components/native";

export const Shadow = styled.View<{size: number}>`
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: ${({ size })=> size/ 2}px;
  height: ${({size})=> size}px;
  width: ${({size})=> size}px;
`;

export const UserAvatar = styled.Image<{size: number}>`
  height: ${({size})=> size}px;
  width: ${({size})=> size}px;
  border-radius: ${({ size })=> size/ 2}px;
`;