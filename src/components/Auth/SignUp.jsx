import { View, Text, Button, TextInput, Alert, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isloading, haserr, logup, token } from '../../redux/auth/reducer'
import { useNavigation } from '@react-navigation/native'
import LoaderAnimation from '../../lib/LoaderAnimation'
import * as Store from 'expo-secure-store'
import { getProfile } from '../../redux/profile/reducer'

const SignUp = ({ navigation }) => {
  const [user, setUser] = useState('')
  const [psw, setPsw] = useState('')
  const [repsw, setRePsw] = useState('')
  const [err, setErr] = useState('')

  let isLoading = useSelector(isloading)

  const dispatch = useDispatch()

  const submit = async () => {
    let dataFetch = {
      email: user,
      password: psw,
    }

    let res = await dispatch(logup(dataFetch))
    if (res.payload) {
      await Store.setItemAsync('token', res.payload.token)
      await dispatch(getProfile())

      navigation.replace('home')
    } else {
      Alert.alert('Lỗi', 'Thông tin mật khẩu hoặc tài khoản không chính xác')
    }
  }

  const validate = (e, obj, set) => {
    try {
      if (obj !== e && e.trim() !== '' && obj !== '') {
        setErr('mật khẩu không trùng khớp')
      } else {
        setErr('')
      }
    } catch (error) {
      setErr(error)
    }
    set(e)
  }

  return (
    <SafeAreaView className="h-full">
      <View>
        <Image source={require('../../../assets/images/Vectors.png')} />
      </View>

      <View className="h-2/5/5 w-full flex justify-center items-center">
        <Text className="text-4xl text-color-primary font-bold mb-2 tracking-[2px] ">SignUp</Text>

        <View>
          <View className="ml-5 mr-5 border-2 w-4/5 h-14 mt-5 mb-5 flex-row items-center border-purple rounded-3xl border-color-primary">
            <TextInput
              id
              onChangeText={(e) => setUser(e)}
              className="h-full flex-1 ml-[10px] text-base"
              value={user}
              placeholder="Enter Username"
              textContentType="username"
            />
          </View>

          <View className="ml-5 mr-5 border-2 w-4/5 h-14 mt-5 mb-5 flex-row items-center border-purple rounded-3xl border-color-primary">
            <TextInput
              onChangeText={(e) => setPsw(e)}
              className="h-full flex-1 ml-[10px] text-base"
              value={psw}
              textContentType="newPassword"
              name="password"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              enablesReturnKeyAutomatically
            />
          </View>

          <View className="ml-5 mr-5 border-2 w-4/5 h-14 mt-5 mb-5 flex-row items-center border-purple rounded-3xl border-color-primary">
            <TextInput
              onChangeText={(e) => validate(e, psw, setRePsw)}
              className="h-full flex-1 ml-[10px] text-base"
              value={repsw}
              textContentType="newPassword"
              name="re-password"
              placeholder="Enter re-password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              enablesReturnKeyAutomatically
            />
          </View>
          <Text className="text-red-600 text-[11px]">{err}</Text>
        </View>

        <TouchableOpacity
          onPress={(e) => submit()}
          className="rounded-2xl bg-color-primary justify-center items-center pt-5 pb-5 pl-32 pr-32"
        >
          <Text className="text-white text-base font-bold">SignUp</Text>
        </TouchableOpacity>
        {isLoading && (
          <View className="w-2/6 h-2/6 absolute top-2/3">
            <LoaderAnimation />
          </View>
        )}

        <View className="w-4/5 h-14 flex flex-row justify-end items-center mt-5">
          <Text className="text-sm">Already have an account?</Text>
          <Text className="ml-2 mr-2 text-color-primary" onPress={(e) => navigation.replace('login')}>
            SignIn
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default memo(SignUp)
