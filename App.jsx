import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import userTab from './navigation/userTab'
import adminTab from './navigation/adminTab'
import { Login, Signup, Splash } from './screens'
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
            initialRouteName={'Login'}
          >
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='UserTab' component={userTab} />
            <Stack.Screen name='AdminTab' component={adminTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App