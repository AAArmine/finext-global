export const isOnlyLetters = (value: any) => {
  const letters = /^[A-Z a-z]+$/;
  if (typeof value == 'string' && value != '') {
    return !!value && letters.test(value);
  }
  return true;
};

export const isNumber = (value: any) => {
  if (typeof value === 'string') {
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '') {
      return true;
    }
    return false;
  }
  return false;
};

export const isInteger = (value: any) => {
  if (typeof value === 'string') {
    const reg = /^\d+$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '') {
      return true;
    }
    return false;
  }
  return false;
};
