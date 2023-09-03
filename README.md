### Book Catalog Assignment

##Live Site Link: https://assignment-8-book-catalog.vercel.app/api/v1/

##Code Documentation Link 

Book Catalog

Auth

POST
Sign Up
http://localhost:5000/api/v1/auth/signup

Body
raw (json)
json
{
  "name": "Jhon Doe",
  "email": "john2@example.com",
  "password": "john123",
  "role": "admin",
  "contactNo": "1234567890",
  "address": "Dhaka, Bangladesh",
  "profileImg": "user.jpg"
}
POST
Sign In
http://localhost:5000/api/v1/auth/signin

Body
raw (json)
json
{
    "email":"jamal@example.com",
    "password":"jamal123"
}
Users

GET
Get All Users
http://localhost:5000/api/v1/users/

GET
Get Single User
http://localhost:5000/api/v1/users/fb5e3a62-f9eb-4a85-a42f-05d43f5bd0d9

DELETE
Delete A User
http://localhost:5000/api/v1/users/f8a3f2ad-0344-4379-9444-74e551234e53

PATCH
Update User
http://localhost:5000/api/v1/users/f8a3f2ad-0344-4379-9444-74e551234e53

Body
raw (json)
json
{
    "name":"Jane doe",
    "email":"jane@example.com"
}
Categories

POST
Add Category
http://localhost:5000/api/v1/categories/create-category

Body
raw (json)
json
{
    "title":"Politics"
}
GET
Get All Categories
http://localhost:5000/api/v1/categories/

GET
Get Single Category
http://localhost:5000/api/v1/categories/e3edc2d2-98ea-47a1-9e8d-ab77da0e17d7

PATCH
Update a category
http://localhost:5000/api/v1/categories/4777d947-3366-4f74-a20c-dbc10c4d74a3

Body
raw (json)
json
{
    "title":"Architechture"
}
DELETE
Delete Category
http://localhost:5000/api/v1/categories/ec361c47-c5bb-4b8b-9860-b31f23198c1e

Books

POST
Add Book
http://localhost:5000/api/v1/books/create-book

Body
raw (json)
json
{
  "title": "Basic Programming",
  "author": "Mezbahul Abedin",
  "genre": "Politics",
  "price": 200.75,
  "publicationDate": "2021-07-16",
  "categoryId": "ffb87049-a5a8-4f48-82f6-ee4e035d62c2"
}
GET
Get All Books
http://localhost:5000/api/v1/books/

GET
Get a single Book
http://localhost:5000/api/v1/books/909ed397-c961-4dbc-b17e-945e0add451f

PATCH
Update Book
http://localhost:5000/api/v1/books/fc003ffa-9471-42ed-bece-85aa80a4e9ca

Body
raw (json)
json
{
    "title":"Life of Sheikh Hasina"
}
DELETE
Delete Book
http://localhost:5000/api/v1/books/fb74bfff-5df5-439c-bd8f-4f309b93cffb

GET
Get Books By Categories
http://localhost:5000/api/v1/books/e3edc2d2-98ea-47a1-9e8d-ab77da0e17d7/category

Orders

POST
Orders
http://localhost:5000/api/v1/orders/create-order

GET
Get All Orders
http://localhost:5000/api/v1/orders/79d95be5-dfaa-457a-ade4-16c86a6e2e63

GET
Get Order By ID
http://localhost:5000/api/v1/orders/79d95be5-dfaa-457a-ade4-16c86a6e2e63

Profile

GET
Get Profile
http://localhost:5000/api/v1/profile/