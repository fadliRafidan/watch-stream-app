import { View, Text, ImageBackground, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { ImageAPIUrl } from '@/constants/ApiUrl';
import { Colors } from '@/constants/Colors';
import { UserMovieFavoritProps } from '@/interface/UserMovieFavoritProps';
import { router } from 'expo-router';

export type MovieProps = {
    data: UserMovieFavoritProps
};
export default function MovieListSavedItem({ data }: MovieProps) {
    return (
        <Pressable onPress={() => router.push({ pathname: 'detail_movie', params: { movie_id: data.id } })}>
            <View style={styles.containerImage}>
                <Image resizeMode='cover' source={{ uri: ImageAPIUrl + data?.poster_path }} style={{ height: '100%', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }} />
            </View>
            <View style={styles.wrapperTitle}>
                <Text style={styles.title}>
                    {data.title}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    containerImage: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        borderWidth: 0.5,
        borderColor: Colors.dark.text,
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    wrapperTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
        paddingHorizontal: 5
    },
    title: {
        color: '#FFF',
        textAlign: 'left',
        fontSize: 11,
    }
})