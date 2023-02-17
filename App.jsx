import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import userTab from './navigation/userTab'
import adminTab from './navigation/adminTab'
import {
  Home,
  AddProduct,
  AdminAllOrders,
  AdminAllProducts,
  AdminSetting,
  Cart,
  Login,
  Signup,
  Splash,
  UserSetting
} from './screens'
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const Stack = createStackNavigator()

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName={'UserTab'}
          >
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='UserTab' component={userTab} />
            <Stack.Screen name='AdminTab' component={adminTab} />
            {/* <Stack.Screen name='Home' component={Home} /> */}
            {/* <Stack.Screen name='Cart' component={Cart} /> */}
            {/* <Stack.Screen name='UserSetting' component={UserSetting} /> */}
            <Stack.Screen name='AddProduct' component={AddProduct} />
            <Stack.Screen name='AdminAllOrders' component={AdminAllOrders} />
            <Stack.Screen name='AdminSetting' component={AdminSetting} />
            <Stack.Screen name='AdminAllProducts' component={AdminAllProducts} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App