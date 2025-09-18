import * as React from 'react';
 import { View, Text, Button, StyleSheet } from 'react-native';

 function HomeScreen({navigation}) {
     return (
     <View style={styles.container}>
         <Text>Tela Home</Text>
     </View>
     );
 }

 const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto:{
        fontSize: 20,
        color: 'black',
        
    }
});

 export default HomeScreen;