/** @format */

// @author: pqkluan@gmail.com

// Use to validate single input field, form or any random value.
// NOTE: This model is not actually nice to work with pre-define form (that have their own error warning on each error).

// Validate source & document:
// https://validatejs.org/#custom-validator

import validate from "validate.js";

const emailConstraints = {
  foo: {
    presence: {
      presence: true,
      message: "This field is empty",
    },
    email: {
      email: true,
      message: "Incorrect email format",
    },
  },
};

const phoneConstraints = {
  foo: {
    presence: {
      presence: true,
      message: "Please fill in your phone number",
    },
    format: {
      pattern: "^[0-9]{15}$",
      flags: "i",
      message: "Incorrect phone number",
    },
  },
};

const passwordConstraints = {
  foo: {
    presence: {
      presence: true,
      message: "This field is empty",
    },
    length: {
      minimum: 6,
      message: "Must be at least 6 characters",
    },
  },
};

const confirmPasswordConstraints = {
  foo2: {
    equality: "foo",
  },
};

const Validator = {
  // Most validate function receive a value (or a group of value) and return undefined if there is no error,
  // Otherwise, return a string as a error (or a array of strings for multi errors);

  /**
   * Check a string as email
   *
   * @param {string} input
   * @returns undefined as true, string as false
   */
  checkEmail(input) {
    return facade(emailConstraints, input);
  },

  /**
   * Check a string as phone
   *
   * @param {string} input
   * @returns undefined as true, string as false
   */
  checkPhone(input) {
    return facade(phoneConstraints, input);
  },

  checkPassword(password) {
    return facade(passwordConstraints, password);
  },

  checkConfirmPassword(password, confirmPassword) {
    return facade(confirmPasswordConstraints, password, confirmPassword);
  },
};

/**
 * Use to shorten common validate code
 *
 * @param {string} input
 * @param {object} constraints
 * @returns undefined as true, string as false
 */
const facade = (constraints, input, input2 = undefined) => {
  let result;
  if (input2 != undefined)
    result = validate({ foo: input, foo2: input2 }, constraints);
  else result = validate({ foo: input }, constraints);
  return result === undefined ? result : removeFirstWord(result.foo[0]);
};

/**
 * Because this lib return the field name in error string. I need to cut it out.
 *
 * @param {string} result
 * @returns result without headed error name
 */
const removeFirstWord = (result) => result.substr(result.indexOf(" ") + 1);

export default Validator;
