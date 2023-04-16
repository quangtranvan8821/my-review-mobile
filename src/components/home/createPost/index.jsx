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
} from 'react-native'
import { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'
import FbGrid from 'react-native-fb-image-grid'

import { onPicker } from '../../../utils/ImageUpload'
import { useSelector, useDispatch } from 'react-redux'
import { addNewPost } from '../../../redux/post/postReducer'
import { fetchApi } from '../../../lib/fetchAPI'

const CreatePost = ({ navigation }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [content, onChangeText] = useState('')
  const [image, setImage] = useState('')

  const inputAccessoryViewID = 'id'

  const isFocused = useIsFocused()

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append('image', {
      name: 'image',
      path: image,
      type: 'image/jpg',
    })

    try {
      const res = await fetchApi('/api/v1/media/upload', 'post', formData)
      if (res.data.success) {
        console.log('success', res.data)
        setImage('')
        // dispatch(addNewPost())
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNewPost = async () => {
    try {
      const newPost = {
        name,
        content,
      }

      const res = await dispatch(addNewPost(newPost))
      if (res.payload) {
        navigation.replace('home')
      }
      setName('')
      onChangeText('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isFocused === false &&
      (content.length > 0 || image.length > 0) &&
      Alert.alert('Cancel ', 'Are you sure?', [
        {
          text: 'Cancel',
          onPress: () => console.log(navigation.jumpTo('Create post')),
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
            <FbGrid images={image} onPress={uploadImage} />
          </View>
        )}
      </SafeAreaView>
    </>
  )
}
export default CreatePost
