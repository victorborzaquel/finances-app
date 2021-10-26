import styled from "styled-components/native";

export const Container = styled.View<{
  color: string, 
  size: number
}>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: ${({ size }) => size / 2}px;
  background-color: ${({ color }) => color};
  align-items: center;
  justify-content: center;
`;
