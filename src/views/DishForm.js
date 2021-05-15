import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Form,
  Icon,
  Input,
  Grid,
  Col,
  Button,
  Text,
  Footer,
  FooterTab,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import {useStorage} from '../contexts/storage/storageContext';

const DishForm = () => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const {dish, setSelectedOrder} = useStorage();
  const {price} = dish;

  const navigation = useNavigation();

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal, quantity]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateTotal = () => {
    const totalToPay = price * quantity;
    setTotal(totalToPay);
  };

  const decreaseOne = () => {
    if (quantity > 1) {
      const newQuantity = Number(quantity) - 1;
      setQuantity(newQuantity);
    }
  };

  const increaseOne = () => {
    const newQuantity = Number(quantity) + 1;
    setQuantity(newQuantity);
  };

  const confirmOrder = () => {
    const order = {
      ...dish,
      amount: quantity,
      total,
    };

    setSelectedOrder(order);
    navigation.navigate('OrderSummary');
    // Alert.alert(
    //   'Do you want to confirm your order?',
    //   'A confirmed order can no longer be modified',
    //   [
    //     {
    //       text: 'Confirm',
    //       onPress: () => {
    //         const order = {
    //           ...dish,
    //           amount: quantity,
    //           total,
    //         };

    //         setSelectedOrder(order);
    //         navigation.navigate('OrderSummary');
    //       },
    //     },
    //     {
    //       text: 'Cancel',
    //       style: 'cancel',
    //     },
    //   ],
    // );
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.title}>Amount</Text>
          <Grid>
            <Col>
              <Button
                props
                dark
                style={styles.button}
                onPress={() => decreaseOne(quantity)}>
                <Icon style={styles.icon} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                style={styles.input}
                value={quantity.toString()}
                keyboardType="numeric"
                onChangeText={cantidad => setQuantity(cantidad)}
              />
            </Col>
            <Col>
              <Button
                props
                dark
                style={styles.button}
                onPress={() => increaseOne()}>
                <Icon style={styles.icon} name="add" />
              </Button>
            </Col>
          </Grid>

          <Text style={globalStyles.amount}>Subtotal: $ {total} </Text>
        </Form>
      </Content>

      <Footer>
        <FooterTab>
          <Button style={globalStyles.button} onPress={() => confirmOrder()}>
            <Text style={globalStyles.buttonText}>add to order</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    textAlign: 'center',
    fontSize: 20,
  },
  icon: {
    fontSize: 40,
  },
});

export default DishForm;
