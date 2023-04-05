import { Button, View, ScrollView, RefreshControl, Alert, Text, Image, StatusBar } from 'react-native'
import PostItem from './PostItem.jsx'
import { useCallback, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Detail from './Detail'
import { Ionicons } from '@expo/vector-icons'

const ScrollHome = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      Alert.alert('error!', 'chua co api', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel...'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('yeahhh') },
      ])
      setRefreshing(false)
    }, 2000)
  }, [])

  function goDetail(params) {
    console.log('hmm', params)
    navigation.navigate('Detail', params)
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      }}
    >
      <StatusBar />

      <ScrollView
        style={{ width: '100%' }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <PostItem press={goDetail} />
      </ScrollView>
    </View>
  )
}
const UserPost = ({ route, nav }) => (
  <View className="flex flex-row w-full items-center h-full">
    <Ionicons name="chevron-back" size={24} color="black" onPress={(e) => nav.goBack()} />
    <Image className="w-8 h-8 rounded-full" source={{ uri: route?.image }} />
    <Text className="text-[16px]">{route?.user || 'VIET'}</Text>
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
            backgroundColor: 'purple',
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
          title: '',
          headerStyle: {
            height: 40,
          },
          headerLeft: () => <UserPost route={route.params} nav={navigation} />,
        })}
      />
    </Stack.Navigator>
  )
}
