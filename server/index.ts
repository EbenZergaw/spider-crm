// src/index.js
import express, { Express, Request, Response } from "express";
var bodyParser = require('body-parser')
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app: Express = express();
const port = 4000;
var jsonParser = bodyParser.json()

// CREATE ORDER
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

// CREATE CUSTOMER
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
                tags,
                location,
                details
            }
        })

        res.json(customer.customerID); 
        
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).send("Internal Server Error");
    }
});

// GET CUSTOMER
app.get('/customers/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        
        const customer = await prisma.customer.findUnique({
            where: {
                customerID: id
            }
        })

        if(customer == null){
            res.status(404).json("Customer not found")
        } else {
            res.json(customer)
        }

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
    
})

// UPDATE CUSTOMER
app.put('/customers/:id', jsonParser, async (req: Request, res: Response) => {

    const id = req.params.id;

    const {
        companyName,
        contactName,
        phoneNumber,
        email,
        stage,
        tags,
        location,
        details,
    } = req.body;

    try {

        const updatePayload: any = {};
        if (companyName !== undefined) updatePayload.companyName = companyName;
        if (contactName !== undefined) updatePayload.contactName = contactName;
        if (phoneNumber !== undefined) updatePayload.phoneNumber = phoneNumber;
        if (email !== undefined) updatePayload.email = email;
        if (stage !== undefined) updatePayload.stage = stage;
        if (tags !== undefined) updatePayload.tags = tags;
        if (location !== undefined) updatePayload.location = location;
        if (details !== undefined) updatePayload.details = details;
        
        const customer = await prisma.customer.update({
            where: {
                customerID: id
            },
            data: updatePayload
        })

        if(customer == null){
            res.status(404).json("Customer not found")
        } else {
            res.json(customer)
        }

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
    
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});