import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button, View, Text, Alert, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import Post from './post'
import Notify from './notify'
import Icon from '@expo/vector-icons/Ionicons'
import CreatePost from './createPost'
import Profile from './profile'
import PostStore from './postStore'

const Tab = createBottomTabNavigator()

const Router = () => {
  const onClose = ({ navigation }) => {
    Alert.alert('Cancel ', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => {
          return
        },
        style: 'cancel',
      },
      { text: 'OK', onPress: () => navigation.navigate('My Review') },
    ])
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: '#644AB5',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarActiveTintColor: '#644AB5',
      }}
      initialRouteName="My Review"
    >
      <Tab.Screen
        name="My Review"
        component={Post}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Post Store"
        component={PostStore}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => <Icon name="bookmark-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Create Post"
        component={CreatePost}
        options={({ navigation }) => ({
          tabBarLabel: '',
          headerLeft: () => (
            <View>
              <Ionicons
                onPress={(e) => onClose({ navigation })}
                name="close-outline"
                size={26}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            </View>
          ),
          headerRight: () => (
            <>
              <TouchableOpacity className="w-14 h-8 bg-white flex justify-center items-center rounded-lg mr-3">
                <Text className="text-color-primary font-bold">Post</Text>
              </TouchableOpacity>
            </>
          ),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => <Icon name="add-circle-outline" size={35} color={color} />,
        })}
      />
      <Tab.Screen
        name="Notification"
        component={Notify}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => <Icon name="notifications" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => <Icon name="person-circle-outline" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
export default Router
