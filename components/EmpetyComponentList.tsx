import { View, Text, Dimensions, Image, StyleSheet } from 'react-native'
import React from 'react'
const height = Dimensions.get('window').height;
export default function EmpetyComponentList() {
    return (
        <View style={styles.container}>
            <Image source={require('@/assets/images/Empty-amico.png')} style={styles.image} />
            <Text style={styles.text}>Kamu belum menambahkan film favorit.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 1.3
    },
    image: {
        resizeMode: 'contain',
        height: 200
    },
    text: {
        color: '#FFF'
    }
})