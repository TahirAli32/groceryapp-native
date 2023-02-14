import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react'
import axios from 'axios'
import {constant} from '../constants/constant'

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const body = {
      name,
      email,
      password,
      mobileNo: contact,
    };
    const res = await axios.post(`${constant.baseUrl}/api/auth/signup `, body);
    if(res.data.success){
      navigation.navigate('Login')
    }
    else{
      ToastAndroid.show(res.data.error, ToastAndroid.SHORT);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>SAYLANI WELFARE</Text>
          <Text style={styles.subHeading}>ONLINE DISCOUNT STORE</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
            defaultValue="Email"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            defaultValue="Email"
          />
          <TextInput
            placeholder="Contact"
            value={contact}
            onChangeText={text => setContact(text)}
            style={styles.input}
            defaultValue="Contact"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            defaultValue="Password"
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.linkLogin}>
              Already Have an Account?
              <Text
                style={{color: '#61B846'}}
                onPress={() => navigation.navigate('Login')}>
                {' '}
                Login
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  headingContainer: {
    alignItems: 'center',
    flex: 0.4,
    marginTop: 70,
  },
  heading: {
    fontWeight: '700',
    fontSize: 32,
    color: '#61B846',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#024F9D',
    textAlign: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    flex: 2,
  },
  input: {
    width: 228,
    borderBottomWidth: 1,
    margin: 5,
    borderBottomColor: '#D4D3D3',
    color: '#000000',
  },
  button: {
    //   width: 220,
    //   height: 60,
    paddingVertical: 10,
    paddingHorizontal: 35,
    backgroundColor: '#61B846',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  linkLogin: {
    marginTop: 10,
    color: '#024F9D',
    fontWeight: '700',
  },
});

export default Signup;
