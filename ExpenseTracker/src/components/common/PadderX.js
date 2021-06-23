import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PadderX = ({children}) => {
  return <>{children}</>;
};

export default PadderX;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});
