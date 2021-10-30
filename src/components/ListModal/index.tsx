import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';

import {
  Item,
  List,
  ItemTitle,
  CloseModal,
  Container,
  Content,
  ItemSeparator,
  Modal,
} from './styles';

export interface DataProps {
  id: string;
  title: string;
}

export function ListModal({visible, setVisible, setState, data}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
  data: Array<DataProps>;
}) {

  const theme = useTheme()

  function handleCloseModal(state?: string) {
    if (!!state) setState(state)
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
          <List
            contentContainerStyle={{
              paddingVertical: theme.display.padding_app * 2
            }}
            ItemSeparatorComponent={() => <ItemSeparator/>}
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Item onPress={() => handleCloseModal(item.id)}>
                {/* <UIIconCircle
                  icon_category={item.icon_name}
                  color_name={item.color_name}
                  size={42}
                /> */}
                <ItemTitle>{item.title}</ItemTitle>
              </Item>
            )}
          />
        </Content>
      </Modal>
    </Container>
  );
}
