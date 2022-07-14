/** @format */

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

class Validate {
  constructor() {
    this.emailRegex = emailRegex;
  }

  isEmpty(...data) {
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) return true;
    }
    return false;
  }

  isEmail(email) {
    return this.emailRegex.test(email);
  }
}

export default new Validate();
