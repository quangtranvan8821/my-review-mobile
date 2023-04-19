import {
  Platform,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  InputAccessoryView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import { useState, useEffect, memo } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'
import FbGrid from 'react-native-fb-image-grid'

import { onPicker } from '../../../utils/ImageUpload'
import { useSelector, useDispatch } from 'react-redux'
import { addNewPost, isloading } from '../../../redux/post/postReducer'
import { fetchApiUpload } from '../../../lib/fetchAPI'

const CreatePost = ({ navigation }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [content, onChangeText] = useState('')
  const [image, setImage] = useState([])
  const [listImage, setListImage] = useState([])
  const inputAccessoryViewID = 'id'
  let isLoading = useSelector(isloading)
  const isFocused = useIsFocused()
  useEffect(() => {
    setImage(image)
  }, [image])
  const uploadImage = async () => {
    if (image.length > 0) {
      const formData = new FormData()
      image.map((value, key) => {
        formData.append('image', { name: `image${key}.jpeg`, uri: value, type: 'image/jpeg' })
      })

      try {
        const res = await fetchApiUpload('/api/v1/media/upload', 'post', formData)
        if (res.data) {
          setListImage(res.data.path)
          setImage([])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const onClose = () => {
    Alert.alert('Hủy ', 'Dũ liệu đang nhập sẽ bị xóa, Bạn chắc chắn muốn thoát?', [
      {
        text: 'Hủy',
        onPress: () => {
          return
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setImage([])
          onChangeText('')
          navigation.navigate('My Review')
        },
      },
    ])
  }
  const handleNewPost = async () => {
    try {
      if (image.length > 0) {
        await uploadImage()
      }
      let newPost = {
        name,
        content,
      }
      if (listImage.length > 0) {
        newPost = { ...newPost, medias: listImage }
      }
      const res = await dispatch(addNewPost(newPost))
      isLoading && ToastAndroid.show('Đang tạo bài viết...', ToastAndroid.TOP)
      if (res.payload) {
        setName('')
        onChangeText('')

        navigation.replace('home')
        ToastAndroid.show('Thành công!', ToastAndroid.TOP)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isFocused === false &&
      (content.length > 0 || image.length > 0) &&
      Alert.alert('Hủy', 'Dũ liệu đang nhập sẽ bị xóa, Bạn chắc chắn muốn thoát?', [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setImage([]), onChangeText('')
          },
        },
      ])
  }, [isFocused])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <TouchableOpacity
            onPress={handleNewPost}
            className="w-14 h-8 bg-white flex justify-center items-center rounded-lg mr-2"
          >
            <Text className="text-color-primary font-bold">Post</Text>
          </TouchableOpacity>
        </>
      ),
      headerLeft: () => (
        <View>
          <Ionicons onPress={(e) => onClose()} name="close-outline" size={26} color="#fff" style={{ marginLeft: 10 }} />
        </View>
      ),
    })
  }, [navigation, name, content])

  return (
    <>
      <View className="w-full flex justify-center items-center mt-6">
        <View className="w-5/6 flex flex-col items-center gap-4">
          {/* Title */}
          <TextInput
            className="border-2 w-full py-2 px-4 rounded-md border-color-primary"
            placeholder="Title"
            onChangeText={setName}
            value={name}
          />

          {/* Description */}
          <TextInput
            className="border-2 w-full py-2 px-4 rounded-md border-color-primary"
            placeholder="Want to share something?"
            onChangeText={onChangeText}
            value={content}
          />

          {/* Image */}
          <View className="flex items-end w-full justify-start rounded-md border-color-primary">
            <TouchableOpacity>
              <Ionicons
                name="images-outline"
                size={30}
                color="#644AB5"
                onPress={(e) => onPicker({ setImage })}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <SafeAreaView>
        {image?.length > 0 && (
          <View className="w-5/6 h-[200px] flex mt-1 ml-[30px]">
            <FbGrid images={image} />
          </View>
        )}
      </SafeAreaView>
    </>
  )
}
export default memo(CreatePost)
