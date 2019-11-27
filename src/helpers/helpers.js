const bcrypt = require('bcrypt');

exports.isPasswordValid = password => {
    const tester = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    return password.match(tester) == null ? false : true;
};

exports.isUsernameValid = username => {
    const tester = /[_]*(?!.*\W)/;
    return username.match(tester) == null ? false : true;
};

exports.isEmailValid = email => {
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
};

exports.encrypt = data => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
};

exports.compareEncrypt = (inputPassword, databasePassword) => {
    return bcrypt.compareSync(inputPassword, databasePassword);
  };
  