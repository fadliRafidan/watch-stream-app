import LoadingComponent from '@/components/LoadingComponent';
import { ImageAPIUrl } from '@/constants/ApiUrl';
import { Colors } from '@/constants/Colors';
import { UserMovieFavoritProps } from '@/interface/UserMovieFavoritProps';
import { AddMovieFavoritAction, GetMovieFavoritByIDAction, RemoveMovieFavoritAction } from '@/store/actions';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface SingleTopMovieProps {
    id: string
    poster_path: string,
    backdrop_path: string,
    title: string,
    overview: string,
    original_language: string,
    tagline: string,
    release_date: string,
    vote_average: number,
    adult: boolean,
    genres: genresProps[],
    belongs_to_collection: belongsCollectionProps
}

interface genresProps {
    id: string,
    name: string
}
interface belongsCollectionProps {
    id: string,
    name: string,
    poster_path: string,
}

export default function DetailMovieSceen() {
    const { movie_id } = useLocalSearchParams();
    const dispatch: any = useDispatch();
    const [detailMovie, setDetailMovie] = useState<SingleTopMovieProps>()
    const [detailMovieError, setDetailMovieError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [favoritLocalData, setFavoritLocalData] = useState<UserMovieFavoritProps>()
    const getDetailMovies = async () => {
        setLoading(true);
        await axios.get(`movie/${movie_id}?language=en-US`)
            .then(response => {
                setDetailMovie(response.data)
                setLoading(false);
            })
            .catch(error => {
                setDetailMovieError(true)
                setLoading(false);
            });
    }

    const getLocalFavoritDetailMovies = async () => {
        const favorit = await GetMovieFavoritByIDAction(movie_id)
        setFavoritLocalData(favorit)
    }

    useEffect(() => {
        if (movie_id) {
            getDetailMovies()
            getLocalFavoritDetailMovies()
        }
    }, [movie_id])

    const onAddToFavorit = async (data: SingleTopMovieProps) => {
        try {
            if (favoritLocalData?.id === data.id && favoritLocalData?.isFavorit) {
                await dispatch(RemoveMovieFavoritAction(data.id));
                await getLocalFavoritDetailMovies()
                ToastAndroid.showWithGravity('Berhasil dihapus dari favorit!', 1000, 100)
            } else {
                await dispatch(AddMovieFavoritAction({
                    id: data.id,
                    poster_path: data.poster_path,
                    title: data.title,
                    isFavorit: true
                }));
                await getLocalFavoritDetailMovies()
                ToastAndroid.showWithGravity('Berhasil ditambah ke favorit!', 1000, 100)
            }
        } catch (error) {

        }
    }
    if (detailMovieError) {
        return (
            <View style={styles.detailMovieErrorContainer}>
                <Pressable
                    onPress={() => getDetailMovies()}
                    style={styles.detailMovieErrorButton}
                >
                    <Text style={styles.detailMovieErrorText}>
                        Terjadi kesalahan saat memuat film
                    </Text>
                    <Ionicons
                        name={'reload'}
                        size={19}
                        color={'#FFFFFF'}
                    />
                </Pressable>
            </View>
        )
    }
    if (loading) {
        return <LoadingComponent />
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground
                    resizeMode='contain'
                    source={{ uri: ImageAPIUrl + detailMovie?.backdrop_path }}
                    style={styles.imageBackground}
                >
                    <View style={styles.playButton}>
                        <Ionicons name='play' size={50} color={'#FFF'} />
                    </View>
                </ImageBackground>
                <View style={styles.wrapperDesc}>
                    <View style={styles.wrapperTopDesc}>
                        <View>
                            <Text style={styles.textTopDesc}>{detailMovie?.vote_average?.toFixed(1)} match</Text>
                        </View>
                        <View>
                            <Text style={styles.textTopDescSecond}>{detailMovie?.release_date.split("-")[0]}</Text>
                        </View>
                        <View>
                            <Text style={styles.textTopDescSecond}>{detailMovie?.adult ? "R" : "SU"}</Text>
                        </View>
                    </View>
                    <View style={styles.wrapperTitle}>
                        <Text style={styles.titleText}>{detailMovie?.title}</Text>
                    </View>
                    <View>
                        <View style={styles.wrapperBahasa}>
                            <Text style={styles.bahasaText}>Bahasa</Text>
                        </View>
                        <View style={[styles.wrapperBahasa, { columnGap: 10, marginTop: 7 }]}>
                            <View style={styles.wrapperBahasaValue}>
                                <Text style={{ color: '#9ca3af', fontSize: 14 }}>{detailMovie?.original_language.toUpperCase()}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.wrapperCategoryText}>
                            <Text style={styles.categoryText}>Kategori</Text>
                        </View>
                        <View style={styles.wrapperGenres}>
                            {detailMovie?.genres.map((row, index) => (
                                <View key={index} style={styles.viewGenreList}>
                                    <Text style={styles.textGenre}>{row.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <Pressable
                        onPress={() => detailMovie && onAddToFavorit(detailMovie)}
                        style={styles.wrapperButtonFavorit}
                    >
                        <Text style={styles.textButtonFavorite}>
                            {favoritLocalData?.id === detailMovie?.id && favoritLocalData?.isFavorit ?
                                "Hapus dari favorit" :
                                "Tambah ke favorit"
                            }
                        </Text>
                        <Ionicons
                            name={favoritLocalData?.id === detailMovie?.id && favoritLocalData?.isFavorit ? 'star' : 'star-outline'}
                            size={19}
                            color={favoritLocalData?.id === detailMovie?.id && favoritLocalData?.isFavorit ? '#f59e0b' : '#FFFFFF'}
                        />
                    </Pressable>
                    <View>
                        <View style={styles.wrapperSekilas}>
                            <Text style={styles.textSeklias}>Sekilas</Text>
                        </View>
                        <View style={styles.wraperSekilasValue}>
                            <Text style={styles.textSekilasValue}>{detailMovie?.overview}</Text>
                        </View>
                    </View>
                </View>
                {detailMovie?.belongs_to_collection !== null &&
                    (
                        <View>
                            <View style={styles.collectionWrapperDivider} />
                            <View style={{ padding: 15 }}>
                                <View>
                                    <View style={styles.wrapperTextSerupa}>
                                        <Text style={styles.textSerupa}>Serupa</Text>
                                    </View>
                                    <Pressable style={styles.buttontextCollection}>
                                        <ImageBackground
                                            resizeMode='cover'
                                            source={{ uri: ImageAPIUrl + detailMovie?.belongs_to_collection?.poster_path }}
                                            style={styles.imageCollection} >

                                        </ImageBackground>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: Colors.dark.background,
        marginBottom: 100,
    },
    detailMovieErrorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    detailMovieErrorButton: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9ca3af',
        paddingVertical: 8,
        borderRadius: 30,
        marginTop: 10,
        columnGap: 5
    },
    detailMovieErrorText: {
        color: '#FFF',
        fontSize: 15
    },
    imageBackground: {
        height: 225,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        backgroundColor: 'rgba(128, 128, 128,0.4)',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapperDesc: {
        rowGap: 10,
        padding: 15
    },
    wrapperTopDesc: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 10
    },
    textTopDesc: {
        color: '#22c55e',
        fontSize: 17
    },
    textTopDescSecond: {
        color: '#9ca3af',
        fontSize: 17
    },
    wrapperTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleText: {
        color: '#FFF',
        fontSize: 17
    },
    wrapperBahasa: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    bahasaText: {
        color: '#9ca3af',
        fontSize: 15
    },
    wrapperBahasaValue: {
        borderWidth: 1,
        borderColor: '#9ca3af',
        paddingHorizontal: 5,
        borderRadius: 2
    },
    wrapperCategoryText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    categoryText: {
        color: '#9ca3af',
        fontSize: 15
    },
    wrapperGenres: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 10,
        marginTop: 7
    },
    viewGenreList: {
        borderWidth: 1,
        borderColor: '#9ca3af',
        paddingHorizontal: 5,
        borderRadius: 2
    },
    textGenre: {
        color: '#9ca3af',
        fontSize: 14
    },
    wrapperButtonFavorit: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9ca3af',
        paddingVertical: 8,
        borderRadius: 30,
        marginTop: 10,
        columnGap: 5
    },
    textButtonFavorite: {
        color: '#FFF',
        fontSize: 15
    },
    wrapperSekilas: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textSeklias: {
        color: '#fff',
        fontSize: 17
    },
    wraperSekilasValue: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: 10,
        marginTop: 7
    },
    textSekilasValue: {
        color: '#9ca3af',
        fontSize: 14
    },
    collectionWrapperDivider: {
        height: 2,
        backgroundColor: '#6b7280',
        width: '100%',
        marginTop: 15
    },
    wrapperTextSerupa: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textSerupa: {
        color: '#fff',
        fontSize: 17
    },
    buttontextCollection: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderWidth: 0.5,
        borderColor: Colors.dark.text,
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 7
    },
    imageCollection: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
});