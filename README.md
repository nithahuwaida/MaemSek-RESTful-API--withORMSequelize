<h1 align="center">Point Of Sales App RESTful API </h1>

## Introduction

Point of sales RESTful API is an API that allows users to read product, user and genre categories from a database. Point of sales API also allows users to create, update, and delete a product, user and genre categories to / from the database and user and user can order product avalaible.

There're some features included in the RESTful API which allow users to programmatically login and register user, transaction/ order product, retrieve product popular, retrieve sales data and Cross Origin Resource Sharing (CORS).

This documentation outlines the point of sales API functionality.

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html) [![Node.js](https://img.shields.io/badge/Node.js-v.10.16.3-red.svg?style=rounded-square)](https://nodejs.org/) [![body-parser](https://img.shields.io/badge/bodyparser-v1.19-e)](https://www.npmjs.com/package/body-parser) [![MySQL](https://img.shields.io/badge/mysql-v3.2.2-blue)](https://www.npmjs.com/search?q=mysql) [![Sequelize](https://img.shields.io/badge/sequelize-v5.21.2-purple)](https://sequelize.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://expressjs.com/en/starter/installing.html">Express JS </a>
3. <a href="https://sequelize.org/">Sequelize</a>
4. <a href="https://www.getpostman.com/">Postman</a>
5. Web Server (ex. localhost)
6. Text Editor (ex. Sublime Text, Visual Studio Code)

## Getting Started

![node.js](https://www.javatpoint.com/js/nodejs/images/node-js-tutorial.png)

### Node.js
Node.js is software designed to develop web-based applications and is written in the JavaScript programming language.

If all this time we know that JavaScript is a programming language that runs on the client / browser side only, then Node.js exists to complete the role of JavaScript so allow developers used javascript to write command line tools and for **server side scripting**. Nodejs use **V8** Javascript Engine, the same engine for Chrome and Chromium based browser used. The initial release of Nodejs in 2009 supported only Linux and Mac OS X. Later in July 2011, the first Nodejs build supporting Windows was released.

![express](https://expressjs.com/images/express-facebook-share.png)

### Express.js
Express.js, or simply Express, is a web application framework for Node.js.
It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.

![sequelize](https://user-images.githubusercontent.com/29118699/71479425-f3a88f80-2826-11ea-9aa7-f9565a7c273d.png)
### Sequelize ORM
Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.


![restful api](https://s3.amazonaws.com/kinlane-productions/salesforce/salesforce-rest-api.png)
### RESTFul API
A RESTful API is an application program interface (API) that uses HTTP requests to GET, PUT, POST and DELETE data.

A RESTful API -- also referred to as a RESTful web service -- is based on representational state transfer (REST) technology, an architectural style and approach to communications often used in web services development.

Representational State Transfer is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, called RESTful Web services, provide interoperability between computer systems on the Internet.

### HTTP Requests
All API requests are made by sending a secure HTTPS request using one of the following methods, depending on the action being taken:

- `GET` Get a resource or list of resources
- `POST` Create a resource
- `PUT/PATCH` Update a resource
- `DELETE` Delete a resource

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

| Code  | Status               | Description                                                                         |
| :---- | :------------------- | :---------------------------------------------------------------------------------- |
| `200` | `OK`                 | The request was successful                                                          |
| `400` | `Bad Request`        | There was a problem with the request (security, malformed, data validation, etc.)   |
| `401` | `Unauthorized`       | The supplied API credentials are invalid                                            |
| `403` | `Forbidden`          | The credentials provided do not have permission to access the requested resource    |
| `404` | `Not found`          | An attempt was made to access a resource that does not exist in the API             |
| `405` | `Method not allowed` | The resource being accessed doesn't support the method specified (GET, POST, etc.). |
| `500` | `Server Error`       | An error on the server occurred                                                     |

## Installation

1. Clone or download this repository
2. Open app's directory in CMD or Terminal.
3. Type in Terminal `npm install` to install the required packages.
4. Make a new file, **.env** and setup the file. [instruction here](#setup-env-file)
5. Turn on Web Server and MySQL, (Also can be done with third-party tools like XAMPP, etc)
6. Setup the database. [instruction here](#setup-database)
7. Open **Postman** desktop application or Chrome web extension (Install **Postman** if you haven't yet)
8. Choose HTTP Method and enter the request URL.(i.e. localhost:8080/product)
9. Check all **Endpoints** [here](#endpoints)

## Setup .env file
Open **.env** file on code editor and copy the code below :

```
PORT = '8080'
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'password'
DB_DATABASE = 'pos_app'
```

## Setup Database
You can write this code below on your Terminal with mysql cli or import it to **phpmyadmin**.

Create Database named **pos_app** :

```
CREATE DATABASE pos_app;
```

Create Table named **products** :

```
CREATE TABLE `products` (
  `id` int(11) AUTO INCREMENT PRIMARY KEY,
  `name_product` varchar(25),
  `desc_product` text ,
  `image_product` text ,
  `id_category` int(11) ,
  `price_product` int(11) ,
  `quantity_product` int(5) ,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY `id_category` REFERENCE `categories`(`id`)
);
```

Create Table named **categories** :

```
CREATE TABLE `categories` (
  `id` int(11)  AUTO INCREMENT PRIMARY KEY,
  `name_category` varchar(25) ,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_update` timestamp NULL DEFAULT CURRENT_TIMESTAMP
);
```
Create Table named **transaction** :

```
CREATE TABLE `transactions` (
  `id` INT(11) AUTO INCREMENT PRIMARY KEY,
  `id_transaction` varchar(10),
  `total_transaction` int(11) ,
  `id_user` int(11) ,
  `date_add` timestamp NOT NULL,
  FOREIGN KEY `id_user` REFERENCE `users`(`id`)
);
```
Create Table named **products_transactions** :

```
CREATE TABLE `products_transactions` (
  `id` int(11) AUTO INCREMENT PRIMARY KEY,
  `order_qty` int(11) NOT NULL,
  `price_product` int(11) NOT NULL,
  `sub_total` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `id_transaction` varchar(10) ,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY `id_transaction` REFERENCE `transaction`(`id_transaction`)
);
```
#### Login Endpoint
  - **Request** : **`POST /users/login`**
  - **Response** :
  ```
    {
        "status": "success",
        "response": {
            "message": "Login successfully",
            "user": {
                "id": 2,
                "fullname": "Bae Bhun",
                "username": "Baebhunie",
                "email": "baebhunie@gmail.com"
            },
            "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZnVsbG5hbWUiOiJCYWUgQmh1biIsInVzZXJuYW1lIjoiQmFlYmh1bmllIiwiZW1haWwiOiJiYWViaHVuaWVAZ21haWwuY29tIiwiaWF0IjoxNTc3MzczMzY5fQ.rmDYMY_0xTbvghC3dKlRPHRV9r8c0aZyZVoEi_iNyXQ"
        }
    }
  ```
#### Register Endpoint
  - **Request** : **`POST /users/register`**
  - **Response** :
  ```
    {
        "status": "success",
        "response": {
            "message": "Register successfully",
            "user": {
                "id": 2,
                "fullname": "Bae Bhun",
                "username": "Baebhunie",
                "email": "baebhunie@gmail.com"
            }
        }
    }
  ```
#### **CRUD Users Endpoint**
* **Read All Users**
  - **Request** : **`GET /users`**
  - **Response** :
  ```
    {
        "status": "success",
        "response": [
            {
                "id": 1,
                "fullname": "Nitha Huwaida",
                "username": "nithahuwaida",
                "email": "nithahuwaida@gmail.com",
                "password": "$2b$10$rtGfgFyBiQUR4AvgCC4G8eQtARvSYPto9BqT6kPiQzE5MVQPiHrXK",
                "date_add": "2019-12-25T06:19:43.000Z",
                "date_update": "2019-12-25T06:19:43.000Z"
            },
            {
                "id": 2,
                "fullname": "Bae Bhun",
                "username": "Baebhunie",
                "email": "baebhunie@gmail.com",
                "password": "$2b$10$8xmeczSgoyqqkkKoKR/Rau1XF6wE59p4KO0p2QkZ7Oh8AZipf3SDW",
                "date_add": "2019-12-25T06:19:43.000Z",
                "date_update": "2019-12-25T06:19:43.000Z"
            }
        ]
    }
  ```
* **Read a user**
  - **Request** : **`GET /users/:id`**
  - **Response** :
  ```
    {
        "status": "success",
        "response": {
            "id": 1,
            "fullname": "Nitha Huwaida",
            "username": "nithahuwaida",
            "email": "nithahuwaida@gmail.com",
            "password": "$2b$10$rtGfgFyBiQUR4AvgCC4G8eQtARvSYPto9BqT6kPiQzE5MVQPiHrXK",
            "date_add": "2019-12-25T06:19:43.000Z",
            "date_update": "2019-12-25T06:19:43.000Z"
        }
    }
  ```
* **Update a user**
  - **Request** : **`PUT /users/:id`**
  - **Response** :
  ```
    {
        "status": "success",
        "message": "Update successfully",
        "response": {
            "id": 1,
            "fullname": "Nitha Huwaida",
            "username": "nithahuwaida",
            "email": "nithahuwaida@gmail.com",
            "password": "$2b$10$rtGfgFyBiQUR4AvgCC4G8eQtARvSYPto9BqT6kPiQzE5MVQPiHrXK",
            "date_add": "2019-12-25T06:19:43.000Z",
            "date_update": "2019-12-25T06:19:43.000Z"
        }
    }
  ```
* **Delete a user**
  - **Request** : **`DELETE /users/:id`**
  - **Response** :
  ```
    {
        "status": "success",
        "message": "Delete successfully"
        "response": {
            "id": 1,
            "fullname": "Nitha Huwaida",
            "username": "nithahuwaida",
            "email": "nithahuwaida@gmail.com",
            "password": "$2b$10$rtGfgFyBiQUR4AvgCC4G8eQtARvSYPto9BqT6kPiQzE5MVQPiHrXK",
            "date_add": "2019-12-25T06:19:43.000Z",
            "date_update": "2019-12-25T06:19:43.000Z"
        }
    }
  ```
#### **CRUD Products Endpoint**
* **Read All Products**
  - **Request** : **`GET /products`**
  - **Response** :
  ```
    {
    "status": "success",
    "response": [
        {
            "id": 1,
            "name_product": "Nasi Ayam Rica-Rica",
            "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
            "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
            "id_category": 1,
            "price_product": 15000,
            "quantity_product": 4,
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z",
            "category": {
                "id": 1,
                "name_category": "Promo",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            }
        },
        {
            "id": 2,
            "name_product": "Nasi Ayam Bakar Madu",
            "desc_product": "Ayam bakar madu yang manis dan gurih",
            "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
            "id_category": 2,
            "price_product": 12000,
            "quantity_product": 4,
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z",
            "category": {
                "id": 2,
                "name_category": "Recomended",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            }
        } 
        ]
    }
  ```

* **Read a product**
  - **Request** : **`GET /products/:id`**
  - **Response** :
  ```
    {
        "status": "success",
        "response": {
            "id": 1,
            "name_product": "Nasi Ayam Rica-Rica",
            "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
            "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
            "id_category": 1,
            "price_product": 15000,
            "quantity_product": 4,
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z",
            "category": {
                "id": 1,
                "name_category": "Promo",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            }
        }
    }
  ```
* **Create a product**
  - **Request** : **`POST /products`**
  - **Response** :
  ```
    {
        "status": "success",
        "message" : 'Add new Product Successfully',
        "response": {
            "id": 1,
            "name_product": "Nasi Ayam Rica-Rica Pedas",
            "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
            "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
            "id_category": 1,
            "price_product": 15000,
            "quantity_product": 4,
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z",
            "category": {
                "id": 1,
                "name_category": "Promo",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            }
        }
    }
  ```
* **Update a product**
  - **Request** : **`PACTH /products/:id`**
  - **Response** :
  ```
    {
        "status": "success",
        "message" : 'Update Successfully',
        "response": {
            "id": 1,
            "name_product": "Nasi Ayam Rica-Rica",
            "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
            "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
            "id_category": 1,
            "price_product": 15000,
            "quantity_product": 4,
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z",
            "category": {
                "id": 1,
                "name_category": "Promo",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            }
        }
    }
  ```
* **Delete a product** 
  - **Request** : **`DELETE /products/id`**
  - **Response** : 
  ```
      {
        "status": "success",
        "message" : 'Delete Successfully',
        "response": {
            "id": 1,
            "name_product": "Nasi Ayam Rica-Rica Pedas",
            "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
            "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
            "id_category": 1,
            "price_product": 15000,
            "quantity_product": 4,
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z",
            "category": {
                "id": 1,
                "name_category": "Promo",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            }
        }
    }
  ```

#### CRUD Categories Endpoint
* **Read All Categories**
  - **Request** : **`GET /categories`**
  - **Response** :
  ```
    {
        "status": "success",
        "response": [
            {
                "id": 1,
                "name_category": "Promo",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            },
            {
                "id": 2,
                "name_category": "Recomended",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            },
            {
                "id": 3,
                "name_category": "Menu Utama",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            },
            {
                "id": 7,
                "name_category": "Menu Paling Laku",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            },
            {
                "id": 15,
                "name_category": "Roti Lapis Wuenak",
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z"
            }
        ]
    }
  ```
* **Read a category**
  - **Request** : **`GET /categories/:id`**
  - **Response** :
  ```
    {
        "status": "success",
        "response": {
            "id": 1,
            "name_category": "Promo",
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z"
        }
    }
  ```
* **Create a category** 
  - **Request** : **`POST /categories`**
  - **Response** :
  ```
    {
        "status": "success",
        "message": "Add successfully",
        "response": {
            "id": 1,
            "name_category": "Promo",
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z"
        }
    }
  ```
* **Update a category**
  - **Request** : **`PATCH /categories/:id`**
  - **Response** :
  ```
    {
        "status": "success",
        "message": "Update successfully",
        "response": {
            "id": 1,
            "name_category": "Promo",
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z"
        }
    }
  ```
* **Delete a Category** 
  - **Request** : **`DELETE /categories/:id`**
  - **Response** :
  ```
    {
        "status": "success",
        "message": "Delete successfully",
        "response": {
            "id": 1,
            "name_category": "Promo",
            "date_add": "2019-12-25T06:19:42.000Z",
            "date_update": "2019-12-25T06:19:42.000Z"
        }
    }
  ```

#### Transaction Endpoint

* **Read All Transactions**
  - **Request** : **`GET /transactions`**
  - **Response** :
  ```
  {
    "status": "success",
    "response": [
            {
                "id": 1,
                "order_qty": 3,
                "price_product": 15000,
                "sub_total": 45000,
                "product_id": 1,
                "id_transaction": "MS99502418",
                "date_add": "2019-12-25T07:59:08.000Z",
                "transaction": null,
                "product": {
                    "id": 1,
                    "name_product": "Nasi Ayam Rica-Rica",
                    "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
                    "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                    "id_category": 1,
                    "price_product": 15000,
                    "quantity_product": 4,
                    "date_add": "2019-12-25T06:19:42.000Z",
                    "date_update": "2019-12-25T06:19:42.000Z"
                }
            },
            {
                "id": 2,
                "order_qty": 3,
                "price_product": 15000,
                "sub_total": 45000,
                "product_id": 1,
                "id_transaction": "MS99502418",
                "date_add": "2019-12-25T07:59:08.000Z",
                "transaction": null,
                "product": {
                    "id": 1,
                    "name_product": "Nasi Ayam Rica-Rica",
                    "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
                    "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                    "id_category": 1,
                    "price_product": 15000,
                    "quantity_product": 4,
                    "date_add": "2019-12-25T06:19:42.000Z",
                    "date_update": "2019-12-25T06:19:42.000Z"
                }
            },
        ]
    }
  ```
* **Read a transaction**
  - **Request** : **`GET /transactions/id_transaction`**
  - **Response** :
  ```
    {
        "status": "success",
        "response": [
            {
                "id": 1,
                "order_qty": 3,
                "price_product": 15000,
                "sub_total": 45000,
                "product_id": 1,
                "id_transaction": "MS99502418",
                "date_add": "2019-12-25T07:59:08.000Z",
                "transaction": null,
                "product": {
                    "id": 1,
                    "name_product": "Nasi Ayam Rica-Rica",
                    "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
                    "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                    "id_category": 1,
                    "price_product": 15000,
                    "quantity_product": 4,
                    "date_add": "2019-12-25T06:19:42.000Z",
                    "date_update": "2019-12-25T06:19:42.000Z"
                }
            },
            {
                "id": 2,
                "order_qty": 3,
                "price_product": 15000,
                "sub_total": 45000,
                "product_id": 1,
                "id_transaction": "MS99502418",
                "date_add": "2019-12-25T07:59:08.000Z",
                "transaction": null,
                "product": {
                    "id": 1,
                    "name_product": "Nasi Ayam Rica-Rica",
                    "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
                    "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                    "id_category": 1,
                    "price_product": 15000,
                    "quantity_product": 4,
                    "date_add": "2019-12-25T06:19:42.000Z",
                    "date_update": "2019-12-25T06:19:42.000Z"
                }
            }
        ]
    }
  ```
* **Add transaction/Order Product**
  - **Request** : **`POST /transactions`**
  ```
  {
	"total_price":22000,
	"user_id":2,
	"detail_order":
    	[
    		{
    			"order_qty":3,
    			"price_product":15000,
    			"sub_total": 45000,
    			"product_id":2
    		},
    		{
    			"order_qty":3,
    			"price_product":15000,
    			"sub_total": 45000,
    			"product_id":2
    		}
    	]
    }
  ```
  - **Response** :
  ```
  {
    "status": "success",
    "message": "Transaction Successfully",
    "response": {
    "newProdTransData": [
            {
                "id": 39,
                "order_qty": 3,
                "price_product": 15000,
                "sub_total": 45000,
                "product_id": 2,
                "id_transaction": "MS65933936",
                "date_add": "2019-12-26T15:37:39.000Z",
                "transaction": null,
                "product": {
                    "id": 2,
                    "name_product": "Nasi Ayam Bakar Madu",
                    "desc_product": "Ayam bakar madu yang manis dan gurih",
                    "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                    "id_category": 2,
                    "price_product": 12000,
                    "quantity_product": 1,
                    "date_add": "2019-12-25T06:19:42.000Z",
                    "date_update": "2019-12-25T06:19:42.000Z"
                }
            }
        ],
        "updateProduct": [
            {
                "id": 1,
                "name_product": "Nasi Ayam Rica-Rica",
                "desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
                "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                "id_category": 1,
                "price_product": 15000,
                "quantity_product": 4,
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z",
                "category": {
                    "id": 1,
                    "name_category": "Promo",
                    "date_add": "2019-12-25T06:19:42.000Z",
                    "date_update": "2019-12-25T06:19:42.000Z"
                }
            },
            {
                "id": 2,
                "name_product": "Nasi Ayam Bakar Madu",
                "desc_product": "Ayam bakar madu yang manis dan gurih",
                "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                "id_category": 2,
                "price_product": 12000,
                "quantity_product": 1,
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z",
                "category": {
                    "id": 2,
                    "name_category": "Recomended",
                    "date_add": "2019-12-25T06:19:42.000Z",
                    "date_update": "2019-12-25T06:19:42.000Z"
                }
            },
            {
                "id": 3,
                "name_product": "Nasi Ayam ",
                "desc_product": "Ayam bakar madu yang manis dan gurih",
                "image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                "id_category": 2,
                "price_product": 10000,
                "quantity_product": 0,
                "date_add": "2019-12-25T06:19:42.000Z",
                "date_update": "2019-12-25T06:19:42.000Z",
                "category": {
                    "id": 2,
                    "name_category": "Recomended",
                    "date_add": "2019-12-25T06:19:42.000Z",
                    "date_update": "2019-12-25T06:19:42.000Z"
                }
            }
            ]
        }
    }
  ```
#### Information Endpoint
* **Read Information**
  - **Request** : **`GET /informations`**
  - **Response** : 
  ```
  {
    "status": "success",
    "response": {
        "dataProductCount": 3,
        "dataCategoryCount": 5,
        "dataTransactionCount": 46,
        "dataUserCount": 2,
        "sumTransaction": [
            {
                "bulan": 9,
                "total_transaction": "956000"
            },
            {
                "bulan": 10,
                "total_transaction": "1012000"
            },
            {
                "bulan": 11,
                "total_transaction": "740000"
            },
            {
                "bulan": 12,
                "total_transaction": "1098000"
            }
        ],
        "sumProduct": [
            {
                "product_id": 2,
                "jumlah_terjual": "41",
                "product.id": 2,
                "product.name_product": "Nasi Ayam Bakar Madu",
                "product.desc_product": "Ayam bakar madu yang manis dan gurih",
                "product.image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                "product.id_category": 2,
                "product.price_product": 12000,
                "product.quantity_product": 1,
                "product.date_add": "2019-12-25T06:19:42.000Z",
                "product.date_update": "2019-12-25T06:19:42.000Z"
            },
            {
                "product_id": 1,
                "jumlah_terjual": "30",
                "product.id": 1,
                "product.name_product": "Nasi Ayam Rica-Rica",
                "product.desc_product": "Nasi ayam rica-rica dengan Level Kepedasan tingkat dewa",
                "product.image_product": "https://cdn2.tstatic.net/aceh/foto/bank/images/ilustrasi-ayam-goreng.jpg",
                "product.id_category": 1,
                "product.price_product": 15000,
                "product.quantity_product": 4,
                "product.date_add": "2019-12-25T06:19:42.000Z",
                "product.date_update": "2019-12-25T06:19:42.000Z"
            }
        ],
        "getTransactionAll": [
            {
                "id": 41,
                "id_transaction": "MS79303987",
                "total_transaction": 520000,
                "id_user": 1,
                "date_add": "2019-11-20T00:48:44.000Z",
                "user": {
                    "id": 1,
                    "fullname": "Nitha Huwaida",
                    "username": "nithahuwaida",
                    "email": "nithahuwaida@gmail.com",
                    "password": "$2b$10$rtGfgFyBiQUR4AvgCC4G8eQtARvSYPto9BqT6kPiQzE5MVQPiHrXK",
                    "date_add": "2019-12-25T06:19:43.000Z",
                    "date_update": "2019-12-25T06:19:43.000Z"
                }
            }
        ]
        }
    }
  ```