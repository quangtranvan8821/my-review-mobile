import { SafeAreaView, Text } from 'react-native'
import React, { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'

import LayoutLoader from './components/LayoutLoader'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Router from './components/home'
import { getProfile } from './redux/profile/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()

export default Main = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState(null)

  const dispatch = useDispatch()

  //get token user
  const getUserToken = async () => {
    // testing purposes
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    try {
      // custom logic
      await SecureStore.deleteItemAsync('token')

      const token = await SecureStore.getItemAsync('token')
      if (token) {
        await dispatch(getProfile())
      }
      setUserToken(token)
    } finally {
      await sleep(800)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserToken()
  }, [])

  if (isLoading) {
    return <LayoutLoader />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userToken ? 'home' : 'login'}>
        <Stack.Screen
          name="home"
          component={Router}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="logup"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
