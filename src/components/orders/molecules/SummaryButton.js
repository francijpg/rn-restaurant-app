import {useNavigation} from '@react-navigation/core';
import {Button, Text} from 'native-base';
import React from 'react';
import {useStorage} from '../../../contexts/storage/storageContext';
import globalStyles from '../../../styles/global';

const SummaryButton = () => {
  const navigation = useNavigation();
  const {order} = useStorage();

  // eslint-disable-next-line curly
  if (order.length === 0) return null;

  return (
    <Button
      onPress={() => navigation.navigate('OrderSummary')}
      style={globalStyles.button}>
      <Text style={globalStyles.buttonText}>go to order</Text>
    </Button>
  );
};

export default SummaryButton;
