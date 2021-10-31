import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useLocalization } from '../../hooks/localization';
import { UIButton } from '../UIButton';

import {
  ButtonContainer,
  Buttons,
  ButtonTitle,
  ButtonWrapper,
  CalculatorButtons,
  Container,
  Delete,
  Display,
  Total
} from './styles';

export function Calculator({ setAmount, close }: {
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  close(): void | undefined;
}) {
  const { toCurrency, toMath, toOperator } = useLocalization()
  const [math, setMath] = useState('')
  const [placeholder, setPlaceholder] = useState(false)

  const buttons = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '.', '0', '=', '/']

  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const operators = ['+', '-', '*', '/']
  const deleteLast = 'DEL'
  const deleteAll = 'AC'
  const dot = '.'
  const equals = '='

  function handleCloseModal(type: 'cancel' | 'confirm') {
    if (type === 'confirm') setAmount(Number(calculeMath('=')))
    setMath('')
    close()
  }

  function handleButtonPress(buttonPressed: string) {
    setMath(calculeMath(buttonPressed));
  }

  function getDisplayFormat() {
    if (math === '') return `0${toOperator('.')}0`

    return (placeholder ? toCurrency(math) : toMath(math))
  }

  function calculeMath(buttonPressed: string): string {
    if (placeholder) setPlaceholder(false)

    const mathArray = math.trimEnd().split(' ')
    const lastInput = mathArray[mathArray.length - 1]

    if (numbers.includes(buttonPressed)) {
      if (
        lastInput > Number(lastInput).toFixed(1) ||
        lastInput.length >= 7
      ) return math

      return math + buttonPressed
    }

    if (operators.includes(buttonPressed)) {
      if (math === '' || operators.includes(lastInput)) return math

      return `${math} ${buttonPressed} `
    }

    switch (buttonPressed) {
      case dot:
        return lastInput.includes('.')
          ? math
          : math + buttonPressed
      case deleteLast: return math.slice(0, math.trimEnd().length - 1)
      case deleteAll: return ''
      case equals:
        setPlaceholder(true)
        if (math === '') return '0'
        if (operators.includes(lastInput)) return eval(calculeMath(deleteLast)).toString()

        return eval(math).toString()
      default: return math
    }
  }

  return (
    <Container>
      <Display>
        <Total>{getDisplayFormat()}</Total>
        <Delete
          onPress={() => handleButtonPress('DEL')}
          onLongPress={() => handleButtonPress('AC')}
        >
          <Feather name="delete" size={30} />
        </Delete>
      </Display>

      <CalculatorButtons>
        {buttons.map(button => (
          <ButtonContainer
            key={String(button)}
            onPress={() => handleButtonPress(button)}
          >
            <ButtonWrapper>
              <ButtonTitle>
                {toOperator(button)}
              </ButtonTitle>
            </ButtonWrapper>
          </ButtonContainer>
        ))}
      </CalculatorButtons>

      <Buttons>
        <UIButton
          onPress={() => handleCloseModal('cancel')}
          title="Cancelar"
          color="attention"
        />
        <UIButton
          onPress={() => handleCloseModal('confirm')}
          title="Confirmar"
          color="success"
        />
      </Buttons>
    </Container>
  );
}
