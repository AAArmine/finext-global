const UPPERCASE_REGEX = /(.*[A-Z].*)/;
const DIGIT_REGEX = /(.*\d.*)/;
const SPECIAL_CHARACTER_REGEX = /(.*\W.*)/;
const LENGTH_REGEX = /(?=.{6,})/;
const LOWERCASE_REGEX = /(.*[a-z].*)/;

export const passValidCheck = (password: string) => {
  return {
    lowercase: LOWERCASE_REGEX.test(password),
    uppercase: UPPERCASE_REGEX.test(password),
    specialCharacter: SPECIAL_CHARACTER_REGEX.test(password),
    number: DIGIT_REGEX.test(password),
    moreThanSix: LENGTH_REGEX.test(password)
  };
};
