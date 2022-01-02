# nodeJS
NodeJS course

!!!**Recommendation fo testing NodeJS 16.9.1 and higher**!!!

### Homework 4

Task 1, 2, 3.

    !For running use command!:
    `yarn`  - install dependencies,
    `yarn init:data` - add mock data to  the tables,
    `yarn remove:data` - remove mock data to the tables,
    `yarn start` - starting app.

    Default port: 3000;

    routes:
        GET:  /groups - find All groups
        GET:  /groups/:id - find user by Id
        POST:  /users/adduserstogroup - add users to group by Id
        POST: /groups - create user
        PUT:  /groups/:id - update user


*** Example for adduserstogroup ***

    {
        "groupId": "dc2bb593-7fc5-44a4-8ecf-5b5e00396e02",
        "userIds": ["fb824285-cb52-45e3-80da-05319720a5b2", "c67e527a-eeb7-43ad-bf8d-247bfa9c323d"]


### Homework 3

Task 1, 2.

    !For running use command!:
    `yarn`  - install dependencies,
    `yarn init:data` - add mock data to users table,
    `yarn remove:data` - remove mock data to users table,
    `yarn start` - starting app.

    Default port: 3000;

    routes:
        GET:  /users - find All users
        GET:  /users/:id - find user by Id
        GET:  /users/getautosuggestusers?limit=5&loginsubstring=a - get auto suggest users
        POST: /users - create user
        PUT:  /users/:id - update user

### Homework 2

Task 1, 2, 4.

    !For running use command!:
    
    `yarn && yarn start`

    Default port: 3000;

    routes:
        GET:  /users - find All users
        GET:  /users/:id - find user by Id
        GET:  /users/getautosuggestusers?limit=5&loginsubstring=a - get auto suggest users
        POST: /users - create user
        PUT:  /users/:id - update user


### Homework 6

    routes:
        POST: /login - authorization

    working body:
        {
            "login": "superAdmin",
            "password": "sadmin5432"
        }
