import { View, Text, ImageBackground, Pressable, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { ImageAPIUrl } from '@/constants/ApiUrl';
import { router } from 'expo-router';
export type MovieItemProps = {
    id: string;
    title: string;
    poster_path: string;
};

export type MovieProps = {
    data: MovieItemProps;
    loading: boolean;
};
export default function MovieListItem({ data, loading }: MovieProps) {
    return (
        <Pressable
            onPress={() => router.push({ pathname: 'detail_movie', params: { movie_id: data.id } })}
            style={styles.container}
        >
            <ImageBackground
                source={{ uri: ImageAPIUrl + data?.poster_path }}
                style={styles.image}
            >
                {loading &&
                    <ActivityIndicator size={20} color={'#FFF'} />
                }
            </ImageBackground>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderWidth: 0.5,
        borderColor: Colors.dark.text,
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        resizeMode: 'cover'
    }
})