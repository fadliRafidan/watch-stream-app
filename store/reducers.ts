import { GetFavoritListAction } from "./actions";
import {
  SET_FAVORIT,
  LOGIN,
  LOGOUT,
  REMOVE_FAVORIT,
  GET_FAVORIT_BY_ID,
} from "./types";
const initialState = {
  favorit: GetFavoritListAction() || [],
  user: {
    email: "",
  },
};

type ActionType = {
  type: string;
  payload: any;
};

export default (state = initialState, { type, payload }: ActionType) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        favorit: payload.favorit,
        user: payload.user,
      };

    case LOGOUT:
      return {
        ...state,
        favorit: [],
        user: {
          email: "",
        },
      };

    case SET_FAVORIT:
      return { ...state, favorit: payload };

    case REMOVE_FAVORIT:
      return {
        ...state,
      };

    case GET_FAVORIT_BY_ID:
      return {
        ...state,
        favorit: [payload],
      };
  }

  return state;
};
