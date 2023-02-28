import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  View,
} from 'react-native'
import { useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../constants'

const Signup = ({navigation}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignup = async () => {
    if(!email.match(/([^\s])/) || !password.match(/([^\s])/) || !name.match(/([^\s])/) || !contact.match(/([^\s])/)){
      return setError("All Fields are required")
    }
    setError("")
    ToastAndroid.show('Processing Request', ToastAndroid.SHORT)
    const body = {
      name,
      email: email.toLowerCase(),
      password,
      mobileNo: contact,
    }
    const res = await axios.post(`${baseUrl}/api/auth/signup `, body)
    if(res.data.success){
      navigation.navigate('Login')
    }
    else return setError(res.data.error)
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>SAYLANI WELFARE</Text>
        <Text style={styles.subHeading}>ONLINE DISCOUNT STORE</Text>
      </View>
      <KeyboardAvoidingView style={styles.inputContainer}>
        <View>
          {error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Contact"
          value={contact}
          onChangeText={text => setContact(text)}
          style={styles.input}
          keyboardType='numeric'
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.loginOption}>
          <Text>Already have an account?</Text>
          <Text
            style={{ color: '#61B846', fontWeight: 500, letterSpacing: 0.3 }}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  heading: {
    fontWeight: 700,
    letterSpacing: 0.2,
    fontSize: 30,
    color: '#61B846',
  },
  subHeading: {
    fontSize: 18,
    letterSpacing: 0.2,
    fontWeight: 600,
    color: '#024F9D',
  },
  errorMessage:{
    maxWidth: '70%',
    color: '#d81c03',
    fontWeight: 600,
    letterSpacing: 0.3,
    fontSize: 18,
  },
  inputContainer: {
    flex: 3,
    alignItems: 'center',
    width: '100%',
    gap: 5
  },
  input: {
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: '#D4D3D3',
    backgroundColor: '#fff',
    color: '#000000',
    fontSize: 15,
  },
  button: {
    width: '60%',
    paddingVertical: 10,
    backgroundColor: '#61B846',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 700,
  },
  loginOption: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 5
  },
})

export default Signup