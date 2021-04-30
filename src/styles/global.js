import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
  button: {
    backgroundColor: '#FFDA00',
  },
  buttonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
  },
  image: {
    height: 300,
    width: '100%',
  },
  amount: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default globalStyles;
