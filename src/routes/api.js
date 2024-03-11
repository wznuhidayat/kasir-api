const express = require('express');

const router = express.Router();
const { getUser, Register, Login, Logout } = require('../controller/UserController.js');
const { Categories, createCategory, deleteCategory } = require('../controller/CategoriesController.js');
const { Products, createProduct, deleteProduct }  = require('../controller/ProductsControllers.js');
const { isAuthenticated } = require('../middlewares/Authenticate.js');
const { uploadProduct } = require('../storage/FileStorage.js');

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
router.get("/categories",isAuthenticated,Categories);
router.post("/categories",isAuthenticated,createCategory);
router.delete("/categories/:id",isAuthenticated,deleteCategory);
//PRODUCTS
router.get("/products",Products);
router.post("/products",uploadProduct, createProduct);
router.delete("/products/:id",deleteProduct);

module.exports = router;