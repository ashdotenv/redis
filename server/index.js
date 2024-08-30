import express, { json } from "express"
import { getProducts } from "./api/products.js"
const app = express()
import { Redis } from "ioredis";
const redis = new Redis({
    password: 'CYIGVWvgluRY4lIG8SZn0PeMmdY7msxL',
    host: 'redis-16677.c281.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 16677
})
redis.on("connect", () => {
    console.log("Redis Connected");
})

app.get("/products", async (req, res) => {
    const isExist = await redis.exists("products")
    if (isExist) {
        const products = await redis.get("products")
        return res.json({
            products: JSON.parse(products)
        })
    }
    const products = await getProducts()
    await redis.setex("products", 20, JSON.stringify(products.products))
    res.json(products)
})

app.listen(5000, () => {
    console.log("Listening on port 5000");
})