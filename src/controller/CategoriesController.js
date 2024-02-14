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

module.exports = { Categories }