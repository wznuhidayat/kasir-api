const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const {validationResult} = require('express-validator');
const getUser = async (req, res) => {
    try {
      const users = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (!users)
        return res.status(404).send({ message: "User   Tidak Ditemukan" });
      res.status(200).json({ user: users });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
const Register = async (req, res) => {
    try {
      const { name, email, password, confPassword } = req.body;
      if (!name || !email || !password || !confPassword)
        return res.status(400).send({ message: "Mohon Isi Semua Field" });
  
      if (password !== confPassword)
        return res.status(400).json({ message: "Password Tidak Cocok" });
      const salt = await bcrypt.genSalt(10);
      const hashPwd = await bcrypt.hash(password, salt);
  
      const user = await prisma.user.create({
        data: { name, email, password: hashPwd },
      });
      return res.json({
        message: "Registrasi Berhasil!",
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };
  const Login = async (req, res) => {
    // res.send( req.body);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).json({errors: errors.array()})
    }

    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).send({ message: "Mohon Isi Email dan Password" });
  
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return res.status(404).send({ message: "Email Tidak Ditemukan" });
  
      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) return res.status(401).send({ message: "Password Salah" });
  
      const token = jwt.sign({ email }, process.env.SECRET_KEY, {
        expiresIn: process.env.SK_EXPIRE,
      });
      return res
        .cookie("userToken", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ message: "Login Berhasil!", success: true });
    } catch (error) {
      return res.json({ message: error });
    }
  };
  const Logout = async (req, res) => {
    res.clearCookie("userToken");
    return res.json({ message: "Logout Berhasil!", success: true });
  };
module.exports = { getUser, Register ,Login, Logout}