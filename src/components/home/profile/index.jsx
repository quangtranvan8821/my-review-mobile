import {  Text, View, SafeAreaView, StatusBar, Image } from 'react-native'
import * as Store from 'expo-secure-store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, token } from '../../../redux/auth/reducer'
import { getProfile, profile } from '../../../redux/profile/reducer'
import { Button } from '@rneui/themed'
import Ionicons from '@expo/vector-icons/Ionicons'

const Profile = ({ navigation }) => {
  const dispatch = useDispatch()

  const Token = useSelector(token)
  const profileUser = useSelector(profile)
  // dang xuat

  useEffect(() => {
    ;async () => {
      await dispatch(getProfile())
    }
  }, [profileUser == undefined])
  const signOut = async () => {
    await dispatch(logout())
    let check = await Store.setItemAsync('token', Token)
    if (!check) {
      navigation.replace('login')
    }
  }

  return (
    <SafeAreaView className="flex-1 flex">
      <StatusBar />
      {/* Content */}
      {profileUser && (
        <View className="flex flex-row w-full h-14 my-2 px-3 items-center  justify-start">
          <Image source={require('../../../../assets/images/Avatar.png')} className="w-10 h-10 rounded-full" />
          <Text className="ml-3 text-2xl">{profileUser.name || 'anonymous user'}</Text>
        </View>
      )}
      <View>
        <Text>Settings</Text>
        <Ionicons name="chevron-forward-outline" size={22} color="black"></Ionicons>
      </View>
      <View className="w-full flex mt-9 
      items-center">
        <Button containerStyle={{width:"40%"}} title="logout" onPress={signOut} />
      </View>
    </SafeAreaView>
  )
}

export default Profile
