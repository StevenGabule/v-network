export const GLOBAL_TYPES = {
  AUTH : "AUTH", 
  ALERT : "ALERT", 
  THEME: "THEME",
}

export const EditData = (data, id, post) => {
  return data.map(item => (item._id === id) ? post : item)
}

export const DeleteData = (data, id) => {
  return data.filter(item => item._id !== id)
}