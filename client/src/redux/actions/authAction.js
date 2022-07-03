import { postDataAPI } from "../../utils/fetchData";
import { GLOBAL_TYPES } from "./globalTypes";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
    const res = await postDataAPI('login', data)
    dispatch({ type: GLOBAL_TYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user } })
    localStorage.setItem('firstLogin', true)
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { success: res.data.message, loading: false } })
  } catch (err) {
    console.error(err.message)
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.message } })
  }
}


export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
    const res = await postDataAPI('register', data)
    dispatch({ type: GLOBAL_TYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user } })
    localStorage.setItem('firstLogin', true)
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { success: res.data.message, loading: false } })
  } catch (err) {
    console.error(err.message)
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.message } })
  }
}

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem('firstLogin')
  if (firstLogin) {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })
    try {
      const res = await postDataAPI('refresh_token')
      dispatch({ type: GLOBAL_TYPES.AUTH, payload: { token: res.data.access_token, user: res.data.user } })
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })
  } catch (err) {
      console.error(err.message)
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.message } })
    }
  }
}