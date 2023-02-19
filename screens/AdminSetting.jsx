import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Animated } from 'react-native'
import { useDispatch } from 'react-redux'
import { logoutSuccessful } from '../redux/authReducer'
import { resetCart } from '../redux/cartReducer'
import { deleteUserInfo } from '../redux/userReducer'

const AdminSetting = ({navigation}) => {

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutSuccessful())
    dispatch(resetCart())
    dispatch(deleteUserInfo())
    navigation.navigate('Login')
  }

  return (
    <View>
      <Text>user setting</Text>
      <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

export default AdminSetting