interface requestData {
  [key: string]: any;
}

export const convertToFormData = <T extends requestData>(data: T): any => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};
