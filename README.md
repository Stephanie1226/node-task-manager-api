# node-task-manager-api
* This is a back-end project using nodejs/express and mongoDB hosting on heroku with the following link: https://chieh-task-manager.herokuapp.com
* Two documents saved in mongoDB: User, Task
* User document is for creating new users, storage existing users an delete existing users. User information includes "name", "age", "email" and "password".
* Task document is for saving tasks for every users. Task information includes "name", and "completed".

## Query string varaibles
### User
1. Create a new user
```
[POST request]: {{url}}/users
```
body(JSON):
1. name field is required
2. age field is not required, cannot not be less than 0. default age is set to 0.
3. email field is required
4. password field is required, cannot not set this field as "password". Minimun length is set to 7.
```
{
    "name": "YourName",
    "age": 20,
    "email": "yourname@gexample.com",
    "password": "yoursecretpsword"
}
```
***
2. Login your account
```
[POST request]: {{url}}/users/login
```
body(JSON):
```
{
    "email": "yourname@gexample.com",
    "password": "yoursecretpsword"
}
```
***
3. Logout your account (no JSON body needed)
```
[POST request]: {{url}}/users/logout
```
***
4. Logout your account from all of the devices (no JSON body needed)
```
[POST request]: {{url}}/users/logoutAll
```
***
5. Fetch your own profile (Can only be fetched after you login, no JSON body needed)
```
[GET request]: {{url}}/users/me
```
***
6. Update your account data (Can only be updated after you login)
```
[PATCH request]: {{url}}/users/me
```
body(JSON):
```
{
    "name": "YourName",
    "age": 20,
    "email": "yourname@gexample.com",
    "password": "yoursecretpsword"
}
```
***
7. Delete your account (Can only be deleted after you login, no JSON body needed)
```
[DELETE request]: {{url}}/users/me
```
***
8. Upload a profile image for your account
```
[POST request]: {{url}}/users/me/avatar
```
body:
```
KEY: avatar, VALUE: pic from you computer
```
***
9. Delete the profile image of your account
```
[DELETE request]: {{url}}/users/me/avatar
```
***
