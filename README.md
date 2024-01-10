# Spider CRM
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
As HydroTech's operations scale, they've been struggled to manage and keep track of their customer data. In addition to incoming deals, HydroTech also has to keep up with previous customer relationships for processing orders and managing projects.
They're seeking a solution for these problem so that they can remain organized and provide satisfactory service for their customers.

This solution will be a CRM with project management capabilities that will used by HydroTech's management, customer service, and sales team for managing client relations, work flows, and tasks. 

The three main use cases are as follows:

1. Customer Interaction and Data Entry
    - Process new orders and service requests.
    - Enter new customer information.
    - View existing customer information.
    - Update customer profiles with recent interactions, inquiries, or feedback.
2. Project Management:
    - Create and assign tasks for current orders to relevant departments.
    - View and complete current tasks.
    - View and complete orders.
3. Reporting and Analytics:
    - View customer information and history.
    - View sales data.
    - View order history.

## Use Cases
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
- Tags
- Details - A section to type notes regarding the customer

**1.c)Viewing Singular Customer Information**
Users will be able view individual customer information that will display their data including orders.

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

**2.b) Viewing All Tasks and Orders**

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

**2.c) View Singular Order**

Users can also view an individual order and all the tasks associated with it.

**2.d) Completing or Editing Tasks**

Users can edit a task or change the status of it. Task statuses would be:
- Not Started
- In Progress
- Complete

The changes in status of a TASK also contribute to the status of an order. If all tasks are complete for a given order, then that orders status also changes.

Additonally, users can also change the status of an order directly.
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
- Tags
- Revenue Generated

**3.b) Viewing Sales Data and Order History**

Users can view their total revenue, receivable revenue, and the orders associated with them.

## Database Schemas
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
- orders - Array of Orders orderID
- date - Date 
- tags - Array of Strings
- location - String
- details - String

### Order Schema
- orderID - String
- customerID - Customer customerID
- orderType - Enum {
    PRODUCT_PURCHASE
    INSTALLATION,
    MAINTENANCE,
    CONSULTATION,
    CUSTOM_SERVICE
}
- status - Enum {
    NOT_STARTED,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}
- items - Json {
    {
        itemName: String,
        quantity: Int,
        unitPrice: Int
    },
    ...
}
- serviceFee - Int
- tasks - Array of Tasks
- Details - String
- Delivery Date - String

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

## API Endpoints
Since the schemas are now defined, the next step in fleshing out the data layer is to plan out the logic of the use cases and design the API. Each use case has a direct impact on the data and will have an API endpoint to match it. The table below will help me to organize each use case into an endpoint.

| Use Case ID | Description                                | Resources   | Method | Endpoint         |
|-------------|--------------------------------------------|-------------|--------|------------------|
| 1.a         | Creating New Orders and Service Requests   | ORDER, TASK | POST   | /orders          |
| 1.b         | Entering New Customer Information          | CUSTOMER    | POST   | /customers       |
| 1.c         | Viewing Singular Customer Information      | CUSTOMER    | GET    | /customers/:id   |
| 1.d         | Updating Customer Information              | CUSTOMER    | PUT    | /customers/:id   |
| 2.a         | Creating and Assigning Tasks               | ORDER, TASK | POST   | /orders/:id/tasks|
| 2.b         | Viewing All Tasks and Orders               | ORDER, TASK | GET    | /orders          |
| 2.c         | View Individual Orders                     | ORDER, TASK | GET    | /orders/:id      |
| 2.d         | Completing Tasks                           | TASK, ORDER | PUT    | /tasks/:id|
| 3.a         | Viewing All Customer Information           | CUSTOMER    | GET    | /customers       |
| 3.b         | Viewing Sales Data and Order History       | ORDER       | GET    | /orders/sales    |


I'll outline the inputs, logic, and outputs of each endpoint. Additionally, I'll also brainstorm UI components that will correspond with the endpoints. After this, I'll be ready to begin development.

### 1.a Create a New Order
**Endpoint: /orders**

**Method: POST**

**Input:**
- Order data
- Task data in an array

**Logic:**
- The endpoint will process the order data and create a new Order in the database.
- It will then return the order ID, loop through the task data array, and create a Task in the database for each item of the array.
- If the operation succeeds, the endpoint returns the order ID which then prompts the client to redirect to the /orders/:id endpoint, which corresponds with the order ID.
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**UI Components**
- Order data form 
- Tasks form

### 1.b Create a New Customer
**Endpoint: /customers**

**Method: POST**

**Input:**
- Customer data

**Logic:**
- The endpoint will process the customer data and create a new Customer in the database.
- If the operation succeeds, the endpoint returns the customer ID which then prompts the client to redirect to the /customer/:id endpoint, which corresponds with the customer ID.
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**Output:**
- Customer ID

**UI Components**
- Customer data form 

### 1.c View Singular Customer Information
**Endpoint: /customers/:id**

**Method: GET**

**Input:**
- Customer ID

