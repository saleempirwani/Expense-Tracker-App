import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {AppHeader} from '../../components';
import {Context as AuthContext} from '../../context/Auth';
import {Context as ExpenseContext} from '../../context/Expense';
import {primary} from '../../theme';

const SignoutScreen = () => {
  const {state, signout} = useContext(AuthContext);
  const {reset_state} = useContext(ExpenseContext);

  return (
    <>
      <AppHeader />
      <View style={styles.view}>
        <Button
          activeOpacity={1}
          title="Signout"
          onPress={() => {
            signout();
            reset_state();
          }}
          buttonStyle={styles.btn}
        />
      </View>
      {state.error ? alert(state.error) : null}
    </>
  );
};

export default SignoutScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btn: {
    marginHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: primary,
  },
});
