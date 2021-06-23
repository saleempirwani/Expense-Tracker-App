import React, {useContext} from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native';
import {Text} from 'react-native-elements';
import {AppHeader, Detail} from '../../components';
import {Context as AuthContext} from '../../context/Auth';
import {Context as ExpenseContext} from '../../context/Expense';

const HistoryScreen = () => {
  const {
    state: {token},
  } = useContext(AuthContext);
  const {state, deleteExpense} = useContext(ExpenseContext);

  const onDelete = id => {
    Alert.alert(
      'Delete History',
      'Are you sure, you want to delete this history?',
      [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            if (!state.error) {
              deleteExpense(token, id);
            } else {
              alert(state.error + ", couldn't delete");
            }
          },
        },
      ],
    );
  };

  if (!state.data.length) {
    return (
      <View style={styles.noExpenseHistory}>
        <Text h2 style={styles.noExpenseHistoryText}>
          No Expense History Found
        </Text>
      </View>
    );
  }

  return (
    <>
      <AppHeader addBtn={false} />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={state.data}
          renderItem={({item}) => <Detail item={item} onDelete={onDelete} />}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
  },
  noExpenseHistory: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  noExpenseHistoryText: {textAlign: 'center', color: 'gray'},
});
