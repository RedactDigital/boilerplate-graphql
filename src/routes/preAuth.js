const { Router } = require('express');
const { hash, compare } = require('bcrypt');
const { Op } = require('sequelize');
const { randomBytes } = require('crypto');
const Validator = require('validatorjs');
const { getClientIp } = require('request-ip');
const { isValidPhoneNumber, parsePhoneNumber } = require('libphonenumber-js');
const { Users } = require(`${root}/src/database/models`);
const signJWT = require(`${root}/src/middleware/passport/signJWT`);

const preAuth = new Router();

module.exports = preAuth
  // ? ----------------------------------------------------- Registration ----------------------------------------------
  .post('/register', async (req, res) => {
    const { email, username, firstName, lastName, password, profileImage, phone, dateOfBirth, country } = req.body;

    // Define validation for phone number
    Validator.register(
      'phone',
      value => {
        return isValidPhoneNumber(value, country);
      },
      'Invalid phone number'
    );

    // Define rules for validation
    const rules = {
      email: 'required|email',
      firstName: 'required',
      lastName: 'required',
      password: 'required|min:8|max:64',
      profileImage: 'required',
      phone: 'phone',
      dateOfBirth: 'required|date',
      country: 'required',
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) return res.json({ success: false, message: validation.errors.all() });

    // Ensure that email is not already registered
    const user = await Users.findAll({ where: { email } });
    if (user && user.length) return res.json({ success: false, message: 'Email is already registered' });

    // Ensure that phone number is not already registered
    const userPhone = await Users.findAll({ where: { phone: parsePhoneNumber(phone, country).formatInternational() } });
    if (userPhone && userPhone.length)
      return res.json({ success: false, message: 'Phone number is already registered' });

    // Create user
    const createdUser = await Users.create({
      email,
      username,
      firstName,
      lastName,
      password: await hash(password, Number(process.env.SALT_ROUNDS)),
      profileImage,
      phone: phone ? parsePhoneNumber(phone, country).formatInternational() : null,
      dateOfBirth,
      country,
      verificationCode: process.env.NODE_ENV === 'production' ? randomBytes(3).toString('hex') : '111111',
    });

    // Remove password from response
    createdUser.password = null;

    // Generate jwt token
    const { token } = await signJWT(createdUser, getClientIp(req));

    return res.status(200).json({ success: true, user: createdUser, token });
  })

  // ? ----------------------------------------------------- Login -----------------------------------------------------
  .post('/login', async (req, res) => {
    const { email, phone, password } = req.body;

    // Find user
    const user = await Users.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
      attributes: { include: ['password'] },
    });

    // Check if user exists
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email/phone or password' });

    // Check password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ success: false, message: 'Invalid email/phone or password' });

    // Generate jwt token
    const { token } = await signJWT(user, getClientIp(req));

    // Remove password from response
    user.password = null;

    return res.status(200).json({ success: true, user, token });
  });
