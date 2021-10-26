import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useLocalization } from '../../hooks/localization';
import { isSameMonth } from '../../utils/dateUtils';
import { UIButton } from '../UIButton';
import { UIIcon } from '../UIIcon';

import {
  Buttons,
  ChangeDateButton,
  CloseModal,
  Content,
  Header,
  Modal,
  Month,
  Months,
  MonthTitle,
  Year,
} from './styles';

export function MonthModal({visible, setVisible, setDate, date }: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  date: Date;
}) {
  const { toDate } = useLocalization()

  const monthValue = [0, 1,2,3,4,5,6,7,8,9,10,11]
  const [year, setYear] = useState(new Date().getFullYear())

  function handleCloseModal(date?: Date) {
    if (!!date) setDate(date)
    setVisible(false)
  }


  return (
    <>
      <Modal visible={visible} onShow={() => setYear(date.getFullYear())}>
        {visible && (
          <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
            <CloseModal />
          </TouchableWithoutFeedback>
        )}

        <Content>
          <Header>
            <ChangeDateButton onPress={() => setYear(curr => Number(curr) - 1)}>
              <UIIcon
                icon_interface="chevron-left"
                size={40}
                color="main"
              />
            </ChangeDateButton>

            <Year>{year}</Year>

            <ChangeDateButton onPress={() => setYear(curr => Number(curr) + 1)}>
              <UIIcon
                icon_interface="chevron-right"
                size={40}
                color="main"
              />
            </ChangeDateButton>
          </Header>
          <Months>
            {monthValue.map(month => {
              const currentDate = new Date(year, month, 1)

              return (
                <Month key={String(currentDate)} onPress={() => handleCloseModal(currentDate)}>
                  <MonthTitle currentMonth={isSameMonth(currentDate, date)}>{toDate(currentDate, 'shortMonth').toUpperCase()}</MonthTitle>
                </Month>
              )
            })}
          </Months>

          <Buttons>
            <UIButton
              title="Cancelar"
              color="attention"
              onPress={() => handleCloseModal()}
            />
            <UIButton
              title="Mês atual"
              color="secondary"
              onPress={() => handleCloseModal(new Date())}
            />
          </Buttons>
        </Content>
      </Modal>
    </>
  );
}
