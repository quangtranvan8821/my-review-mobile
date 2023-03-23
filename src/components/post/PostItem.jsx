import { Button, Text, View } from "react-native"
import * as Store from 'expo-secure-store'
import { useEffect } from "react"
import { useDispatch ,useSelector} from "react-redux"
import { logout,token } from "../../redux/Auth/reducer"
const PostItem = ({navigation}) => {
    const dispatch = useDispatch()
    const Token = useSelector(token)
    // useEffect(() => {
    //     (async () => {
    //         const a = await Store.getItemAsync('token')
    //         console.log(a,'gg', Token)
    //     })
    // }, [dispatch,Token])
    const signOut = async () => {
        await dispatch(logout())
        let check = await Store.setItemAsync('token',Token)
        if (!check) {
            navigation.replace('login')
        }
    }
    return (
        <View className="flex-1">
            {/* Header detail */}
            <View>
                <Text className="text-2xl font-bold">Some fucking text</Text>
            </View>

            {/* Content */}
            <View>

                <Button title="logout" onPress={signOut}/>
            </View>

            {/* Actions */}
            <View className="flex justify-between gap-1">
                <Button title="Like" onPress={signOut}></Button>
                <Button className="mt-1" title="Press me"/>
            </View>
        </View>
    )
}

export default PostItem