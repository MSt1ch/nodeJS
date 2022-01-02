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
        GET:  api/groups - find All groups
        GET:  api/groups/:id - find user by Id
        POST: api/users/adduserstogroup - add users to group by Id
        POST: api/groups - create group
        PUT:  api/groups/:id - update group


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
        GET:  api/users - find All users
        GET:  api/users/:id - find user by Id
        GET:  api/users/getautosuggestusers?limit=5&loginsubstring=a - get auto suggest users
        POST: api/users - create user
        PUT:  api/users/:id - update user

### Homework 2

Task 1, 2, 4.

    !For running use command!:
    
    `yarn && yarn start`

    Default port: 3000;

    routes:
        GET:  api/users - find All users
        GET:  api/users/:id - find user by Id
        GET:  api/users/getautosuggestusers?limit=5&loginsubstring=a - get auto suggest users
        POST: api/users - create user
        PUT:  api/users/:id - update user


### Homework 6

    routes:
        POST: api/login - authorization

    working body:
        {
            "login": "superAdmin",
            "password": "sadmin5432"
        }


### Homework 7

    !For running use command!:
    `yarn`  - install dependencies,
    `yarn init:data` - add mock data to  the tables,
    `yarn test` - testing app.
