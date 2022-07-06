export const checkImage = (file) => {
  let err = "";
  if (!file) return "File does not exists";
  if (file.size > 1024 * 2024) err = "The largest image size is 1mb"
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') err = "Image format is incorrect."
  return err;
}

export const imageUpload = async (images) => {
  let imageArr = [];
  for (const item of images) {
    const formData = new FormData()
    formData.append('file', item)
    formData.append('upload_preset', 'reactshop')
    formData.append('cloud_name', 'ddjx1gunj')
    const data = await (await fetch("https://api.cloudinary.com/v1_1/ddjx1gunj/image/upload", {method: "POST",body: formData})).json()
    imageArr.push({ public_id: data.public_id, url: data.secure_url })
  }
  return imageArr;
} 