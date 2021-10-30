import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ICategory } from '../../global/interfaces';
import { useAuth } from '../../hooks/auth';
import { UIIconCircle } from '../UIIconCircle';

import {
  Category,
  CategoryList,
  CategoryName,
  CloseModal,
  Container,
  Content,
  ItemSeparator,
  Modal,
} from './styles';

export function CategoryModal({visible, setVisible, setCategory, type}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<ICategory>>;
  type: ICategory['type'];
}) {
  const { categories, user } = useAuth()
  const theme = useTheme()

  function handleCloseModal(category?: ICategory) {
    if (!!category) setCategory(category)
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
          <CategoryList
            contentContainerStyle={{
              paddingVertical: theme.display.padding_app * 2
            }}
            ItemSeparatorComponent={() => <ItemSeparator/>}
            data={categories.filter(category => category.type === type)}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Category onPress={() => handleCloseModal(item)}>
                <UIIconCircle
                  icon_category={item.icon_name}
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
