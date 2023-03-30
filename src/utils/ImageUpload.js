import * as ImagePicker from 'expo-image-picker';

export const onPicker = async ({ setImage }) => {
    const arr = []
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    })
      console.log(result)
     if (!result.canceled) {
         result.assets.map((value) => {
            arr.push(value.uri)
        })
      setImage(arr)
    }
  }

 
  
