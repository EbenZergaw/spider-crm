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
As HydroTech's operations scale, they've been struggled to manage and keep track of their customers, contracts, and tenders. In addition to incoming deals, HydroTech also has to keep up with previous customer relationships for maintenance, processing orders, and installations.
They're seeking a solution for these problem so that they can remain organized and provide satisfactory service for their customers.

## Use Cases
The product will be used by HydroTech's management, customer service, and sales team for managing client relations, work flows, and tasks. 

1. Customer Interaction and Data Entry
    - Process new orders and service requests.
    - Enter new customer information or retrieves existing customer profiles during interactions.
    - Update customer profiles with recent interactions, inquiries, or feedback.
2. Task Management:
    - Assigns tasks to the relevant department.
    - View and complete current tasks.
    - Updates the order status and communicate timelines to customers.
3. Reporting and Analytics:
    - Analyze customer interactions, sales data, and project statuses.
    - View reports to gain insights into business performance and areas for improvement.

## Abstractions
With the persona, problem, and use cases scoped out, my next steps are to translate them into features, components, and a mapped out user journey. By reducing the abstractions of the use cases, I can have a specific and tangible reference for development.

I'll assign an identifier for each use case and expand upon the users actions, the system behavior, and the components related to it.

### Use Case 1: Customer Interaction and Data Entry
**a) Process new orders and service requests**
- When a customer calls for a new order, the user would create a new order in the system
- Each order would include:
 - Customer data
 - Items ordered
 - Quantity ordered
 - Unit price
 - Total price
 - Delivery 

