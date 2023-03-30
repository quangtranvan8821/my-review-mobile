import {Platform, View, Text, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard, Image, Alert,InputAccessoryView,Dimensions,ScrollView  } from 'react-native'
import { useState ,useEffect} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { onPicker } from '../../../utils/ImageUpload'
import {useIsFocused } from '@react-navigation/native';
import FbGrid from "react-native-fb-image-grid";

const CreatePost = ({ navigation }) => {
  const [text, onChangeText] = useState('');
  const [image, setImage] = useState([])

  const inputAccessoryViewID  = 'id';
    const isFocused = useIsFocused();
    const onPress = (url, index, event) => {
        // url and index of the image you have clicked alongwith onPress event.
      }
    useEffect(()=>{
  isFocused === false && (text.length > 0 || image.length > 0) &&   Alert.alert('cancel ','are you sure',[{
        text: 'Cancel',
        onPress: () => console.log(navigation.jumpTo('Create post')),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => {setImage([]),onChangeText('')}}])
    }, [isFocused]);
   return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      
        <ScrollView style={{ flex: 1, backgroundColor: '#C0C0C0', paddingTop: 10 }}>

          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItem: 'center', }}>
            <TextInput
              style={{
                padding: 10,
                color: '#fff',
                width: '90%',
                outline: 'none',
                fontSize: 20,
                maxHeight: 230,

              }}
              value={text}
              onChangeText={onChangeText}
              placeholder="how do you feel?"
              multiline
              inputAccessoryViewID ={inputAccessoryViewID} 

            />
            <Ionicons style={{ width: '10%', height: 50 }} name="images-outline"  size={30} color='#fff' onPress={e => onPicker({setImage})}></Ionicons>
          </View>
          <SafeAreaView>

           {image?.length > 0 &&  <View className='w-full h-[200px]' >
                       <FbGrid
                           images={image}
                           onPress={onPress}
                       />
            </View>
            }           
            {Platform.OS === 'ios' && <InputAccessoryView nativeID = {inputAccessoryViewID}>
              <View style={{backgroundColor:'#fff', width:'100%'}}>
                <Text>hihi</Text>
              </View>
            </InputAccessoryView>}
          </SafeAreaView >
        </ScrollView>

    </TouchableWithoutFeedback>
  )
}
export default CreatePost