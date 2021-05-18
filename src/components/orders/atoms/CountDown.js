import React from 'react';
import {StyleSheet} from 'react-native';
import {CountDown as Timer} from 'react-native-countdown-component';

const CountDown = ({time}) => {
  return (
    <Timer
      until={60 * time}
      size={50}
      digitTxtStyle={styles.timerColor}
      digitStyle={styles.timerBgColor}
      timeToShow={['M', 'S']}
      // eslint-disable-next-line no-alert
      // onFinish={() => alert('Finished')}
    />
  );
};

const styles = StyleSheet.create({
  timerColor: {
    color: '#FFDA00',
  },
  timerBgColor: {
    color: '#FFDA00',
  },
});

export default CountDown;
