import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import {green, red} from '../../theme';
import {AddExpense, MarginV} from '../../components';

const Detail = ({item, onDelete}) => {
  const borderColor = item.amount < 0 ? red : green;

  const getDateTime = () => {
    const dateTime = new Date(item.date);
    return [dateTime.toDateString(), dateTime.toLocaleTimeString()];
  };

  return (
    <View style={[styles.detail, {borderTopColor: borderColor}]}>
      <Text h3>{item.text}</Text>
      <MarginV margin={5} />
      <Text h4 style={{color: 'gray'}}>
        {item.amount < 0 ? '- $' + Math.abs(item.amount) : '+ $' + item.amount}
      </Text>
      <MarginV margin={15} />
      {/* <View style={styles.bottom}> */}
      {/* DATE & TIME */}
      <View style={styles.dateTimeView}>
        <Text style={styles.dateTime}>{getDateTime()[0]}</Text>
        <Text style={styles.dateTime}>{getDateTime()[1]}</Text>
      </View>
      <View style={styles.icons}>
        {/* ICONS */}
        <AddExpense update={true} item={item} />
        <Icon
          iconStyle={styles.icon}
          type="font-awesome-5"
          name="trash"
          color={red}
          onPress={() => onDelete(item.id)}
        />
      </View>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderTopWidth: 5,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {marginHorizontal: 10},
  text: {color: '#fff'},
  dateTimeView: {
    flexDirection: 'column',
  },
  dateTime: {
    fontSize: 15,
  },
  bottom: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
});

export default Detail;
