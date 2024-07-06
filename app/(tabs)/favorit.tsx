import EmpetyComponentList from '@/components/EmpetyComponentList';
import MovieListSavedItem from '@/components/HomeComponent/MovieListSavedItem';
import { Colors } from '@/constants/Colors';
import { UserMovieFavoritProps } from '@/interface/UserMovieFavoritProps';
import { RootState } from '@/store/store';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function FavoritScreen() {
  const favorit: UserMovieFavoritProps[] = useSelector((state: RootState) => state.AuthReducers.favorit);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {favorit?.map((row, index) => (
          <MovieListSavedItem data={row} key={index} />
        ))
        }
      </View>
      {favorit === null &&
          <EmpetyComponentList />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.dark.background,
    paddingVertical: 15
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: 20,
    columnGap: 5
  }
});
