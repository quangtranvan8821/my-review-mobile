import { Button, View, Text, TextInput, ScrollView, RefreshControl, TouchableOpacity, Alert, Image } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from 'react'

const Comment = ({ id }) => {

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: 250, marginHorizontal: 2 }}>
        <View className="w-full h-full">
          <View className="flex flex-row w-full h-14 mb-4 rounded border-color-primary">
            <View className="flex justify-center w-6 h-6 ml-6 mt-[7px]">
              <Image className="w-6 h-6 rounded-full" source={require('../../../../assets/images/user.png')} />
            </View>

            <View className="p-[5px] rounded-xl ml-[4px] bg-slate-200 w-5/6">
              <Text className="text-base font-medium">Sang</Text>
              <Text className="text-xs">I'm a badboi</Text>
            </View>
          </View>
        </View>
      </ScrollView>

   
    </View>
  )
}
export default Comment
