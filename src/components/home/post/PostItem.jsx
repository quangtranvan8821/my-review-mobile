import { View, Text, TouchableOpacity, Image, Share } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const PostItem = ({ press, post }) => {
  const dispatch = useDispatch()

  //Click Share
  const onShare = async () => {
    try {
      await Share.share({
        title: 'hihi',
        message: 'https://www.facebook.com/groups/869629100893457/permalink/928722028317497/',
        url: 'https://www.facebook.com/groups/869629100893457/permalink/928722028317497/',
      })
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  return (
    <View className="w-full p-2 flex border-color-primary border-2 justify-center items-start bg-white mb-[10px] rounded-lg">
      <View className="flex flex-row items-center">
        <Image source={require('../../../../assets/images/user.png')} className="w-6 h-6 rounded-full" />

        <Text className="text-[16px] ml-[5px] font-medium">{post?.name}</Text>
      </View>

      <Text>{post?.content}</Text>

      <View className="w-full h-28">
        <Image className="w-full h-full rounded" source={require('../../../../assets/images/hotay.jpg')} />
      </View>

      {/* Icon */}
      <View className="flex flex-nowrap flex-row w-full items-center mt-[10px]">
        <View className="flex flex-nowrap flex-row w-1/2 items-center justify-start">
          <TouchableOpacity className="p-[5px] ml-[10px]">
            <Text>
              <Ionicons name="heart-outline" size={29} color="#644AB5" />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={(e) => press(post?.id)} className="p-[5px] ml-[12px]">
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
  )
}
export default memo(PostItem)
