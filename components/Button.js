import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import * as Font from 'expo-font';

export default function Button(props, {navigation}) {

    const [loaded] = Font.useFonts({
        PretendardExtraBold : require('../assets/fonts/Pretendard-ExtraBold.ttf'),
        PretendardSemiBold : require('../assets/fonts/Pretendard-SemiBold.ttf'),
        PretendardRegular : require('../assets/fonts/Pretendard-Regular.ttf'),
        PretendardMedium : require('../assets/fonts/Pretendard-Medium.ttf'),
        PretendardBold : require('../assets/fonts/Pretendard-Bold.ttf')
      })
    
    if (!loaded) {
        return null;
    }

    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <Text style={{color: '#fff', fontFamily: 'PretendardMedium', fontSize: 18}}>{props.text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        height: 60,
        marginBottom: 20,
        backgroundColor: '#3182f7',
        borderRadius: 15,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
})