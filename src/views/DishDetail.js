import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Body,
  Text,
  H1,
  Card,
  CardItem,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';
import {useStorage} from '../contexts/storage/storageContext';

const DishDetail = () => {
  const {dish} = useStorage();
  const {name, description, imageRef, price} = dish;

  const navigation = useNavigation();

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>{name}</H1>
        <Card>
          <CardItem>
            <Body>
              <Image style={globalStyles.image} source={{uri: imageRef}} />

              <Text style={styles.description}>{description} </Text>
              <Text style={globalStyles.amount}>Price: $ {price}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>

      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.button}
            onPress={() => navigation.navigate('DishForm')}>
            <Text style={globalStyles.buttonText}>order this dish</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: 20,
  },
});

export default DishDetail;
