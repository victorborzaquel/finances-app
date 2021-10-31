import React from 'react';
import { IconAccountNameType, IconCategoryNameType, IIcon, IUserUpdate } from '../../global/interfaces';
import { useAuth } from '../../hooks/auth';
import { UIIconCircle } from '../UIIconCircle';

import {
  Button,
  Category,
  CategoryName,
  Container,
  ItemSeparator,
} from './styles';

export interface IData {
  id: string;
  icon_name?: IconAccountNameType | IconCategoryNameType;
  color_name?: IIcon['color_name'];
  name: string;
}

export function ListSelect({ close, setState, data, type, userUpdate }: {
  setState?: React.Dispatch<React.SetStateAction<any>>;
  close(): void | undefined;
  data: IData[];
  type?: 'category' | 'account';
  userUpdate?: keyof IUserUpdate;
}) {
  const { updateUser } = useAuth()

  function handleClose(selected?: IData) {
    if (!!selected) {
      if (!!setState) setState(selected)
      else if (!!userUpdate) updateUser({ [userUpdate]: selected.id })
    }
    close()
  }

  return (
    <Container>
      {data.map((item, index) => (
        <Category key={item.id}>
          <Button onPress={() => handleClose(item)}>
            {type === 'account' && (
              <UIIconCircle
                icon_account={item.icon_name as any}
                color_name={item.color_name}
                size={42}
              />
            )}
            {type === 'category' && (
              <UIIconCircle
                icon_category={item.icon_name as any}
                color_name={item.color_name}
                size={42}
              />
            )}
            <CategoryName>{item.name}</CategoryName>
          </Button>

          {data.length - 1 > index && <ItemSeparator/>}
        </Category>
      )
      )}
    </Container>
  );
}
