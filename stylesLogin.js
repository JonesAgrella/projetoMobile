import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A', // azul da tela "Sara"
    justifyContent: 'center',
    alignItems: 'center',
  },

  formTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    margin: 10,
  },
  formInput: {
borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 22,
    width: '80%',
    padding: 10,
    margin: 10,
    placeHolderTextColor: '#FFFFFF',
  },
  formButton: {
    backgroundColor: '#4CAF50', // verde do botão
    width: '80%',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  TextButton: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  subButton: {
    padding: 10,
  },
  subTextButton: {
    color: '#FFFFFF',
    
  },
});
