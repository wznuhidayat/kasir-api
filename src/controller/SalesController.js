const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const storeSales  = async (req, res) => {
 
    try {
      const totalTransaction = req.body.carts.reduce((accumulator, cart) => accumulator + parseInt(cart.price) * parseInt(cart.qty), 0);
      const sales = await prisma.sales.create({
        data: {
          code: await generateCode(),
          paymentMethod: 'cash',
          discount: parseFloat(req.body.discount),
          amountPay: parseInt(req.body.amountPay),
          totalTransaction: totalTransaction,
          adminId: 1,
          detailTransactions: {
            create: req.body.carts.map(cart => ({
              productInt: cart.id,
              qty: cart.qty,
              price: parseInt(cart.price),
            })),
          },
        },
      });
      res.status(201).json({ message: "Transaction Success!", sales });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  async function generateCode() {
    const today = new Date();
    const year = today.getFullYear().toString().slice(2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
  
    let count = 1;
  
    // Cek apakah kode dengan tanggal yang sama sudah ada di database
    const existingCode = await prisma.sales.findFirst({
      where: {
        code: {
          startsWith: `${year}${month}${day}`
        }
      },
      orderBy: {
        code: 'desc'
      }
    });
  
    if (existingCode) {
      count = parseInt(existingCode.code.slice(-4)) + 1;
    }
  
    const code = `${year}${month}${day}${count.toString().padStart(4, '0')}`;
  
    
  
    return code;
  }

module.exports = { storeSales }