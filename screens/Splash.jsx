import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import { images } from '../constants'
const Splash = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.ImageCon}>
          <Image style={styles.logo} source={images.logo} />
        </View>
        <View style={styles.textCon}>
          <Text style={styles.heading}>SAYLANI WELFARE</Text>
          <Text style={styles.subheading}>ONLINE DISCOUNT STORE</Text>
        </View>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.button}
           onPress={() => navigation.navigate("Login")}

          >
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ImageCon: {
    width: 320,
    height: 250,
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#024F9D',
    textAlign: 'center',
  },
  content: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: '700',
    fontSize: 32,
    color: '#61B846',
  },
  btn: {
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#61B846',
    borderRadius: 8,
    marginBottom: 55,
  },
  btnText: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
  },
  textCon: {
    alignItems: 'center',
  },
});

export default Splash
