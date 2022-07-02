import { postDataAPI } from "../../utils/fetchData";

export const TYPES = {
  AUTH: 'AUTH'
}

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: "NOTIFY", payload: { loading: true } })
    const res = await postDataAPI('login', data)
    localStorage.setItem('firstLogin', true)
    dispatch({ type: "AUTH", payload: { loading: false, token: res.data.access_token, user: res.data.user } })
  } catch (err) {
    console.error(err.message)
    dispatch({ type: "NOTIFY", payload: { loading: false, error: err.message } })
  }
} 