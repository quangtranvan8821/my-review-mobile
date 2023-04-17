import { View, Text, TouchableOpacity, Image, ScrollView,Alert } from 'react-native'
import { memo,useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'

import Comment from './Comment.jsx'
import { selectPostById } from '../../../redux/post/postReducer.js'
import { TextInput } from 'react-native'
import { Avatar } from '@rneui/base'

const Detail = ({ route, navigation }) => {
  const post = useSelector((state) => selectPostById(state, route.params))
  const [comment, setComment] = useState('')


  const onClose = () => {
    if (comment.length > 0) {
      Alert.alert('Cancel ', 'Are you sure?', [
        {
          text: 'Cancel',
          onPress: () => {
            return
          },
          style: 'cancel',
        },
        { text: 'OK', onPress: () => navigation.goBack() },
      ])
    }
    
     else navigation.goBack()
    
  }
  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
          <View className="w-full flex flex-row items-center ">
          <Ionicons onPress={e => onClose()} name="chevron-back-outline" size={33} color="#fff" className="ml-2" />
          <Avatar rounded size='medium' source={post?.createdBy?.avatar ? { uri:post?.createdBy?.avatar} : require('../../../../assets/images/Avatar.png')}/>
          <Text className="text-2xl ml-[5px] font-medium text-white">{post.name}</Text>
        </View>
      ),
    })
  }, [navigation,route])
  return (
    <ScrollView className="p-2 bg-white">
      <View className=" flex rounded-lg w-full">
        
        <Text className="py-1 text-[18px]">{post.content}</Text>

        <View className="w-full max-h-80">
          <Image className="w-full aspect-auto h-full rounded" source={require('../../../../assets/images/hotay.jpg')}  />
        </View>

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
            <TouchableOpacity onPress={(e) => onShare()} className="p-[5px] ml-[10px]">
              <Text>
                <Ionicons name="paper-plane-outline" size={33} color="#644AB5" />
              </Text>
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
          onChangeText={(e) => setComment(e)}
        />
        <TouchableOpacity className="absolute right-3 bottom-2">
          <Ionicons name="send" size={35} color="#644AB5" />
        </TouchableOpacity>
      </View>
        <Comment />
        
      </View>
    
    </ScrollView>
  )
}
export default memo(Detail)
