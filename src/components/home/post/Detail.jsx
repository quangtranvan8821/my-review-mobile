import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'

import Comment from './Comment.jsx'
import { selectPostById } from '../../../redux/post/postReducer.js'

const Detail = ({ route, navigation }) => {
  const post = useSelector((state) => selectPostById(state, route.params))

  return (
    <ScrollView className="pl-[10px] pr-[10px] mt-2 bg-white" showsVerticalScrollIndicator alwaysBounceVertical>
      <View className="h-auto  w-full p-2 flex border-color-primary border-2 justify-center items-start mb-[10px] rounded-lg">
        <View className="w-full h-10 flex flex-row items-center">
          <Image source={require('../../../../assets/images/user.png')} className="w-6 h-6 rounded-full" />
          <Text className="text-[16px] ml-[5px] font-medium">{post.name}</Text>
        </View>
        <Text>{post.content}</Text>

        <View className="w-full h-28">
          <Image className="w-full h-full rounded" source={require('../../../../assets/images/hotay.jpg')} />
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

      <View className="w-full h-full">
        <Comment />
      </View>
    </ScrollView>
  )
}
export default memo(Detail)
