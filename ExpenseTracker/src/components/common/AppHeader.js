import React from 'react';
import {Header} from 'react-native-elements';
import {primary} from '../../theme';
import {AddExpense} from '../../components';

const AppHeader = ({addBtn}) => {
  return (
    <Header
      containerStyle={{paddingVertical: 15, padding: 0}}
      placement="left"
      backgroundColor={primary}
      centerComponent={{
        text: 'Expense Tracker App',
        style: {color: '#fff', fontSize: 20},
      }}
      rightComponent={addBtn ? <AddExpense update={false} item={{}} /> : null}
    />
  );
};

export default AppHeader;
