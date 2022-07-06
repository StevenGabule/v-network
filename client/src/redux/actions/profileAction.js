import { imageUpload } from "../../utils/checkImage";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData"
import { DeleteData, GLOBAL_TYPES } from "./globalTypes"

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UN_FOLLOW: "UN_FOLLOW",
}

export const getProfileUser = ({users,id,auth}) => async (dispatch) => {
  console.log("users,id,auth", users,id,auth);
  if (users.every(user => user._id !== id)) {
    try {
      dispatch({type: PROFILE_TYPES.LOADING, payload: true })
      const res = await getDataAPI(`/user/${id}`, auth.token);
      dispatch({type: PROFILE_TYPES.GET_USER, payload: res.data})
      dispatch({type: PROFILE_TYPES.LOADING, payload: false})
    } catch (err) {
      dispatch({type: GLOBAL_TYPES.ALERT, payload: {error: err.response.data.message} })
    }
  } 
}

export const updateProfileUser = ({userData, avatar, auth}) => async(dispatch) => {
  try {
    let media;
    dispatch({type: GLOBAL_TYPES.ALERT, payload: { loading: true }})
    if (avatar) media = await imageUpload([avatar])
    const res = await patchDataAPI('user', {
      ...userData,
      avatar: avatar ? media[0].url : auth.user.avatar
    }, auth.token)
    dispatch({type: GLOBAL_TYPES.AUTH, payload: {
      ...auth,
      user: {
        ...auth.user,
        ...userData,
        avatar: avatar ? media[0].url : auth.user.avatar
      }
    }})
    dispatch({type: GLOBAL_TYPES.ALERT, payload: {success: res.data.message}})
  } catch (err) {
    dispatch({type: GLOBAL_TYPES.ALERT, payload: {error: err.response.data.message} })
  }
}

export const follow = ({users, user, auth}) => async (dispatch) => {
  try {
    let newUser = {...user, followers: [...user.followers, auth.user]}
    dispatch({type: PROFILE_TYPES.FOLLOW, payload: newUser})
    dispatch({type: GLOBAL_TYPES.AUTH, payload: {...auth, user: {...auth.user, following: [...auth.user.following, newUser]}}})
  } catch (err) {
    dispatch({type: GLOBAL_TYPES.ALERT, payload: {error: err.response.data.message} })
  }
}

export const unfollow = ({users, user, auth}) => async (dispatch) => {
  try {
    let newUser = {
      ...user, 
      followers: DeleteData(user.followers, auth.user._id)
    }
    dispatch({type: PROFILE_TYPES.UN_FOLLOW, payload: newUser})
    dispatch({
      type: GLOBAL_TYPES.AUTH, 
      payload: {
        ...auth, 
        user: {
          ...auth.user, 
          following: DeleteData(auth.user.following, newUser._id)
        }
      }
    })
  } catch (err) {
    dispatch({type: GLOBAL_TYPES.ALERT, payload: {error: err.response.data.message} })
  }
}