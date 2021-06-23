import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {blue, danger, green} from '../../theme';
import {AppHeader, Box} from '../../components';
import {Context as AuthContext} from '../../context/Auth';
import {Context as ExpenseContext} from '../../context/Expense';
import {ActivityIndicator} from 'react-native';

const HomeScreen = () => {
  const {state, getDataFromDB} = useContext(ExpenseContext);
  const {
    state: {token},
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => setLoading(false), 2000);
    }

    if (token) {
      getDataFromDB(token);
    }

    return () => clearInterval(interval);
  }, []);

  if (!state.data.length && loading) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator color="gray" size={35} />
      </View>
    );
  }

  let total = 0,
    income = 0,
    expense = 0;

  if (state.data.length) {
    total = state.data.map(hist => hist.amount).reduce((a = 0, b = 0) => a + b);
    income = state.data
      .map(hist => (hist.amount > 0 ? hist.amount : 0))
      .reduce((a = 0, b = 0) => a + b);
    expense = state.data
      .map(hist => (hist.amount < 0 ? hist.amount : 0))
      .reduce((a = 0, b = 0) => a + b);
  }

  return (
    <>
      <AppHeader addBtn={true} />
      <View style={styles.container}>
        <Box text="Your Balance" amount={'$' + total} backgroundColor={blue} />
        <Box text="Income" amount={'+ $' + income} backgroundColor={green} />
        <Box
          text="Expense"
          amount={'- $' + Math.abs(expense)}
          backgroundColor={danger}
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
