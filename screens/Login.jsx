import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid
} from 'react-native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { authSuccessful } from '../redux/authReducer'
import { saveUserInfo } from '../redux/userReducer'

const Login = ({navigation}) => {

  const [email, setEmail] = useState('test@gmail.com')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')

  const authToken = useSelector(state => state.auth.authToken)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuth = async () => {
      if(authToken){
        const res = await axios.post(`${baseUrl}/api/auth/validatetoken`, { authToken })
        if(res.data.success){
          dispatch(saveUserInfo({
            userID: res.data.id,
            isAdmin: res.data.isAdmin,
            userName: res.data.name,
            profileUrl: res.data.profileURL
          }))
          if(res.data.isAdmin) return navigation.navigate('AdminTab')
          else return navigation.navigate('UserTab')
        }
        else return // Remove All Local Storage
      }
    }
    checkAuth()
  }, [])

  const handleLogin = async () => {
    if(!email.match(/([^\s])/) || !password.match(/([^\s])/)){
      return setError("All Fields are required")
    }
    setError("")
    ToastAndroid.show('Validating Credentials', ToastAndroid.SHORT)
    const res = await axios.post(`${baseUrl}/api/auth/login`, { email, password })
    if(res.data.success){
      ToastAndroid.show('Login Successfull', ToastAndroid.SHORT)
      dispatch(saveUserInfo({
        userID: res.data.userInfo.id,
        isAdmin: res.data.userInfo.isAdmin,
        userName: res.data.userInfo.name,
        profileUrl: res.data.userInfo.profileURL
      }))
      dispatch(authSuccessful(res.data.token))
      setEmail("")
      setPassword("")
      if(res.data.userInfo.isAdmin) return navigation.navigate('AdminTab')
      else return navigation.navigate('UserTab')
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
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.registerOption}>
          <Text>Don't have an account?</Text>
          <Text
            style={{ color: '#61B846', fontWeight: 500, letterSpacing: 0.3 }}
            onPress={() => navigation.navigate('Signup')}
          >
            Register Now
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
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
    flex: 2,
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
    fontSize: 20,
    color: '#fff',
    fontWeight: 700,
  },
  registerOption: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 5
  },
})

export default Login