import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

const Box = ({text, amount, backgroundColor}) => {
  const styles = StyleSheet.create({
    box: {
      flex: 2,
      padding: 20,
      backgroundColor: backgroundColor,
      marginVertical: 10,
      borderRadius: 5,
      justifyContent: 'space-between',
    },
    text: {color: '#fff'},
    amount: {alignSelf: 'flex-end'},
  });

  return (
    <View style={styles.box}>
      <Text h3 style={styles.text}>
        {text}
      </Text>
      <Text h3 style={[styles.text, styles.amount]}>
        {amount}
      </Text>
    </View>
  );
};
export default Box;
