import { View, Text, TextInput, Alert, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isloading, haserr, login, token } from '../../redux/auth/reducer'
import LoaderAnimation from '../../lib/LoaderAnimation'
import * as Store from 'expo-secure-store'
import { getProfile } from '../../redux/profile/reducer'
const SignIn = ({ navigation }) => {
  const [user, setUser] = useState('')
  const [psw, setPsw] = useState('')
  let isLoading = useSelector(isloading)
  const dispatch = useDispatch()

  const submit = async () => {
    let dataFetch = {
      email: user,
      password: psw,
    }

    let res = await dispatch(login(dataFetch))
    if (res.payload) {
      await Store.setItemAsync('token', res.payload.access_token)
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOutr);
      await dispatch(getProfile())

      navigation.replace('home')
    } else {
      Alert.alert('Lỗi', 'Thông tin mật khẩu hoặc tài khoảng không chính xác')
    }
  }

  return (
    <SafeAreaView className="h-full">
      <View>
        <Image source={require('../../../assets/images/Vectors.png')} />
      </View>

      <View className="w-full flex justify-center items-center">
        <Text className="text-2xl font-medium mb-2">SignIn</Text>

        <View className="w-5/6 flex flex-col items-center gap-2">
          <TextInput
            onChangeText={(e) => setUser(e)}
            className="border-2 w-full py-2 px-4 border-purple rounded-3xl border-color-primary"
            value={user}
            placeholder="Enter Username"
            textContentType="username"
          />

          <TextInput
            onChangeText={(e) => setPsw(e)}
            className="border-2 w-full py-2 px-4 border-purple rounded-3xl border-color-primary"
            value={psw}
            textContentType="newPassword"
            name="password"
            placeholder="Enter password"
            autoCapitalize="none"
            secureTextEntry
            enablesReturnKeyAutomatically
          />
        </View>

        <TouchableOpacity
          onPress={(e) => submit()}
          className="w-2/6 border-2 py-2 px-4 border-purple rounded-3xl border-color-primary bg-color-primary flex items-center mt-4"
        >
          <Text className="text-white text-base font-bold">SignIn</Text>
        </TouchableOpacity>

        {isLoading && (
          <View className="w-2/6 h-2/6 absolute top-2/3">
            <LoaderAnimation />
          </View>
        )}

        <View className="w-4/5 h-14 flex flex-row justify-end items-center mt-5">
          <Text className="text-sm">Don't have an account?</Text>
          <Text className="ml-2 mr-2 text-color-primary" onPress={(e) => navigation.replace('logup')}>
            SignUp
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default memo(SignIn)
