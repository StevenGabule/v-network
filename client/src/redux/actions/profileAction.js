import { imageUpload } from "../../utils/checkImage";
import { getDataAPI, patchDataAPI } from "../../utils/fetchData"
import { GLOBAL_TYPES } from "./globalTypes"

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
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