import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function LoadingComponent() {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.text}>
                    Memuat
                </Text>
                <ActivityIndicator color={'#dc2626'} size={20} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    wrapper: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 8,
        borderRadius: 30,
        marginTop: 10,
        columnGap: 5
    },
    text: {
        color: '#dc2626',
        fontSize: 15,
        fontWeight: '500'
    }
})