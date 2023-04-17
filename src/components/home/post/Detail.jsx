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
      headerLeft: () => (
        <View>
          <Ionicons onPress={e => onClose()} name="chevron-back-outline" size={26} color="#fff" style={{ marginLeft: 10 }} />
        </View>
      ),
    })
  }, [navigation,route])
  return (
    <ScrollView className="p-2 bg-white">
      <View className=" flex rounded-lg w-full">
        <View className="w-full h-10 flex flex-row items-center">
          <Avatar rounded size='small' source={post?.createdBy?.avatar ? { uri:post?.createdBy?.avatar} : require('../../../../assets/images/Avatar.png')}/>
          <Text className="text-[16px] ml-[5px] font-medium">{post.name}</Text>
        </View>
        <Text>{post.content}</Text>

        <View className="w-full max-h-80">
          <Image className="w-full aspect-auto h-full rounded" source={require('../../../../assets/images/hotay.jpg')}  />
        </View>

        {/* icon */}
        <View className="flex flex-nowrap flex-row w-full items-center mt-[10px]">
          <View className="flex flex-nowrap flex-row w-1/2 items-center justify-start">
            <TouchableOpacity className="p-[5px] ml-[10px]">
              <Text>
                <Ionicons name="heart-outline" size={29} color="#644AB5" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-[5px] ml-[12px]">
              <Text>
                <Ionicons name="chatbubble-outline" size={26} color="#644AB5" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={(e) => onShare()} className="p-[5px] ml-[10px]">
              <Text>
                <Ionicons name="paper-plane-outline" size={26} color="#644AB5" />
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-nowrap flex-row w-1/2 items-center justify-end">
            <TouchableOpacity className="ml-[10px] p-[5px]">
              <Text>
                <Ionicons name="bookmark-outline" size={26} color="#644AB5" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="w-full h-auto">
      <View className="bg-white w-full rounded-md  flex items-start my-2">
        <TextInput
          className="w-[85%] py-2 px-4 bg-white outline-none none"
          placeholder="Enter Comment"
          value={comment}
          onChangeText={(e) => setComment(e)}
        />
        <TouchableOpacity className="absolute right-3 bottom-2">
          <Ionicons name="send" size={29} color="#644AB5" />
        </TouchableOpacity>
      </View>
        <Comment />
        
      </View>
    
    </ScrollView>
  )
}
export default memo(Detail)
