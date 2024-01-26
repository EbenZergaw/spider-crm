-- CreateEnum
CREATE TYPE "CustomerStage" AS ENUM ('PROSPECTING', 'QUALIFIED', 'PRESENTING', 'PROCESSING', 'CLOSED_WON', 'CLOSED_LOST');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('PRODUCT_PURCHASE', 'INSTALLATION', 'MAINTENANCE', 'CONSULTATION', 'CUSTOM_SERVICE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Customer" (
    "customerID" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "stage" "CustomerStage" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "location" TEXT NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerID")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderID" TEXT NOT NULL,
    "customerID" TEXT NOT NULL,
    "orderType" "OrderType" NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "items" JSONB NOT NULL,
    "serviceFee" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "delivery" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderID")
);

-- CreateTable
CREATE TABLE "Task" (
    "taskID" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "assignee" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "details" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskID")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("customerID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("orderID") ON DELETE RESTRICT ON UPDATE CASCADE;
