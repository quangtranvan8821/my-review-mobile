
import { View, Text, TouchableOpacity, Image,Share } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { memo,useContext } from 'react';

const PostUser = {
  user: 'vietdeptrai',
  image: 'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-meo-dang-yeu-cho-may-tinh-6.jpg',
  content: 'Có lẽ tạo hóa biết đã lỡ tay ban phát cho con người một đặc tính rất dễ thương và cũng rất dễ ghét là lòng ham muốn sở hữu, nên lại trao tặng cho con người trái tim. Cái trái đỏ phập phồng nhịp nhàng ở ngực bên trái của mỗi con người là quà tặng của tạo hóa để không bao giờ có thể sở hữu được.Những người tình khổ sở, những nhà quản lí đau đầu, những nhà chiếm đoạt vô vọng trước cái quả đào bất trị ấy. Thi hào Ta-go thì mỉm cười, tưởng chừng ông đứng trên đỉnh Hi-ma-lay-a mà cười đôi mắt lo âu của thiên hạ, cười trăng lơ mơ trên biển cả:'
}
const PostItem = ({press}) => {
    const onShare = async () => {
    try {
      await Share.share({
        title:'hihi',
        message:'https://www.facebook.com/groups/869629100893457/permalink/928722028317497/',
        url:'https://www.facebook.com/groups/869629100893457/permalink/928722028317497/',  
      });
     
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <View style={{ height: 'auto', width: '100%', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#DDDDDD', marginBottom: 10, borderRadius: 8 }}>
      <View style={{ width: "100%", height: 50, display: "flex", flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 5, alignItems: 'center' }}>
        <Image
          source={{
            uri: PostUser?.image,
          }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 18, marginLeft: 7 }}>{PostUser?.user}</Text>
      </View>

      <Text onPress={e => press(PostUser)}>{PostUser?.content}</Text>
      <View style={{ display: 'flex', wrap: 'no-wrap', flexDirection: 'row', width: '100%', alignItems: 'center', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#999999', marginTop: 10 }}>
        <View style={{ display: 'flex', wrap: 'no-wrap', flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'flex-start', }}>
          <TouchableOpacity style={{ marginLeft: 10, padding: 5 }}><Text><Ionicons name="heart-outline" size={29} color="#fff" /></Text></TouchableOpacity>
          <TouchableOpacity onPress={e => press(PostUser)} style={{ marginLeft: 12, padding: 5 }}><Text><Ionicons name="chatbubble-outline" size={26} color="#fff" /> </Text></TouchableOpacity>
          <TouchableOpacity onPress={e => onShare()} style={{ marginLeft: 10, padding: 5 }}><Text> <Ionicons name="paper-plane-outline" size={26} color="#fff" /></Text></TouchableOpacity>
        </View>
        <View style={{ display: 'flex', wrap: 'no-wrap', flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'flex-end', }}>

          <TouchableOpacity style={{ marginLeft: 10, padding: 5 }}><Text> <Ionicons name="bookmark-outline" size={26} color="#fff" /></Text></TouchableOpacity>

        </View>
      </View>
     
    </View>
  )
}
export default memo(PostItem)