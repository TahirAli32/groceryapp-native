import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Cart, UserSetting } from '../screens'
import { colors, icons } from '../constants/'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarShowLabel: false,
        headerShown: false,
        style:{
          backgroundColor: 'transparent',
          borderTopWidth: 0
        }
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: (({focused})  => (
            <Image 
              source={icons.home_icon}
              resizeMode="cover"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? colors.primary : colors.secondary
              }}
            />
          )),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={Cart}
        options={{
          tabBarIcon: (({focused})  => (
            <Image 
              source={icons.basket}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? colors.primary : colors.secondary
              }}
            />
          )),
        }}
      />
      <Tab.Screen
        name='Account'
        component={UserSetting}
        options={{
          tabBarIcon: (({focused})  => (
            <Image 
              source={icons.user}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? colors.primary : colors.secondary
              }}
            />
          )),
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs