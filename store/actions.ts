import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
  return async (dispatch: any) => {
    let favoritString = await AsyncStorage.getItem("favorit");
    let userString = await AsyncStorage.getItem("user");
    const favorit = favoritString ? JSON.parse(favoritString) : null;
    const user = userString ? JSON.parse(userString) : null;
    dispatch({
      type: "LOGIN",
      payload: { favorit: favorit, user: user },
    });
  };
};

export const LoginAction = (favorit: string | null, user: any) => {
  return async (dispatch: any) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: "LOGIN",
      payload: { favorit: favorit, user: user },
    });
  };
};
export const AddMovieFavoritAction = (favorit: any) => {
  return async (dispatch: any, getState: any) => {
    const existingFavorit = getState().AuthReducers.favorit || [];
    const updatedFavorit = [...existingFavorit, favorit];
    await AsyncStorage.setItem("favorit", JSON.stringify(updatedFavorit));
    dispatch({
      type: "SET_FAVORIT",
      payload: updatedFavorit,
    });
  };
};
export const RemoveMovieFavoritAction = (id: any) => {
  return async (dispatch: any, getState: any) => {
    const favoritString = await AsyncStorage.getItem("favorit");
    const existingFavorit = favoritString ? JSON.parse(favoritString) : [];

    const indexToRemove = existingFavorit.findIndex(
      (item: any) => item.id == id,
    );
    if (indexToRemove === -1) {
      throw new Error(`Item dengan id ${id} tidak ditemukan.`);
    }
    existingFavorit.splice(indexToRemove, 1);
    await AsyncStorage.setItem("favorit", JSON.stringify(existingFavorit));
    dispatch({
      type: "SET_FAVORIT",
      payload: existingFavorit,
    });
  };
};

export const GetMovieFavoritByIDAction = async (id: any) => {
  const favoritString = await AsyncStorage.getItem("favorit");
  const favorit = favoritString ? JSON.parse(favoritString) : null;
  const curr = favorit?.find((fav: any) => fav.id == id);
  if (curr) {
    return curr;
  }
  return null;
};

export const GetFavoritListAction = async () => {
  let favoritList;
  if (typeof window !== "undefined") {
    favoritList = await AsyncStorage.getItem("favorit");
    try {
      return favoritList ? JSON.parse(favoritList) : null;
    } catch (error) {
      return null;
    }
  }
  return favoritList;
};

export const LogoutAction = () => {
  return async (dispatch: any) => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("favorit");
    dispatch({
      type: "LOGOUT",
    });
  };
};
