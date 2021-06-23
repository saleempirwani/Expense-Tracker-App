import React, {useState, useContext} from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {Icon} from 'react-native-elements';
import AddExpenseForm from './AddExpenseForm';
import {green} from '../../theme';
import {Context as AuthContext} from '../../context/Auth';
import {Context as ExpenseContext} from '../../context/Expense';

const AddExpense = ({update, item}) => {
  // USE_CONTEXT
  const {
    state: {token},
  } = useContext(AuthContext);
  const {state, addExpense, updateExpense} = useContext(ExpenseContext);

  const [modalVisible, setModalVisible] = useState(false);

  // Handler Function
  const getExpenseValues = (amount, text) => {
    if (update) {
      updateExpense(token, {...item, amount, text});
    } else {
      addExpense(token, {amount, text});
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={null}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Add Expense Custom Form */}
            <AddExpenseForm
              error={state.error}
              oldText={item.text}
              oldAmount={item.amount}
              update={update}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              getExpenseValues={getExpenseValues}
            />
          </View>
        </View>
      </Modal>
      <Icon
        iconStyle={{
          alignSelf: update ? 'flex-end' : null,
        }}
        name={update ? 'pencil' : 'plus'}
        color={update ? green : '#fff'}
        type={update ? 'material-community' : 'feather'}
        onPress={() => setModalVisible(!modalVisible)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  // button: {
  //   width: '35%',
  //   borderRadius: 20,
  //   padding: 10,
  //   backgroundColor: primary,
  //   alignSelf: 'center',
  // },
  // buttonOpen: {
  //   backgroundColor: '#F194FF',
  // },
  // buttonClose: {
  //   backgroundColor: '#2196F3',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AddExpense;
