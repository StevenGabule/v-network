export const GLOBAL_TYPES = {
  AUTH : "AUTH", 
  ALERT : "ALERT", 
  THEME: "THEME",
  STATUS: "STATUS",
  MODAL: "MODAL",
}

export const EditData = (data, id, post) => {
  const editData = data.map(item => (item._id === id) ? post : item);
  return editData;
}

export const DeleteData = (data, id) => {
  return data.filter(item => item._id !== id)
}