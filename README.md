# Stationery Shop Management System
## Booken (v-5)
An **Express.js** application built with **TypeScript** and **MongoDB** (using Mongoose) to manage a Stationery Shop. This application ensures data integrity through robust schema validation and provides CRUD operations for managing products, customers, and orders.

## Features
- 📦 **Product Management**: Add, update, delete, and view products with strict validation for fields such as name, price, stock, and category.
- 🛍️ **Order Management**: Create and track orders with real-time updates.
- 🙋‍♂️ **Customer Management**: Manage customer details with data validation for secure handling.
- ✅ **Mongoose Schema Validation**: Ensures data integrity by validating input fields at the schema level.
- 🚀 **API Endpoints**: Secure, modular, and optimized RESTful APIs for easy interaction with the system.

## All api
### **1. Create a Stationery Product**

- **Endpoint:** **`https://kazi-store.vercel.app/api/products`**
- **Method:** `POST`
- **Request Body:**

### **2. Get All Stationery Products**

- **Endpoint:** **`https://kazi-store.vercel.app/api/products`**
- **Method:** `GET`
- **Response:** A list of all products with details like name, brand, price, category, etc.
- Query: A list of all products from the same category, you’ll take this as `https://kazi-store.vercel.app/api/products?searchTerm=pen`

### **3. Get a Specific Stationery Product**

- **Endpoint:** **`https://kazi-store.vercel.app/api/products/:productId`**
- **Method:** `GET`
- **Response:** The details of a specific product by ID.


### **4. Update a Stationery Product**

- **Endpoint:** **`https://kazi-store.vercel.app/api/products/:productId`**
- **Method:** `PUT`
- **Request Body:** (Product details to update)

### **5. Delete a Stationery Product**

- **Endpoint:** **`https://kazi-store.vercel.app/api/products/:productId`**
- **Method:** `DELETE`
- **Response:** Success message confirming the product has been deleted.

### **6. Order a Stationery Product**

- **Endpoint:** **`https://kazi-store.vercel.app/api/orders`**
- **Method:** `POST`
- **Inventory Management Logic:**
  - When an order is placed, reduce the **quantity** in the product model.
  - If the inventory quantity goes to zero, set **inStock** to `false`.
  - Handle **insufficient stock** cases by returning an appropriate error message.
- **Request Body:**

### **7. Calculate Revenue from Orders (Aggregation)**

- **Endpoint:** **`https://kazi-store.vercel.app/api/orders/revenue`**
- **Method:** `GET`

## Tech Stack
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose
- **Validation**: Mongoose Schema Validation
- **Deployment**:  Vercel, 

## Happy coding



