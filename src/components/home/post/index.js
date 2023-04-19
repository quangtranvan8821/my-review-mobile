import { Button, View, ScrollView, RefreshControl, Alert, Text, Image, StatusBar, ToastAndroid } from 'react-native'
import PostItem from './PostItem.jsx'
import { useCallback, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Detail from './Detail.jsx'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { isloading, loadPosts, postData, postDeletes } from '../../../redux/post/postReducer.js'
import * as Store from 'expo-secure-store'
import token from '../../../redux/auth/reducer.js'
import { loadComments } from '../../../redux/post/commentReducer.js'
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { profile } from '../../../redux/profile/reducer.js'

const ScrollHome = ({ navigation }) => {
  const dispatch = useDispatch()
  let isLoading = useSelector(isloading)
  const posts = useSelector(postData)
  const userData = useSelector(profile)
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState(null)

  const onRefresh = useCallback(() => {
    dispatch(loadPosts())
    setRefreshing(isLoading)
    isLoading == false && ToastAndroid.show('newsfeed updated!', ToastAndroid.TOP)
  }, [])

  async function goDetail(params) {
    // await dispatch(loadComments({ query: { post_id: params?.id } }))
    navigation.navigate('Detail', params)
  }

  useEffect(() => {
    ;(async () => {
      await dispatch(loadPosts())
    })()
  }, [dispatch])
  const onDelPost = async (id) => {
    try {
      Alert.alert('Cancel ', 'Are you sure?', [
        {
          text: 'Cancel',
          onPress: () => {
            return
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            let res = await dispatch(postDeletes(id))

            isLoading && ToastAndroid.show('deleting...!', ToastAndroid.SHORT)

            if (res.payload) {
              await dispatch(loadPosts())
              ToastAndroid.show('has been deleted!', ToastAndroid.SHORT)
            }
          },
        },
      ])
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View className="flex-1 items-center justify-center p-[5px]">
      <StatusBar />

      <ScrollView className="w-full" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <MenuProvider>
          {posts.map((post, index) => (
            <>
              {post.created_by_id === userData.id ? (
                <Menu key={index}>
                  <MenuTrigger key={index}>
                    <PostItem key={index} press={goDetail} post={post} />
                  </MenuTrigger>
                  <MenuOptions>
                    <MenuOption onSelect={() => alert(`Save`)} text="Sửa" />
                    <MenuOption onSelect={(e) => onDelPost(post.id)} text="Xóa" />
                  </MenuOptions>
                </Menu>
              ) : (
                <PostItem key={index} press={goDetail} post={post} />
              )}
            </>
          ))}
        </MenuProvider>
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
          headerTintColor: '#fff',
          headerStyle: {
            height: 60,
            backgroundColor: '#644AB5',
          },
        })}
      />
    </Stack.Navigator>
  )
}
