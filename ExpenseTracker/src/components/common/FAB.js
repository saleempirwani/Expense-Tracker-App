import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const FAB = ({icon, onPress, backgroundColor}) => {
  const style = StyleSheet.create({
    fab: {
      padding: 15,
      backgroundColor,
      borderRadius: backgroundColor,
    },
  });

  return (
    <TouchableOpacity activeOpacity={1} style={style.fab} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

export default FAB;
