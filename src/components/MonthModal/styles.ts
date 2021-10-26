import styled from "styled-components/native";

export const CloseModal = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; 
`;

export const Modal = styled.Modal.attrs({
  animationType: 'slide',
  transparent: true,
})``;

export const Content = styled.View`
  background-color: ${({theme}) => theme.colors.background_secondary};
  width: 80%;
  border-radius: ${({theme}) => theme.display.padding_app}px;
  justify-content: space-between;
  position: absolute;
  top: ${({ theme }) => theme.display.window_height / 3}px;
  align-self: center;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.display.padding_app}px;
`;

export const ChangeDateButton = styled.TouchableOpacity`
  
`;

export const Year = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.medium}px;
`;

export const Months = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 12px 12px;
  justify-content: center;
  align-items: center;
`;

export const Month = styled.TouchableOpacity`
  width: 25%;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const MonthTitle = styled.Text<{currentMonth: boolean}>`
  color: ${({ theme, currentMonth }) => theme.colors[currentMonth ? 'secondary' : 'title']};
  font-family: ${({ theme }) => theme.fonts.family.title};
  font-size: ${({ theme }) => theme.fonts.size.small}px;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;