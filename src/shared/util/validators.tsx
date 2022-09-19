const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (configVal: number) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  configVal: configVal,
});
export const VALIDATOR_MAXLENGTH = (configVal: number) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  configVal: configVal,
});
export const VALIDATOR_MIN = (configVal: number) => ({
  type: VALIDATOR_TYPE_MIN,
  configVal: configVal,
});
export const VALIDATOR_MAX = (configVal: number) => ({
  type: VALIDATOR_TYPE_MAX,
  configVal: configVal,
});
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = (
  userEnteredValue: string, //user entred value
  validators: { type: string; configVal?: number }[] //array of validators
) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && userEnteredValue.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH && validator.configVal) {
      isValid =
        isValid && userEnteredValue.trim().length >= validator.configVal;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH && validator.configVal) {
      isValid =
        isValid && userEnteredValue.trim().length <= validator.configVal;
    }
    if (validator.type === VALIDATOR_TYPE_MIN && validator.configVal) {
      isValid = isValid && +userEnteredValue >= validator.configVal;
    }
    if (validator.type === VALIDATOR_TYPE_MAX && validator.configVal) {
      isValid = isValid && +userEnteredValue <= validator.configVal;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(userEnteredValue);
    }
  }
  return isValid;
};
