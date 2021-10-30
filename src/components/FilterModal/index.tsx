import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ICategory, TransactionType } from '../../global/interfaces';
import { useData } from '../../hooks/data';
import { CategoryModal } from '../CategoryModal';
import { InputModal } from '../InputModal';
import { InputToggle } from '../InputToggle';
import { UIButton } from '../UIButton';

import {
  Buttons,
  CloseModal,
  Container,
  Content,
  Inputs,
  Modal,
} from './styles';

export function FilterModal({visible, setVisible, date}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
}) {
  const [transactionConfirmed, setTransactionConfirmed] = useState(true)
  const [category, setCategory] = useState({} as ICategory)
  const [transactionType, setTransactionType] = useState('expense' as TransactionType)
  
  const [categoryModalVisible, setCategoryModalVisible] = useState(true)

  const { replaceFilter } = useData()

  function handleCloseModal(type: 'confirm' | 'cancel') {
    replaceFilter({ date })
    setVisible(false)
  }

  // date: Date;
  // transactionType?: TransactionType;
  // categoryId?: string;
  // accountId?: string;
  // transactionConfirmed?: boolean;

  function isCurrentCategoryType() {
    return !!category.id && category.type === transactionType
  }

  return (
    <Container>
      <Modal visible={visible}>
        {visible && (
          <TouchableWithoutFeedback onPress={() => handleCloseModal('cancel')}>
            <CloseModal />
          </TouchableWithoutFeedback>
        )}

        <Content>
          <Inputs>
            <InputToggle
              title="Transação confirmada"
              icon="calendar"
              state={transactionConfirmed}
              setState={setTransactionConfirmed}
            />
            <InputModal
              title={isCurrentCategoryType() ? category.name : 'Todas categorias'}
              setOpenModal={setCategoryModalVisible}
              icon="settings"
            />
          </Inputs>
          
          <Buttons>
            <UIButton
              title="Cancelar"
              color="attention"
              onPress={() => handleCloseModal('cancel')}
            />
            <UIButton
              title="Confirmar"
              color="success"
              onPress={() => handleCloseModal('confirm')}
            />
          </Buttons>
        </Content>

        
      </Modal>

      <CategoryModal
        visible={categoryModalVisible}
        setVisible={setCategoryModalVisible}
        setCategory={setCategory}
        type={transactionType}
      />
    </Container>
  );
}
