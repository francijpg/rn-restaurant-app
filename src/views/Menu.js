import React, {Fragment, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Separator,
} from 'native-base';
import globalStyles from '../styles/global';
import {StyleSheet} from 'react-native';
import {useStorage} from '../contexts/storage/storageContext';

const Menu = () => {
  const {menu, getProducts, getOneProduct} = useStorage();

  const navigation = useNavigation();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const showHeading = (category, i) => {
    if (i > 0) {
      const previousCategory = menu[i - 1].category;
      if (previousCategory !== category) {
        return (
          <Separator style={styles.separator}>
            <Text style={styles.textSeparator}> {category} </Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separator}>
          <Text style={styles.textSeparator}> {category} </Text>
        </Separator>
      );
    }
  };

  return (
    <Container style={globalStyles.container}>
      <Content style={styles.content}>
        <List>
          {menu.map((dish, i) => {
            const {name, description, imageRef, price, category} = dish;
            return (
              <Fragment key={i}>
                {showHeading(category, i)}
                <ListItem
                  onPress={() => {
                    const {stock, ...newDish} = dish;
                    getOneProduct(newDish);
                    navigation.navigate('DishDetail');
                  }}>
                  <Thumbnail large square source={{uri: imageRef}} />
                  <Body>
                    <Text>{name}</Text>
                    <Text note numberOfLines={2}>
                      {description}
                    </Text>
                    <Text>Price: $ {price}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#FFF',
  },
  separator: {
    backgroundColor: '#000',
  },
  textSeparator: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Menu;
