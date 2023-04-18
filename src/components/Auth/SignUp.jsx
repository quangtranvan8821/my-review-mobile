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
        <Image className="w-full" source={require('../../../assets/images/Vectors.png')} />
      </View>

      <View className="w-full flex justify-center items-center">
        <Text className="text-3xl font-medium mb-2 text-color-primary">SignUp</Text>

        <View className="w-5/6 flex flex-col items-center gap-4">
          <TextInput
            onChangeText={(e) => setUser(e)}
            className="border-2 w-full py-4 px-4 rounded-3xl border-color-primary"
            value={user}
            placeholder="Enter Email"
            textContentType="Email"
          />

          <TextInput
            onChangeText={e => validate(e,repsw,setPsw)}
            className="border-2 w-full py-4 px-4 rounded-3xl border-color-primary"
            value={psw}
            textContentType="newPassword"
            name="password"
            placeholder="Enter Password"
            autoCapitalize="none"
            secureTextEntry
            enablesReturnKeyAutomatically
          />
          <TextInput
            onChangeText={e => validate(e, psw, setRePsw)}
            className="border-2 w-full py-4 px-4 rounded-3xl border-color-primary"
            value={repsw}
            textContentType="newPassword"
            name="password"
            placeholder="Enter Re-Password"
            autoCapitalize="none"
            secureTextEntry
            enablesReturnKeyAutomatically
          />
          
        </View>
        <View className='w-4/5 text-left pt-2'>
        {err && <Text className="text-red-700">{err}</Text>}
        </View>
        <TouchableOpacity
          onPress={(e) => submit()}
          className="w-2/6 border-2 py-2 px-4 border-purple rounded-3xl border-color-primary bg-color-primary flex items-center mt-4"
        >
          <Text className="text-white text-base font-bold ">SignUp</Text>
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