**Logic:**
- The endpoint will find the customer in the database by the customer ID
- If the operation succeeds, the endpoint will return the customer data to be rendered on the client
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**Output:**
- Customer Data

**UI Components**
- Customer page
- Customer information card


### 1.d Updating Customer Information
**Endpoint: /customers/:id**

**Method: PUT**

**Input:**
- Updated Customer data

**Logic:**
- The endpoint will find the customer in the database by the customer ID, then replace it with the updated customer data.
- If the operation succeeds, the client will redirect to the /customer/:id endpoint, which corresponds with the customer ID.
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**Output:**
- None

**UI Components**
- Customer page
- Customer data form


### 2.a Creating and Assigning Tasks
**Endpoint: /orders/:id/tasks**

**Method: POST**

**Input:**
- Task form data
- Order ID

**Logic:**
- The endpoint will process the task form data and create a new Task in the database with the corresponding order ID
- If the operation succeeds, the client will rerender the page
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**Output:**
- None

**UI Components**
- Order page
- Task entry form



### 2.b Viewing All Tasks and Orders
**Endpoint: /orders**

**Method: GET**

**Input:**
- None

**Logic:**
- The endpoint will fetch all Order IDs in the database
- If the operation succeeds, the endpoint will return the Order IDs for the client to render
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**Output:**
- Array of Order IDs

**UI Components**
- Orders dashboard page
- Order card component
- Task card

### 2.c View Individual Orders
**Endpoint: /orders/:id**

**Method: GET**

**Input:**
- Order ID

**Logic:**
- The endpoint will fetch the order by its ID in the database
- If the operation succeeds, it will return the order data and the client will render it on the page
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**Output:**
- Order Data

**UI Components**
- Order page
- Order information card
- Task card

### 2.d Completing or Editing Tasks
**Endpoint: /tasks/:id**

**Method: PUT**

**Input:**
- Task ID
- Updated task data

**Logic:**
- The endpoint will fetch the task by its ID in the database and replace it with the updated data
- If the operation succeeds, it will prompt the client to rerender the page
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**Output:**
- None

**UI Components**
- Order page
- Order information card
- Task card
- Task entry form


### 3.a Viewing All Customer Information
**Endpoint: /customers**

**Method: GET**

**Input:**
- None

**Logic:**
- The endpoint will fetch all customer IDs from the database
- If the operation succeeds, it will return the customer IDs in an array for the client to render
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**Output:**
- Array of Customer IDs

**UI Components**
- Customers dashboard
- Customer information card


### 3.b Viewing Sales Data and Order History
**Endpoint: /orders/sales**

**Method: GET**

**Input:**
- None

**Logic:**
- The endpoint will select the IDs, items, status, and service fees of all orders from the database
- It will loop through and calculate total revenue and receivable revenue
- If the operation succeeds, it will return the IDs, total revenue, and receivable revenue for the client to render
- If the operation fails, the endpoint returns the appropriate status code which displays an error message on the client.

**Output:**
- Order IDs
- Total Revenue
- Receivable Revenue

**UI Components**
- Sales dashboard
- Order information card

## Pre-Development Checkpoint
Now that I have my API and database schemas defined, I'm ready to begin development. However, there are certain considerations I've had throughout the course of planning the data layer up to this point. 

Firstly, the way the endpoints are organized is by the use case and not the resource they're accessing. This added a slight load on my "mental RAM" in keeping track of the endpoints. The chronological order of the endpoints and use case IDs is confusing for that reason, and also because I didn't invest enough time in organizing the use cases from the users point of view.

A step I skipped is planning the flow of the users actions as they use the application. Logically, the first step would be to create a customer in the CRM and that should be use case 1.a, instead of creating an order which depends on having a customer in the database. 

I'll complete the user flow diagram next and reorganize the endpoints accordingly. This will also further help me in organizing the frontend too. 

Another consideration I've had is the behavior of the endpoints when the client would be fetching customers and the orders associated with them (use case). One option would be to have the client and their orders bundled together in the response, but this would create a strain on the server and user experience, especially if there is a large quantity of orders. 

The other option, and the one I'll be implementing, is to return just the customer data alongside the IDs of their orders, and have the client loop through and fetch each order. On the frontend, this will mean having an Order Information Card component that displays a skeleton as it fetches the data. 

This would separate the concerns of the customer data and the order data to different components. However, this would mean there would be more requests for the server to handle. Instead of one request with all the data, there will be a request for each order. The server will have to process multiple requests with a smaller payload instead of a single massive request. The trade off here is quantity instead of size.

The reason I'll be doing it this way is because I don't the user waiting a long time for the request. At least with the skeletons, the user will see each subsequent request being completed instead of waiting on a loading screen. For a customer with a handful of orders it won't make much of a difference, but if the customer has made hundreds of orders, then its necessary to have a separate request for each order. None of these problems are going to exist since the scope of this project doesn't cover deployment, but I think its good to keep scalability in mind when developing this.
