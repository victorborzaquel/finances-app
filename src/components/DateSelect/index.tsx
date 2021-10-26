import React, { useState } from 'react'
import { UIIcon } from '../UIIcon'
import { subMonths, addMonths } from 'date-fns'

import {
  Arrows,
  ChangeDateButton,
  Container, SelectDateButton, Title
} from './styles'
import { useLocalization } from '../../hooks/localization'
import { isSameYear } from '../../utils/dateUtils'
import { MonthModal } from '../MonthModal'

export function DateSelect({ date, setDate }: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const [dateModalVisible, setDateModalVisible] = useState(false)
  const { toDate } = useLocalization()

  return (
    <Container>
      <Arrows>
        <ChangeDateButton onPress={() => setDate(subMonths(date, 1))}>
          <UIIcon
            icon_interface="chevron-left"
            size={40}
            color="main"
          />
        </ChangeDateButton>
        <ChangeDateButton onPress={() => setDate(addMonths(date, 1))}>
          <UIIcon
            icon_interface="chevron-right"
            size={40}
            color="main"
          />
        </ChangeDateButton>
      </Arrows>
      
      <SelectDateButton onPress={() => setDateModalVisible(true)}>
        <Title>{toDate(date, isSameYear(date, new Date()) ? 'month' : 'fullMonth')}</Title>
      </SelectDateButton>

      <MonthModal
        visible={dateModalVisible}
        setVisible={setDateModalVisible}
        setDate={setDate}
        date={date}
      />
    </Container>
  );
}
