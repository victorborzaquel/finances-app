import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import { otherCategory } from '../../data/CategoryDefaultData';
import { IAccount, ICategory } from '../../global/interfaces';
import { useAuth } from '../../hooks/auth';
import { useLocalization } from '../../hooks/localization';
import { UIButton } from '../UIButton';
import { UIIconCircle } from '../UIIconCircle';

import {
  Category,
  AccountList,
  CategoryName,
  CloseModal,
  Container,
  Content,
  ItemSeparator,
  Modal,
} from './styles';

export function AccountModal({visible, setVisible, setAccount}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setAccount: React.Dispatch<React.SetStateAction<IAccount>>;
}) {
  const { accounts } = useAuth()
  const theme = useTheme()

  function handleCloseModal(account?: IAccount) {
    if (!!account) setAccount(account)
    setVisible(false)
  }


  return (
    <Container>
      <Modal visible={visible}>
        {visible && (
          <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
            <CloseModal />
          </TouchableWithoutFeedback>
        )}

        <Content>
          <AccountList
            contentContainerStyle={{
              paddingVertical: theme.display.padding_app * 2
            }}
            ItemSeparatorComponent={() => <ItemSeparator/>}
            data={accounts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Category onPress={() => handleCloseModal(item)}>
                <UIIconCircle
                  icon_account={item.icon_name}
                  color_name={item.color_name}
                  size={42}
                />
                <CategoryName>{item.name}</CategoryName>
              </Category>
            )}
          />
        </Content>
      </Modal>
    </Container>
  );
}
