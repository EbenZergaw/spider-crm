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
app.post("/customers", jsonParser, async (req, res) => {
    const {
        customerID,
        companyName,
        contactName,
        phoneNumber,
        email,
        stage,
        orders = [], // Default to an empty array if not provided
        tags,
        location,
        details,
    } = req.body;

    // Data validation (basic example, consider using a library like Joi or Yup for more comprehensive validation)
    if (!customerID || !companyName || !contactName || !email) {
        return res.status(400).send("Required fields are missing");
    }

    // More detailed validation can be added here for each field

    try {
        const customer = await prisma.customer.create({
            data: {
                customerID,
                companyName,
                contactName,
                phoneNumber,
                email,
                stage,
                // Handling orders, ensuring it's correctly formatted for nested create
                orders: {
                    create: orders.map((order : any) => ({
                        orderID: order.orderID,
                        orderType: order.orderType,
                        status: order.status,
                        items: order.items,
                        serviceFee: order.serviceFee,
                        details: order.details,
                        delivery: order.delivery,
                        tasks: {
                            create: order.tasks // Assuming tasks is an array of task objects
                        }
                    }))
                },
                tags,
                location,
                details
            }
        });

        res.json({ customerID: customer.customerID });
        
    } catch (error) {
        console.error("Failed to create customer:", error);
        
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

// ADD TASKS TO AN ORDER
app.post('/orders/:id/tasks', jsonParser, async (req: Request, res: Response) => {

    const id = req.params.id;

    const taskList = req.body
    
    try {

        taskList.forEach((task: any) => {
            task.orderID = id
        })
        
        const tasks = await prisma.task.createMany({
            data: taskList
        })

        res.status(200).json("Tasks created successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
})

// GET ALL ORDERS
app.get('/orders', async (req: Request, res: Response) => {
    try {
        
        const orders = await prisma.order.findMany({
            select: {
                orderID: true
            }
        })
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
})

// UPDATE TASK
app.put('/orders/:orderID/tasks/:taskID', jsonParser, async (req: Request, res: Response) => {

    const taskID = req.params.taskID
    const orderID = req.params.orderID

    try {

        const task = await prisma.task.update({
            where: {
                orderID: orderID,
                taskID: parseInt(taskID)
            },
            data: req.body
        })
        
        res.status(200).json(task)

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error")
    }
})

// GET ALL CUSTOMERS
app.get('/customers', async (req: Request, res: Response) => {

    try {
        const customerIDArray = await prisma.customer.findMany({
            select: {
                customerID: true
            }
        })

        res.status(200).json(customerIDArray)
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error")
    }

})

// GET SALES DATA AND ORDER HISTORY
app.get('/orders/sales', async (req: Request, res: Response) => {

    try {
        const orders = await prisma.order.findMany({
            select: {
                orderID: true,
                serviceFee: true,
                items: true,
                status: true
            }
        })

        let totalRevenue = 0
        let receivableRevenue = 0
        let lostRevenue = 0

        orders.forEach((order) => {

            let items = JSON.parse(JSON.stringify(order.items))
            
            let itemTotal = 0

            items.forEach((item: any) => {
                itemTotal += (item.unitPrice * item.quantity)
            })

            if(order.status == 'COMPLETED'){
                totalRevenue += (order.serviceFee + itemTotal)
            } else if (order.status == 'IN_PROGRESS'){
                receivableRevenue += (order.serviceFee + itemTotal)
            } else if (order.status == 'CANCELLED'){
                lostRevenue += (order.serviceFee + itemTotal)
            }

        })

        const orderIdList = orders.map((order) => {
            return order.orderID
        })

        res.status(200).json({
            orderIdList,
            totalRevenue,
            receivableRevenue,
            lostRevenue
        })

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error")
    }

})

// GET SPECIFIC ORDER
app.get('/orders/:id', async (req: Request, res: Response) => {

    const id = req.params.id

    try {
        const order = await prisma.order.findUnique({
            where: {
                orderID: id
            },
            include: {
                tasks: true
            }
        })
        res.status(200).json(order)
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error")
    }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});