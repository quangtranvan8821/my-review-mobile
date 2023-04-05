import { Button, View,Text, ScrollView, RefreshControl, Alert,Image } from 'react-native';

const Comment = ({id}) =>{

  return (
   <View style={{display: "flex",width:'100%', flexDirection: 'row'}}>
       <View style={{  height: 50, justifyContent: 'flex-start', marginTop: 5, alignItems: 'center' }}>
        <Image
          style={{ width: 32, height: 32, borderRadius: 50 , marginTop:5}}
          source={{uri:'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-meo-dang-yeu-cho-may-tinh-6.jpg'}}
        />
        
      </View>
      <View style={ { width:'88%', maxWidth:'90%', backgroundColor:'#fff',padding:5,borderRadius:4,marginTop:10,marginLeft:4}}>
      <Text style={{ fontSize: 16, marginLeft: 7 }}>sang</Text>
      <Text style={{fontSize: 14, marginLeft: 7}}>qua hayjdklfjds fjkldjflkdsjf lksdjfkldsjfdk fjldkjf clskjfdlskjf !!!</Text>
      </View>
   </View>
  )
}
export default Comment