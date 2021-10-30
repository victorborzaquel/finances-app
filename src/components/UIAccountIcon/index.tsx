import React from 'react';
import { IAccount } from '../../global/interfaces';
import { useAuth } from '../../hooks/auth';
import { UIIconCircle } from '../UIIconCircle';

export function UIAccountIcon({account, size=42}: {
  account?: IAccount;
  size?: number;
}) {
  const { user, accounts } = useAuth()
  const defaultAccount = accounts.find(account => account.id === user.default_account_id)
  return (
    <UIIconCircle
      icon_account={account?.icon_name || defaultAccount?.icon_name}
      color_name={account?.color_name || defaultAccount?.color_name}
      size={size}
    />
  );
}
