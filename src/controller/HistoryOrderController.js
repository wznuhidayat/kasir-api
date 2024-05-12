const { PrismaClient } = require('@prisma/client')
const {validationResult} = require('express-validator');
const prisma = new PrismaClient();

const HistoryOrder = async (req, res) => {
    try {
      const sales = await prisma.sales.findMany({ // or 'query'
      include: {
        detailTransactions: true,
      }
    });
      if (!sales)
        return res.status(404).send({ message: "Sales Not Found." });
      res.status(200).json({ sales: sales });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
const detailOrder = async (req, res) => {
  try {
    const { id } = req.body ;
    const sales = await prisma.sales.findUnique({ // or 'query'
    where: { id: parseInt(id) },
    include: {
      detailTransactions: {
        include: {
          product: true
        }
      },
    }
  });
    if (!sales)
      return res.status(404).send({ message: "Detail Order Not Found." });
    res.status(200).json({ sales: sales });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { HistoryOrder, detailOrder }