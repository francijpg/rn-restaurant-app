import React, {useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  H1,
  Footer,
  FooterTab,
} from 'native-base';
import {useStorage} from '../contexts/storage/storageContext';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';

const OrderSummary = () => {
  const {order, totalToPay, getOrderSummary, removeOrderDish} = useStorage();
  const navigation = useNavigation();

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const calculateTotal = () => {
    let newTotal = 0;
    newTotal = order.reduce((acc, dish) => acc + dish.total, 0);

    getOrderSummary(newTotal);
  };

  const confirmRemoval = id => {
    Alert.alert(
      'Do you want to delete this dish?',
      'Once deleted it cannot be recovered',
      [
        {
          text: 'Confirm',
          onPress: () => {
            removeOrderDish(id);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const orderProgress = () => {
    Alert.alert(
      'Check your order',
      'Once you place your order, you will not be able to change it',
      [
        {
          text: 'Confirm',
          onPress: async () => {
            console.log('order in progress');
            // crear un objeto
            // const pedidoObj = {
            //   tiempoentrega: 0,
            //   completado: false,
            //   total: Number(total),
            //   orden: pedido, // array
            //   creado: Date.now(),
            // };
            // console.log(pedidoObj);
            // try {
            //   const pedido = await firebase.db
            //     .collection('ordenes')
            //     .add(pedidoObj);
            //   pedidoRealizado(pedido.id);
            //   // redireccionar a progreso
            //   navigation.navigate('ProgresoPedido');
            // } catch (error) {
            //   console.log(error);
            // }
          },
        },
        {text: 'Check', style: 'cancel'},
      ],
    );
  };

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>Order Summary</H1>
        {order.map((dish, i) => {
          const {amount, name, imageRef, id, price} = dish;
          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{uri: imageRef}} />
                </Left>

                <Body>
                  <Text>{name} </Text>
                  <Text>Amount: {amount} </Text>
                  <Text>Price: $ {price} </Text>

                  <Button
                    onPress={() => confirmRemoval(id)}
                    full
                    danger
                    style={styles.button}>
                    <Text style={[globalStyles.buttonText, styles.text]}>
                      remove
                    </Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          );
        })}

        <Text style={[globalStyles.amount, styles.payText]}>
          total to pay: $ {totalToPay}
        </Text>

        <Button
          onPress={() => navigation.navigate('Menu')}
          style={styles.button}
          full
          dark>
          <Text style={[globalStyles.buttonText, styles.text]}>
            continue ordering
          </Text>
        </Button>
      </Content>

      <Footer>
        <FooterTab>
          <Button
            onPress={() => orderProgress()}
            style={[globalStyles.button]}
            full>
            <Text style={globalStyles.buttonText}>confirm order</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFF',
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  payText: {
    textTransform: 'capitalize',
  },
});

export default OrderSummary;
