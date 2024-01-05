# Spider CRM
[TOC]
My goal with this project is to experiment with different technologies, paradigms, and software development approaches.
I especially want to practice object oriented design in the context of a fullstack web app. Additionally, I also want to practice my UI/UX design and project management skills. I'll be more deliberate and organized with this project as a way for me to explore and practice product management from design to development.

For this project, I will:
- Craft user personas and use cases to inform product decisions
- Plan out a roadmap of features, components, and tasks
- Design low-fidelity wireframes as an initial proof of concept
- Begin development from an API-first approach before moving onto the frontend
- Rapidly develop an initial prototype
- Iterate and make changes to the roadmap
- Develop a style guide to inform the look and feel of the frontend
- Design high-fidelity designs for the final product
- Build a functional full-stack product
- Test and review the application

The reason I chose to build a CRM is for various reasons. Firstly, it is because I have an interest in enterprise software. I want to become proficient in creating technological value for businesses and I figured this is a good side project for that goal.
Secondly, CRMs are good businesses. The recurring revenue that comes from high-value clients leads to a massive life-time value per customer. Though the competition in the CRM space is comically difficult, if I ever choose to enter it, I'd have gained product/development insights from this project.

My intention for this project is to learn and practice my skills across the board. CRMs can be very robust and complicated pieces of software. There is a million directions I could go in with this project. For the sake of simplicity, I will be developing the absolute minimum core features of a B2B CRM. I will not bother with integrations or customizations as this project is not going into production, it is simply an exploration of different ways to build software and the process of doing so.

I think software should be developed in the context of the problem it solves, so I'll begin this project by creating a case that provides the context to inform my development.

## Persona
HydroTech Imports Co. is an established company that imports and distributes water pumps, casings, and generators. The company has carved a niche in bridging international manufacturing with the local market's needs, focusing on the industrial, agricultural, and residential sectors.

The company's operations revolve around sourcing materials and products to meet the demands of the agriculture, manufacturing, and real estate industries. Additionally, HydroTech competes in tenders to win contracts for large scale projects in both the private and the public sector.

The company employees roughly 100 people whose job functions range from engineering to sales and marketing. 
As HydroTech's operations scale, they've been struggled to manage and keep track of their customers, contracts, and tenders. In addition to incoming deals, HydroTech also has to keep up with previous customer relationships for maintenance, processing orders, and installations.
They're seeking a solution for these problem so that they can remain organized and provide satisfactory service for their customers.

## Use Cases
The product will be used by HydroTech's management, customer service, and sales team for managing client relations, work flows, and tasks. 

1. Customer Interaction and Data Entry
    - Process new orders and service requests.
    - Enter new customer information or retrieves existing customer profiles during interactions.
    - Update customer profiles with recent interactions, inquiries, or feedback.
2. Project Management:
    - Create and assign tasks for current orders to relevant departments.
    - View and complete current tasks.
    - View and complete orders.
3. Reporting and Analytics:
    - View customer information and history.
    - View sales data.
    - View order history.

## Abstractions
With the persona, problem, and use cases scoped out, my next steps are to translate them into features, components, and a mapped out user journey. By reducing the abstractions of the use cases to a granular level, I can have a specific and tangible reference for developing the data layer, frontend, and interactions of all the components of the CRM.

I'll assign an identifier for each use case and expand upon the users actions, the system behavior, and the components related to it.
The users in these cases are the sales, customer service, and management team of HydroTech, with the customers being their clients.

### Use Case 1: Customer Interaction and Data Entry
**1.a) Creating New Orders and Service Requests**
When a customer calls for a new order, whether its for purchasing new products or for a service request, the user would create a new order in the system. 
Each ORDER would include:
 - Customer data - Selecting a preexisting customer, or creating a new one
 - Order Type - If its a service request or a product purchase
 - Items ordered
 - Quantity ordered
 - Unit price
 - Total price
 - Date Created
 - Status - The current status of the order
 - Tasks - The tasks associated with that order
 - Details - A section to type notes regarding the order
 - Delivery Date

**1.b) Entering New Customer Information**
When a new customer interacts with the company, the user will enter the customers data into the system.
Each CUSTOMER would include:
- Company Name
- Contact Name
- Phone Number
- Email
- Stage - The stage the customer is at within the sales cycle (prospect, qualified lead, closed, etc)
- Orders
- Date 
- Location
- Details - A section to type notes regarding the customer

**1.c) Viewing and Retrieving Customer Data**
When the user is creating a new order for a customer, searching for a customer, or viewing customer data, the system will return their information.

**1.d) Updating Customer Information**
If a change occurs or the customer moves along the sales stages, the user will update that information accordingly in the system.


### Use Case 2: Project Management
**2.a) Creating and Assigning Tasks**
After a new order has been created in the system, the user can create tasks for that order and assign it to specific individuals or departments.
Each TASK will include:
- Task Name
- Order
- Status (Not Started, In Progress, Completed)
- Assignee
- Priority (Low, Medium, High)
- Deadline
- Details - A section to type notes regarding that task

**2.b) Viewing Tasks and Orders**
Users can view all tasks and orders in the system and sort or filter them however they need to. 
TASKS can be sorted or filtered by:
- Status
- Order
- Assignee
- Priority
- Deadline
ORDERS can be sorted or filtered by:
- Company
- Date
- Type
- Delivery Date
- Total Price
- Status

**2.c) Completing Tasks**
Users can change the status of a TASK as they work on it.
- Not Started
- In Progress
- Complete
The changes in status of a TASK also contribute to the status of an ORDER. If all tasks are complete for a given ORDER, then that ORDERs status also changes.

Additonally, users can also change the status of an ORDER directly.
- Not Started
- In Progress
- Complete


### Use Case 3: Reporting and Analytics
**3.a) Viewing All Customer Information**
Users will be able to view all their customers in one table.
They will also be able to filter and sort their customers by:
- Stage
- Date
- Orders
- Revenue Generated

**3.b) Viewing Individual Customer Information**
Users will also be able to view individual customers alongside all their orders.

**3.c) Viewing Sales Data and Order History**
Users can view their total revenue, receivable revenue, and the orders associated with them.

## The Data Layer
Now that the use cases are granularized, I have a much clearer idea of the data the system will be handling. I can now plan the schemas and API endpoints that will be the backbone of the CRM.

### Customer Schema
- customerID - String
- companyName - String
- contactName - String
- phoneNumber - String
- email - String
- stage - Enum {
    PROSPECTING,
    QUALIFIED,
    PRESENTING,
    PROCESSING,
    CLOSED_WON,
    CLOSED_LOST
}
- orders - Array of Orders
- date - Date 
- location - String
- details - String

### Order Schema
- orderID - String
- customerID - Customer customerID
- orderType - Enum {
    SERVICE,
    PRODUCTS
}
- status - Enum {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}
- tasks - Array of Tasks
- Details - String
- Delivery Date - String

### ProductsOrder Schema
- **Extends Order**
- items - Json {
    {
        itemName: String,
        quantity: Int,
        unitPrice: Int
    },
    ...
}
- totalPrice - Int
- Date - Date

### ServiceOrder Schema
- **Extends Order**
- TODO

### Task Schema
- taskID - String
- orderID - Order orderID
- status Enum {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED
}
- assignee - String
- priority - Enum {
    LOW,
    MEDIUM,
    HIGH
}
- deadline - Date
- details - String
