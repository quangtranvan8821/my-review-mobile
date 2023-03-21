import { Button, Text, View } from "react-native"
import * as Store from 'expo-secure-store'
import { useEffect } from "react"
const PostItem = () => {
    useEffect(() => {
        (async () => {
            let a = await Store.getItemAsync('token')
        })()
    },[])
    return (
        <View className="flex-1">
            {/* Header detail */}
            <View>
                <Text className="text-2xl font-bold">Some fucking text</Text>
            </View>

            {/* Content */}
            <View></View>

            {/* Actions */}
            <View className="flex justify-between gap-1">
                <Button title="Like"></Button>
                <Button className="mt-1" title="Press me"/>
            </View>
        </View>
    )
}

export default PostItem