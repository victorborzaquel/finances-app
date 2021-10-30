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
import { ShadowBackground } from '../ShadowBackground'

export function DateSelect({ date, setDate, filter }: {
  date: Date;
  setDate: any;
  filter?: boolean;
}) {
  const [dateModalVisible, setDateModalVisible] = useState(false)
  const { toDate } = useLocalization()

  function editDate(type: 'sub' | 'add') {
    const action = type === 'sub' ? subMonths : addMonths
    const newDate = filter ? {date: action(date, 1)} : action(date, 1)
    setDate(newDate)
  }

  
  return (
    <>
    {dateModalVisible && <ShadowBackground/>}
    
    <Container>
      
      <Arrows>
        <ChangeDateButton onPress={() => editDate('sub')}>
          <UIIcon
            icon_interface="chevron-left"
            size={40}
            color="main"
          />
        </ChangeDateButton>
        <ChangeDateButton onPress={() => editDate('add')}>
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
        filter={filter}
      />
    </Container>
    </>
  );
}
