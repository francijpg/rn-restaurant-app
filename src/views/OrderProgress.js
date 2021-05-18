import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {Button, Container, H1, H3, Text} from 'native-base';
import {StyleSheet, View} from 'react-native';
import globalStyles from '../styles/global';
import {useStorage} from '../contexts/storage/storageContext';
import CountDown from '../components/orders/atoms/CountDown';

const OrderProgress = () => {
  const {orderId, fetchOrders} = useStorage();
  const [time, setTime] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const getOrdersRef = () => {
      const orderRef = fetchOrders(orderId);
      orderRef.onSnapshot(function (doc) {
        setTime(doc.data().deliveryTime);
        setOrderCompleted(doc.data().completed);
      });
    };
    getOrdersRef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={globalStyles.container}>
      <View style={[globalStyles.content, styles.separator]}>
        {time === 0 && (
          <>
            <Text style={styles.text}>We have received your order</Text>
            <Text style={styles.text}>
              We are calculating the delivery time ...
            </Text>
          </>
        )}

        {!orderCompleted && time > 0 && (
          <>
            <Text style={styles.text}>Your order will be ready in: </Text>
            <Text style={styles.text}>
              <CountDown time={time} />
            </Text>
          </>
        )}

        {orderCompleted && (
          <>
            <H1 style={styles.completedText}>the order is ready</H1>
            <H3 style={styles.completedText}>
              Please come and pick up your order
            </H3>

            <Button
              style={[globalStyles.button, styles.separator]}
              rounded
              block
              onPress={() => navigation.navigate('NewOrder')}>
              <Text style={globalStyles.buttonText}>start a new order</Text>
            </Button>
          </>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  separator: {
    marginTop: 80,
  },
  completedText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});

export default OrderProgress;
