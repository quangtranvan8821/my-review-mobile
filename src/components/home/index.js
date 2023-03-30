import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Post from './post'
import Notify from './notify'
import Icon from '@expo/vector-icons/Ionicons';
import CreatePost from './createPost'
import Profile from './profile';
import PostStore from './postStore';
import {Button,View,Text,Alert} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

const Router = () =>{

    const onClose = ({navigation}) =>{
    Alert.alert('cancel ','are you sure',[{
        text: 'Cancel',
        onPress: () => {return},
        style: 'cancel',
      },
      { text: 'OK', onPress: () => navigation.navigate('My Review')}])
  }
   return(
    <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard:true,
          headerStyle: {
          backgroundColor: 'purple',
         
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize:25,
        },
        tabBarStyle:{backgroundColor:"#fff",},
        tabBarActiveTintColor: 'purple',
              }}
      >
        <Tab.Screen
          name="My Review"
          component={Post}
          options={{tabBarLabel: '',headerShown:false ,tabBarIcon : ({color,size})=>(
            <Icon name="home" size={size} color={color} />
          ),
          }}
        />
        <Tab.Screen
          name="POST STORE"
          component={PostStore}
          options={{ tabBarLabel: '' ,tabBarIcon : ({color,size})=>(
            <Icon name="bookmark-outline" size={size} color={color} />
          ),
          }}
        />
         <Tab.Screen
          name="Create post "
          component={CreatePost}
          options={({navigation})=>({ tabBarLabel: '',headerLeft:()=>(<View><Ionicons onPress={e => onClose({navigation})} name="close-outline" size = {26} color='#fff'/></View>),headerRight:()=>(<View><Text>POST</Text></View>) ,headerTitleAlign: 'center',tabBarIcon : ({color,size})=>(
            <Icon name="add-circle-outline" size={35} color={color} />
          ) })}
        />
        <Tab.Screen
          name="Notification"
          component={Notify}
          options={{ tabBarLabel: '' ,tabBarIcon : ({color,size})=>(
            <Icon name="notifications" size={size} color={color} />
          ) }}
        />
        <Tab.Screen
          name="User"
          component={Profile}
          options={{ tabBarLabel: '' ,tabBarIcon : ({color,size})=>(
            <Icon name="person-circle-outline" size={30} color={color} />
          ),
          }}
        />
      </Tab.Navigator>
)
}
export default Router