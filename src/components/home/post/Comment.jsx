import { Button, View,Text, ScrollView, RefreshControl, Alert,Image } from 'react-native';

const Comment = ({id}) =>{

  return (
   <View style={{display: "flex",width:'100%', flexDirection: 'row'}}>
       <View style={{  height: 50, justifyContent: 'flex-start', marginTop: 5, alignItems: 'center' }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={{uri:'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-meo-dang-yeu-cho-may-tinh-6.jpg'}}
        />
        
      </View>
      <View style={ {maxWidth:'80%', backgroundColor:'#fff',padding:5,borderRadius:4,marginTop:10,marginLeft:4}}>
      <Text style={{ fontSize: 18, marginLeft: 7 ,fontSize:15}}>sang</Text>
      <Text style={{fontSize: 18, marginLeft: 7,fontSize:14 }}>qua hayjdklfjds fjkldjflkdsjf lksdjfkldsjfdk fjldkjf clskjfdlskjf !!!</Text>
      </View>
   </View>
  )
}
export default Comment