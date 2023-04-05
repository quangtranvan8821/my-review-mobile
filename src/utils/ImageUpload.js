import * as ImagePicker from 'expo-image-picker';

export const onPicker = async ({ setImage }) => {
    const arr = []
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit:10,
      quality: 1,
    })
     if (!result.canceled) {
         result.assets.map((value) => {
            arr.push(value.uri)
        })
      setImage(arr)
    }
  }

 
  
