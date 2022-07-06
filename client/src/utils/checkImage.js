export const checkImage = (file) => {
  let err = "";
  if (!file) return "File does not exists";
  if (file.size > 1024 * 2024) err = "The largest image size is 1mb"
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') err = "Image format is incorrect."
  return err;
}