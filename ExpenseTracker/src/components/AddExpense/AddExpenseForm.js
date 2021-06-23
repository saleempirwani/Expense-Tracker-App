import React, {useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import {Input, Text} from 'react-native-elements';
import {primary, danger} from '../../theme';
import MarginV from '../common/MarginV';

const AddExpenseForm = ({
  modalVisible,
  setModalVisible,
  getExpenseValues,
  update,
  oldText,
  oldAmount,
  error,
}) => {
  const [text, setText] = useState(update ? oldText : '');
  const [amount, setAmount] = useState(update ? oldAmount + '' : '');
  const [vadError, setVadError] = useState('');

  const reset = () => {
    if (!error) {
      setModalVisible(!modalVisible);
      setAmount('');
      setText('');
      setVadError('');
    } else {
      setVadError(error);
    }
  };

  const helper = () => {
    if (amount && text) {
      if (Number(amount) !== 0) {
        getExpenseValues(Number(amount), text);
        reset();
      } else {
        setVadError("Amount can't be zero");
      }
    } else {
      setVadError('Please fill all the field');
    }
  };

  return (
    <>
      <Text h4>{update ? 'Update' : 'Add'} Expense</Text>
      <MarginV margin={5} />
      <Input
        value={text}
        onChangeText={setText}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Text"
        leftIcon={{type: 'material-icon', name: 'text-fields'}}
      />
      <Input
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Amount (+ income or - expense)"
        leftIcon={{type: 'font-awesome-5', name: 'dollar-sign'}}
      />
      {vadError ? <Text style={styles.vadError}>{vadError}</Text> : null}
      <View style={styles.btnContainer}>
        <Pressable onPress={reset} style={styles.btn}>
          <Text style={styles.btnText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={helper} style={styles.btn}>
          <Text style={styles.btnText}>{update ? 'Update' : 'Add'}</Text>
        </Pressable>
      </View>
    </>
  );
};

export default AddExpenseForm;

const styles = StyleSheet.create({
  btnContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  btn: {
    marginHorizontal: 20,
  },
  btnText: {
    color: primary,
    fontSize: 18,
  },
  vadError: {
    color: danger,
    marginBottom: 20,
    fontSize: 18,
  },
});
