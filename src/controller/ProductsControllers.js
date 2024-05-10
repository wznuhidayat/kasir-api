const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

const Products = async (req, res) => {
    try {
      const filterCategory = JSON.parse(req.query.category);
      const query = {
        include: {
          category: true,
        },
      };
      
      if (filterCategory && filterCategory.length > 0) {
        query.where = {
          categoryId: {
            in: filterCategory,
          },
        };
      }
      
      const products = await prisma.products.findMany(query);
      if (!products)
        return res.status(404).send({ message: "Products Not Found." });
      res.status(200).json({ products: products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
const createProduct = async (req, res) => {
    try {
      const product = await prisma.products.create({
        data: {
          code:req.body.code,
          name:req.body.name,
          // categoryId: req.body.category_id  ,
          categoryId: parseInt(req.body.category_id),
          price: parseInt(req.body.price),
          image: req.file.filename
        },
      });
      res.status(201).json({ message: "Products created!", product });
    } catch (error) {
      fs.unlinkSync(path.join("public/images/products/")+req.file.filename);
      res.status(400).json({ message: error.message });
    }
  };
  const deleteProduct = async (req, res) => {
    try {
      const product = await prisma.products.findUnique({
        where: { id: parseInt(req.params.id) },
        select: {
          id: true,
          image: true,
        },
      });
      fs.unlinkSync(path.join("public/images/products/")+product.image);
      await prisma.products.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json({ message: "Products deleted" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

module.exports = { Products , createProduct, deleteProduct}