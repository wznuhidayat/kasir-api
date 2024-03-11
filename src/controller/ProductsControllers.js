const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const Products = async (req, res) => {
    try {
      const products = await prisma.products.findMany(
       {
        include: {
          category: true,
        },
       }
      );
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
          categoryId: parseInt(req.body.category_id),
          price: parseInt(req.body.price),
          image: req.file.filename
        },
      });
      res.status(201).json({ message: "Products created!", product });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  const deleteProduct = async (req, res) => {
    try {
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