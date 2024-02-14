const express = require('express');

const router = express.Router();
const { getUser, Register, Login, Logout } = require('../controller/UserController.js');
const { Categories } = require('../controller/CategoriesController.js');
const { isAuthenticated } = require('../middlewares/Authenticate.js')

// router.get('/users', async (req, res) => {
//     // const user = await prisma.user.create({
//     //   data: { 
//     //     name: 'Alice',
//     //     email: 'alice@prisma.io',
        
//     //   },
//     // })
//     res.send('hello');
//   })
// User
router.get("/user", isAuthenticated,getUser);
router.post("/register", Register);
router.post("/login", Login);
router.delete("/logout", Logout);

//Category 
router.get("/categories", isAuthenticated,Categories);

module.exports = router;