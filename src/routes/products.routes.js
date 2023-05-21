import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.post("/products", async (req, res) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  });
  res.json(newProduct);
});

router.delete("/products/:id", async (req, res) => {
  const productDelete = await prisma.product.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json(productDelete);
});

router.get("/products/:id", async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return res.json(product);
});

export default router;
