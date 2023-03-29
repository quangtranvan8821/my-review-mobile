import { Button, View, ScrollView, RefreshControl, Alert,Text,Image ,} from 'react-native';
import PostItem from './PostItem.jsx'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Detail from './Detail';

const ScrollHome =({navigation}) =>{
   const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      Alert.alert('error!', 'chua co api', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel...'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('yeahhh') },]);
      setRefreshing(false);
    }, 2000);
  }, []);
  function goDetail(params){
    console.log('hmm',params)
      navigation.navigate('Detail',params)
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5 }}>
      <ScrollView style={{ width: '100%' }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <PostItem press={goDetail}/>
      </ScrollView>
    </View>

  );
}
const  UserPost = ({route}) =>(
     <View style={{ width: "100%", height: 50, display: "flex", flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5, alignItems: 'center' }}>
        <Image
          style={{ maxWidth: 50, maxHeight: 50, borderRadius: 50 }}
          source={{uri:route?.image}}
        />
        <Text style={{ fontSize: 18, marginLeft: 7 }}>{route?.user || 'VIET'}</Text>
      </View>

)
export default function Home({ navigation }) {
   const Stack = createStackNavigator();
   return (
     <Stack.Navigator>
      <Stack.Screen name="Home" component={ScrollHome}  options={{ headerShown: false }}/>
      <Stack.Screen name="Detail" component={Detail} options={({ route }) => ({title:'',headerTitle: ()=> <UserPost route={route.params}/>})} />
     </Stack.Navigator>
    
   )
}