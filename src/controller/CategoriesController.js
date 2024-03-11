const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const Categories = async (req, res) => {
    try {
      const categories = await prisma.categories.findMany();
      if (!categories)
        return res.status(404).send({ message: "Categories Not Found." });
      res.status(200).json({ categories: categories });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
const createCategory = async (req, res) => {
  const { code, name } = req.body ;
  // res.json(code)
  try {
    const category = await prisma.categories.create({
      data: {
        code,
        name
      },
    });
    res.status(201).json({ message: "Category created!", category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    await prisma.categories.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json({ message: "Catagory deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { Categories, createCategory, deleteCategory }