import MovieListItem from '@/components/HomeComponent/MovieListItem';
import { ImageAPIUrl } from '@/constants/ApiUrl';
import { Colors } from '@/constants/Colors';
import { HitungCurrTime } from '@/hooks/HomeFunction';
import { LogoutAction } from '@/store/actions';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

interface SingleTopMovieProps {
  id: string
  poster_path: string,
  title: string,
  overview: string,
  tagline: string,
  vote_average: number,
}
const height = Dimensions.get('window').height;
export default function HomeScreen() {
  const today = new Date();
  const currHours = today.getHours();
  const dispatch: any = useDispatch();
  const [movieList, setMovieList] = useState([])
  const [moviePopularList, setMoviePopularList] = useState([])
  const [tvSeriesList, setTVSeriesList] = useState([])
  const [loading, setLoading] = useState({ singleMovies: false, trendingMovies: false, movies: false, tvSeries: false })
  const [singleTopMovie, setSingleTopMovie] = useState<SingleTopMovieProps>()

  const getSingleTopMovies = async () => {
    setLoading((prev) => {
      return {
        ...prev,
        singleMovies: true
      }
    });
    await axios.get("movie/823464?language=en-US")
      .then(response => {
        setSingleTopMovie(response.data)
        setLoading((prev) => {
          return {
            ...prev,
            singleMovies: false
          }
        });
      })
      .catch(error => {
        setLoading((prev) => {
          return {
            ...prev,
            singleMovies: false
          }
        });
      });
  }
  const getListMovies = async () => {
    setLoading((prev) => {
      return {
        ...prev,
        movies: true
      }
    });
    await axios.get("trending/movie/day?language=en-US")
      .then(response => {
        setMovieList(response.data?.results)
        setLoading((prev) => {
          return {
            ...prev,
            movies: false
          }
        });
      })
      .catch(error => {
        console.error('error: ' + error);
        setLoading((prev) => {
          return {
            ...prev,
            movies: false
          }
        });
      });
  }
  const getListMoviesPopular = async () => {
    setLoading((prev) => {
      return {
        ...prev,
        trendingMovies: true
      }
    });
    await axios.get("movie/popular?language=en-US&page=1")
      .then(response => {
        setMoviePopularList(response.data?.results)
        setLoading((prev) => {
          return {
            ...prev,
            trendingMovies: false
          }
        });
      })
      .catch(error => {
        setLoading((prev) => {
          return {
            ...prev,
            trendingMovies: false
          }
        });
      });
  }
  const getListTVSeries = async () => {
    setLoading((prev) => {
      return {
        ...prev,
        tvSeries: true
      }
    });
    await axios.get("tv/top_rated?language=en-US&page=1")
      .then(response => {
        setTVSeriesList(response.data?.results)
        setLoading((prev) => {
          return {
            ...prev,
            tvSeries: false
          }
        });
      })
      .catch(error => {
        setLoading((prev) => {
          return {
            ...prev,
            tvSeries: false
          }
        });
      });
  }

  useEffect(() => {
    getListMovies()
    getSingleTopMovies()
    getListTVSeries()
    getListMoviesPopular()
  }, [])

  const handleLogout = async () => {
    await dispatch(LogoutAction())
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.wraper}>
          <ImageBackground style={styles.imageBackground} source={{ uri: ImageAPIUrl + singleTopMovie?.poster_path }} resizeMode="cover">
            <Pressable onPress={() => handleLogout()} style={styles.buttonLogout}>
              <Ionicons name='log-out' size={35} color={'#FFF'} />
            </Pressable>
            <View style={styles.userinfo}>
              <Text style={styles.currTime}>{HitungCurrTime(currHours)}</Text>
            </View>
            <View style={styles.heroWrapper}>
              <Text style={styles.title}>{singleTopMovie?.title}</Text>
              <Text style={styles.tagline}>{singleTopMovie?.tagline}</Text>
              <View style={styles.wrapperButton}>
                <Pressable style={styles.buttonPlay}>
                  <Ionicons name='play' color={"#FFFFFF"} />
                  <Text style={styles.textButtonPlay}>Play</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: 'detail_movie', params: { movie_id: singleTopMovie?.id }
                    })}
                  style={styles.buttonDetail}>
                  <Text style={styles.textButtonDetail}>Details</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.listWrapper}>
            <View>
              <Text style={styles.titleListView}>Trending Now</Text>
              <ScrollView horizontal>
                {movieList.map((item, index) => (
                  <MovieListItem key={index} data={item} loading={loading.movies} />
                ))}
              </ScrollView>
            </View>
            <View>
              <Text style={styles.titleListView}>Movie</Text>
              <ScrollView horizontal>
                {moviePopularList.map((item, index) => (
                  <MovieListItem key={index} data={item} loading={loading.trendingMovies} />
                ))}
              </ScrollView>
            </View>
            <View>
              <Text style={styles.titleListView}>TV Series</Text>
              <ScrollView horizontal>
                {tvSeriesList.map((item, index) => (
                  <MovieListItem key={index} data={item} loading={loading.tvSeries} />
                ))}
              </ScrollView>
            </View>
          </View>
          <Image style={styles.gradientImage} resizeMode='cover' source={require("@/assets/images/background-gradient.png")} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.dark.background,
    marginBottom: 100,
  },
  imageBackground: {
    height: height / 1.4,
    width: '100%',
  },
  wraper: {
    position: 'relative',
    flex: 1
  },
  buttonLogout: {
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 10
  },
  userinfo: {
    position: 'absolute',
    top: 60,
    left: 30,
    zIndex: 10
  },
  heroWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 10,
    paddingHorizontal: 20,
    marginTop: 100
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '500',
  },
  tagline: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '400'
  },
  wrapperButton: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10
  },
  buttonPlay: {
    backgroundColor: '#9ca3af',
    height: 30,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25
  },
  textButtonPlay: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 26,
    fontWeight: '500'
  },
  buttonDetail: {
    backgroundColor: 'transparent',
    borderColor: "#FFFFFF",
    borderWidth: 1,
    height: 30,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25
  },
  textButtonDetail: {
    color: '#FFF',
    fontSize: 15,
    lineHeight: 26,
    fontWeight: '500'
  },
  gradientImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 0,
    height: height
  },
  listWrapper: {
    zIndex: 10,
    flex: 1,
    paddingHorizontal: 20,
    rowGap: 7
  },
  titleListView: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5
  },
  currTime: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '500'
  }
});
