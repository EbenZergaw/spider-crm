// src/index.js
import express, { Express, Request, Response } from "express";
var bodyParser = require('body-parser')
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app: Express = express();
const port = 4000;


var jsonParser = bodyParser.json()

app.post("/orders", jsonParser, (req: Request, res: Response) => {

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
        } = req.body
    
        prisma.order.create({
            data: {
                orderID,
                customerID,
                orderType,
                status,
                items,
                serviceFee,
                // tasks,
                details,
                delivery
            }
        })
        .then((data) => {
            console.log(data);
        })
      res.send(req.body);
        
    } catch (error) {
        res.status(400).send("ERROR")
    }
    
});

app.get("/test", (req: Request, res: Response) => {
    res.send("lets go");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});