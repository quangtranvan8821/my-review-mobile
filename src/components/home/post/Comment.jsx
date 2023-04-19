import { Button, View, Text, TextInput, ScrollView, RefreshControl, TouchableOpacity, Alert, Image } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'
import { Avatar } from '@rneui/base'
import moment from 'moment/moment'
import 'moment/locale/vi'
const Comment = ({ data }) => {
  moment.locale('vi')
  let time = moment(data.created_at).utcOffset(+7)

  return (
    <View>
      <View className="w-full">
        <View className="flex flex-row w-full  mb-4 rounded border-color-primary">
          <View className="flex justify-center  ml-4 mt-[7px]">
            <Avatar
              rounded
              size="medium"
              source={
                data?.created_by?.avatar
                  ? { uri: data?.created_by?.avatar }
                  : require('../../../../assets/images/Avatar.png')
              }
            />
          </View>

          <View className="p-[7px] rounded-xl  ml-[4px] bg-slate-200 w-5/6">
            <Text className="text-base font-medium text-lg">{data?.created_by?.name}</Text>
            <Text className="text-lg">{data?.content}</Text>
            <View className="w-full flex items-end">
              <Text className=" text-[10px] text-slate-500">{moment(time).fromNow()}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
export default Comment
