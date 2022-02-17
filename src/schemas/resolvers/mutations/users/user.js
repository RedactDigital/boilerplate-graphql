const { hash } = require('bcrypt');
const { Op } = require('sequelize');
const { randomBytes } = require('crypto');
const Validator = require('validatorjs');
const { isValidPhoneNumber, parsePhoneNumber } = require('libphonenumber-js');
const { UserType } = require(`${root}/src/schemas/typeDefs`);
const { string, date } = require(`${root}/src/schemas/typeDefs/baseTypes`);
const { Users } = require(`${root}/src/database/models`);
const signJWT = require(`${root}/src/middleware/passport/signJWT`);

module.exports = {
  name: 'createUser',
  type: UserType,
  args: {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    profileImage: string,
    phone: string,
    dateOfBirth: date,
    country: string,
  },
  resolve: async (_, args) => {
    let { email, username, password, phone, country } = args;

    // Define validation for phone number
    Validator.register(
      'phone',
      value => {
        return isValidPhoneNumber(value, country);
      },
      'Invalid phone number'
    );

    // Define validation for username
    Validator.register(
      'username',
      value => {
        return value.match(/^[a-zA-Z0-9_-]+$/);
      },
      'Username can only contain letters, numbers and underscores'
    );

    // Define rules for validation
    const rules = {
      email: 'required|email',
      username: 'required|username',
      firstName: 'required',
      lastName: 'required',
      password: 'required|min:8|max:64',
      profileImage: 'required',
      phone: 'phone',
      dateOfBirth: 'required|date',
      country: 'required',
    };

    const validation = new Validator(args, rules);
    if (validation.fails()) throw new Error(Object.values(validation.errors.all()).join(', '));

    // Ensure that username and email are not taken
    const user = await Users.findAll({ where: { [Op.or]: [{ email }, { username }] } });
    if (user && user.length) throw new Error('Username or email is already taken');

    // Format phone number
    if (phone) phone = parsePhoneNumber(phone, country).formatInternational();

    // Generate verification code
    args.verificationCode = process.env.NODE_ENV === 'production' ? randomBytes(3).toString('hex') : '111111';

    // Hash password
    const hashedPassword = await hash(password, Number(process.env.SALT_ROUNDS));
    password = hashedPassword;

    // Create user
    // eslint-disable-next-line no-unused-vars
    const createdUser = await Users.create(args);

    // Remove password from response
    createdUser.password = null;

    // Generate jwt token
    const { token } = await signJWT(createdUser);
    createdUser.token = token;

    return createdUser;
  },
};
