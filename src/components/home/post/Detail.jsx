import { View, Text, TouchableOpacity, Image, ScrollView, Alert, ToastAndroid } from 'react-native'
import { memo, useState, useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'

import Comment from './Comment.jsx'
import { selectPostById } from '../../../redux/post/postReducer.js'
import { TextInput } from 'react-native'
import { Avatar } from '@rneui/base'
import {
  addNewComment,
  commentData,
  commentDeletes,
  loadComments,
  isloading,
} from '../../../redux/post/commentReducer.js'
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { profile } from '../../../redux/profile/reducer.js'
import { Skeleton } from '@rneui/themed'
const Detail = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const post = route.params
  const datacmt = useSelector(commentData)
  const userData = useSelector(profile)
  let isLoading = useSelector(isloading)
  const [comment, setComment] = useState('')

  useLayoutEffect(() => {
    dispatch(loadComments({ query: { post_id: post.id } }))

    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View className="flex items-center flex-row">
          <Ionicons onPress={(e) => onClose()} name="chevron-back-outline" size={33} color="#fff" className="ml-2" />
          <Avatar
            rounded
            size="medium"
            source={
              post?.created_by?.avatar
                ? { uri: post?.created_by?.avatar }
                : require('../../../../assets/images/Avatar.png')
            }
          />
          <Text className="text-2xl ml-[5px] font-medium text-white">{post.created_by.name}</Text>
        </View>
      ),
    })
  }, [navigation, route])

  const onClose = () => {
    try {
      Alert.alert('My Review ', 'Bạn có chắc chắn muốn thoát?', [
        {
          text: 'Hủy',
          onPress: () => {
            return
          },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    } catch (error) {
      console.log(error)
    }
  }
  const onDelCmt = async (id) => {
    try {
      Alert.alert('My Review ', 'Bạn chắc chắn muốn xóa?', [
        {
          text: 'Hủy',
          onPress: () => {
            return
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            let res = await dispatch(commentDeletes(id))

            isLoading && ToastAndroid.show('Đang xóa!', ToastAndroid.SHORT)

            if (res.payload) {
              await dispatch(loadComments({ post_id: post.id }))
              ToastAndroid.show('Xóa thành công!', ToastAndroid.SHORT)
            }
          },
        },
      ])
    } catch (error) {
      console.log(error)
    }
  }

  const submit = async () => {
    if (comment.trim() === '') {
      return
    }
    let data = {
      post_id: post.id,
      content: comment,
    }
    let res = await dispatch(addNewComment(data))
    isLoading && ToastAndroid.show('Đang gửi!', ToastAndroid.SHORT)

    if (res.payload) {
      setComment('')
      await dispatch(loadComments({ post_id: post.id }))
      ToastAndroid.show('Đã bình luận!', ToastAndroid.SHORT)
    }
  }
  const onChangeText = (value) => {
    setComment(value)
  }
  const SkeketonList = () => (
    <View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
      <View className="flex flex-row items-center justify-center mb-2 ">
        <Skeleton circle width={53} height={53} style={{ marginRight: 4 }} animation="wave" />
        <Skeleton width={'83%'} height={65} animation="wave" style={{ borderRadius: 10 }} />
      </View>
    </View>
  )
  return (
    <ScrollView className="p-2 bg-white">
      <View className=" flex rounded-lg w-full">
        <Text className="py-1 text-[18px]">{post.content}</Text>

        {/* <View className="w-full max-h-80">
          <Image className="w-full aspect-auto h-full rounded" source={require('../../../../assets/images/hotay.jpg')}  />
        </View> */}

        {/* icon */}
        <View className="flex flex-nowrap flex-row w-full items-center mt-[10px]">
          <View className="flex flex-nowrap flex-row w-1/2 items-center justify-start">
            <TouchableOpacity className="p-[5px] ml-[10px]">
              <Text>
                <Ionicons name="heart-outline" size={36} color="#644AB5" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-[5px] ml-[12px]">
              <Text>
                <Ionicons name="chatbubble-outline" size={33} color="#644AB5" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-[5px] ml-[10px]">
              <Ionicons onPress={(e) => onShare()} name="paper-plane-outline" size={33} color="#644AB5" />
            </TouchableOpacity>
          </View>

          <View className="flex flex-nowrap flex-row w-1/2 items-center justify-end">
            <TouchableOpacity className="ml-[10px] p-[5px]">
              <Text>
                <Ionicons name="bookmark-outline" size={33} color="#644AB5" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="w-full">
        <View className="bg-white m-2  w-full rounded-md  flex items-start my-2">
          <TextInput
            className="w-[90%] py-3 px-4  bg-slate-200 rounded-lg outline-none"
            placeholder="Enter Comment"
            value={comment}
            onChangeText={(e) => onChangeText(e)}
            multiline
            enablesReturnKeyAutomatically
          />
          <TouchableOpacity onPress={(e) => submit()} className="absolute right-3 bottom-2">
            <Ionicons name="send" size={35} color="#644AB5" />
          </TouchableOpacity>
        </View>
        {isLoading && <SkeketonList />}
        {datacmt && (
          <>
            <MenuProvider>
              {datacmt
                ?.filter((e) => e.post_id === post.id)
                ?.map((val, key) => (
                  <>
                    {val.created_by_id === userData.id ? (
                      <Menu key={key}>
                        <MenuTrigger>
                          <Comment data={val} />
                        </MenuTrigger>
                        <MenuOptions>
                          <MenuOption onSelect={() => alert(`Save`)} text="Sửa" />
                          <MenuOption onSelect={(e) => onDelCmt(val.id)} text="Xóa" />
                        </MenuOptions>
                      </Menu>
                    ) : (
                      <Comment key={key} data={val} />
                    )}
                  </>
                ))}
            </MenuProvider>
          </>
        )}
      </View>
    </ScrollView>
  )
}
export default memo(Detail)
