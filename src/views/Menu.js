import React, {Fragment, useEffect} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
} from 'native-base';
import globalStyles from '../styles/global';
import {StyleSheet} from 'react-native';
import {useStorage} from '../contexts/storage/storageContext';

const Menu = () => {
  const {menu, getProducts} = useStorage();
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container style={globalStyles.container}>
      <Content style={styles.content}>
        <List>
          {menu.map((dish, i) => {
            const {name, description, imageRef, price} = dish;
            return (
              <Fragment key={i}>
                <ListItem>
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
});

export default Menu;
