# express-cache-layered-architecture

A production-quality learning project demonstrating a simple Express.js REST API for products using a strict layered architecture and caching mechanism.

## Project Overview

This project implements a strict separation of concerns through the following layers:

```text
Route → Middleware → Controller → Service → Database
```

### Flow Example for GET Request

**Initial Request (Cache MISS)**
```text
Client
  ↓
Route
  ↓
Cache Middleware
  ↓
Cache MISS
  ↓
Controller
  ↓
Service
  ↓
Database
  ↓
Fresh Products
  ↓
Cache Service
  ↓
Response
```

**Subsequent Request (Cache HIT)**
```text
Client
  ↓
Route
  ↓
Cache Middleware
  ↓
Cache HIT
  ↓
Response
```

**Expired Cache Request**
```text
Client
  ↓
Route
  ↓
Cache Middleware
  ↓
Cache exists
  ↓
TTL expired
  ↓
Delete old cache
  ↓
Controller
  ↓
Service
  ↓
Database
  ↓
Fresh data
  ↓
Store new cache
  ↓
Response
```

**Mutation Request (POST / PUT / PATCH / DELETE)**
```text
Client
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Database
  ↓
Success
  ↓
Clear Cache
  ↓
Response
```

## Features

- **Product CRUD**: Create, read, update, patch, and delete products.
- **GET Caching**: Caches responses for GET requests to improve performance.
- **Cache Middleware**: A reusable middleware that automatically handles cache retrieval and response intercepting.
- **TTL (Time to Live)**: Configurable cache expiration (default 60 seconds).
- **Cache Invalidation**: Automatically clears the cache on successful mutation requests (POST, PUT, PATCH, DELETE).
- **HIT/MISS Headers**: Every cacheable GET response contains an `X-Cache: HIT` or `X-Cache: MISS` header.
- **Error Handling**: Centralized error handling middleware.
- **Tests**: Comprehensive automated test suite using Jest and Supertest.

## Installation

```bash
git clone <repo-url>
cd express-cache-layered-architecture
npm install
```

## Run

To run in development mode with nodemon:
```bash
npm run dev
```

## Production

To run in production mode:
```bash
npm start
```

## Test

To run the automated test suite:
```bash
npm test
```

## API Documentation

### GET /products
Get a list of all products.
- **Method**: GET
- **URL**: `/products`
- **Cache**: Yes
- **Success Response Code**: 200
- **Example Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 80000,
      "category": "Electronics"
    }
  ]
}
```

### GET /products/:id
Get a single product by its ID.
- **Method**: GET
- **URL**: `/products/:id`
- **Cache**: Yes
- **Success Response Code**: 200
- **Example Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 80000,
    "category": "Electronics"
  }
}
```

### POST /products
Create a new product.
- **Method**: POST
- **URL**: `/products`
- **Cache**: No (Invalidates existing cache)
- **Request Body**:
```json
{
  "name": "Monitor",
  "price": 15000,
  "category": "Electronics"
}
```
- **Success Response Code**: 201
- **Example Response**:
```json
{
  "success": true,
  "data": {
    "id": 6,
    "name": "Monitor",
    "price": 15000,
    "category": "Electronics"
  }
}
```

### PUT /products/:id
Completely replace an existing product.
- **Method**: PUT
- **URL**: `/products/:id`
- **Cache**: No (Invalidates existing cache)
- **Request Body**:
```json
{
  "name": "MacBook Pro",
  "price": 150000,
  "category": "Laptops"
}
```
- **Success Response Code**: 200
- **Example Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "MacBook Pro",
    "price": 150000,
    "category": "Laptops"
  }
}
```

### PATCH /products/:id
Partially update an existing product.
- **Method**: PATCH
- **URL**: `/products/:id`
- **Cache**: No (Invalidates existing cache)
- **Request Body**:
```json
{
  "price": 140000
}
```
- **Success Response Code**: 200
- **Example Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 140000,
    "category": "Electronics"
  }
}
```

### DELETE /products/:id
Delete a product by ID.
- **Method**: DELETE
- **URL**: `/products/:id`
- **Cache**: No (Invalidates existing cache)
- **Success Response Code**: 200
- **Example Response**:
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### GET /health
Health check endpoint.
- **Method**: GET
- **URL**: `/health`
- **Cache**: No
- **Success Response Code**: 200
- **Example Response**:
```json
{
  "success": true,
  "message": "Server is healthy"
}
```
