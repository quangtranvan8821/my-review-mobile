import { View, Text, TouchableOpacity, Image,ScrollView } from 'react-native'
import {memo} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import Comment from "./Comment.jsx"
const Detail =({route,navigation}) =>{
console.log(route.name,'haha')
const PostUser = route.params
  return(
     <View style={{ height: 'auto', width: '100%', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#DDDDDD', marginBottom: 10, borderRadius:8 }}>
     

      <Text>{PostUser?.content || "VIET"}</Text>
      <View style={{ display: 'flex', wrap: 'no-wrap', flexDirection: 'row',  width: '100%', alignItems: 'center', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#999999', marginTop: 10 }}>
        <View style={{ display: 'flex', wrap: 'no-wrap', flexDirection: 'row',  width: '50%', alignItems: 'center',justifyContent: 'flex-start', }}>
        <TouchableOpacity style={{ marginLeft: 10, padding: 5 }}><Text><Ionicons name="heart-outline" size={29} color="#fff" /></Text></TouchableOpacity>
        <TouchableOpacity  style={{ marginLeft: 12, padding: 5 }}><Text><Ionicons name="chatbubble-outline" size={26} color="#fff" /> </Text></TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 10, padding: 5 }}><Text> <Ionicons name="paper-plane-outline" size={26} color="#fff" /></Text></TouchableOpacity>
        </View>
        <View style={{display: 'flex', wrap: 'no-wrap', flexDirection: 'row',  width: '50%', alignItems: 'center',justifyContent: 'flex-end', }}>
            
         <TouchableOpacity style={{ marginLeft: 10, padding: 5 }}><Text> <Ionicons name="bookmark-outline" size={26} color="#fff" /></Text></TouchableOpacity>

        </View>
      </View>
       <ScrollView style={{width:"100%"}}>
          <Comment/>
          <Comment/>
         <Comment/>
          <Comment/>
       </ScrollView>
    </View>
  )
}
export default memo(Detail)
 