// src/index.js
import express, { Express, Request, Response } from "express";
var bodyParser = require('body-parser')
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app: Express = express();
const port = 4000;
var jsonParser = bodyParser.json()

app.post("/orders", jsonParser, async (req: Request, res: Response) => {
    try {
        const {
            orderID,
            customerID,
            orderType,
            status,
            items,
            serviceFee,
            tasks,
            details,
            delivery
        } = req.body;

        const order = await prisma.order.create({
            data: {
                orderID,
                customerID,
                orderType,
                status,
                items,
                serviceFee,
                tasks: {
                    create: tasks
                },
                details,
                delivery
            }
        });

        res.json(order); 
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/customers", jsonParser, async (req: Request, res: Response) => {
    try {
        const  {
            customerID,
            companyName,
            contactName,
            phoneNumber,
            email,
            stage,
            orders,
            date,
            tags,
            location,
            details,
        } = req.body;

        const customer = await prisma.customer.create({
            data: {
                customerID,
                companyName,
                contactName,
                phoneNumber,
                email,
                stage,
                orders: {
                    create: orders
                },
                date,
                tags,
                location,
                details
            }
        })

        res.json(customer); 
        
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});