import { Button, View, ScrollView, RefreshControl, Alert, Text, Image, StatusBar } from 'react-native'
import PostItem from './PostItem.jsx'
import { useCallback, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Detail from './Detail.jsx'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { isloading, loadPosts, postData } from '../../../redux/post/postReducer.js'
import * as Store from 'expo-secure-store'
import token from '../../../redux/auth/reducer.js'

const ScrollHome = ({ navigation }) => {
  const dispatch = useDispatch()
  let isLoading = useSelector(isloading)
  const posts = useSelector(postData)

  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState(null)

  const onRefresh = useCallback(() => {
    dispatch(loadPosts())
    setRefreshing(isLoading)
  }, [])

  function goDetail(params) {
    navigation.navigate('Detail', params)
  }

  useEffect(() => {
    ;(async () => {
      await dispatch(loadPosts())
    })()
  }, [dispatch])

  return (
    <View className="flex-1 items-center justify-center p-[5px]">
      <StatusBar />

      <ScrollView className="w-full" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {posts.map((post, index) => (
          <PostItem key={index} press={goDetail} post={post} />
        ))}
      </ScrollView>
    </View>
  )
}

//Header khi bam vao Detail
const UserPost = ({ route, nav }) => (
  <View className="flex flex-row w-full items-center h-full">
    <Ionicons name="chevron-back" size={24} color="white" onPress={(e) => nav.goBack()} />
  </View>
)

export default function Home({ navigation }) {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ScrollHome}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#644AB5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={({ route, navigation }) => ({
          title: 'Detail Post',
          headerTintColor: '#fff',
          headerStyle: {
            height: 40,
            backgroundColor: '#644AB5',
          },
          
        })}
      />
    </Stack.Navigator>
  )
}
