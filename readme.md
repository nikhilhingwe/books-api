# 📚 Book Review

A simple Rest API for managing books and user reviews, built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 Project Setup

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local server or MongoDB Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git https://github.com/nikhilhingwe/books-api.git
   cd books-api
   ```

2. **Install dependencies**

   ```bash
    npm install
   ```

3. **Create environment variables**

   Create a **.env** file and add the following

   ```bash
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/book-review
    JWT_SECRET=secretkey

   ```

4. **Start the development server**

   ```bash
    npm run dev
   ```

# 📚 Book Review API Documentation

## Overview

This API allows users to register, log in, and manage books and reviews. Users can add books, search books, and submit reviews on books, with authentication to ensure actions are secure.

## Base URL

http://localhost:4000/api/v1

## Authentication

### Register User

- **URL:** `/auth/register`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "name": "Nikhil",
    "email": "nikhil@gmail.com",
    "password": "password123"
  }
  ```

### Login User

- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "email": "nikgil@gmail.com",
    "password": "password123"
  }
  ```

## Books

### Add Book

- **URL:** `/books/add`
- **Method:** `POST`
- **Authorization:** `Bearer <token>`
- **Body:**

  ```json
  {
    "title": "Book Title",
    "author": "Book author",
    "genre": "Book Genre"
  }
  ```

### Get Books

- **URL:** `/books/get`
- **Method:** `GET`
- **Authorization:** `Bearer <token>`
- **Query Params:** `?page=1&limit=10&author=tolkien&genre=fantasy`

### Search Books

- **URL:** `/books/search`
- **Method:** `GET`
- **Authorization:** `Bearer <token>`
- **Query Params:** `?query=title`

### Add Review

- **URL:** `/books/add-review/:id`
- **Method:** `POST`
- **Authorization:** `Bearer <token>`
- **Body:**

  ```json
  {
    "rating": 5,
    "comment": "Very good book"
  }
  ```

### Update Review

- **URL:** `/books/update-review/:id`
- **Method:** `PUT`
- **Authorization:** `Bearer <token>`
- **Body:**

  ```json
  {
    "rating": 3,
    "comment": "good book update"
  }
  ```

### Delete Review

- **URL:** `/books/delete-review/:id`
- **Method:** `Delete`
- **Authorization:** `Bearer <token>`

# 🗂️ MongoDB Schema Design

## Schema

```json
**User Schema**
{
  username: String,
  email: String,           // must be unique
  password: String,        // required, hashed using bcrypt
}

**Book Schema**
{
title: String,
author: String,
genre: String,
reviews: [ Review ],     // reviews array
}


**Review Schema**
{
user: ObjectId,          // references the user who submitted the review
rating: Number,          // range 1–5
comment: String,
}
```
