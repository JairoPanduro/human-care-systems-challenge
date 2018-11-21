#human-care-systems-challenge

This is README file for setup and run challenge task from Human Care Systems

Start with: `docker-compose up` in the docker folder

This project is using monorepo concept for the challenge

`src/front` - is Frontend build on React

`src/back` - is Backend build on Node+Express

### Credentials

login: Jairo<br>
password: f4gd91dPn

### Important Note!

I haven't added volumes folder to the git because its more than 300MB
So please run this following query to insert some test data:

```bash
db.users.insert({
    name: "Jairo",
    email: "jairo.l.panduro@gmail.com",
    password: "2b9cbd43d1b382be101960dfb8859385734e74aab0969f36863caaa9ae87f0d2",
    birthday: '10-01-1992',
    tasks: [
        {id:ObjectId(), name: "Task 1", description: "Some text", dueDate: "11-25-2018"},
        {id:ObjectId(), name: "Task 2", description: "Super urgent", dueDate: "11-22-2018"},
    ]
})
```

###Usefull commands:
`docker-compose exec db /bin/bash` - enter mongo container

`docker-compose exec hcs-frontend /bin/bash` - enter frontend container

`docker-compose exec hcs-backend /bin/bash` - enter frontend container


###Improvements or What can be done more:
 
####Backend: 
- Add linter
- Add more validation on backend, middlewares
- Add real authentication layer (passport)
- Add caching(Redis, Memcache) layer

####Frontend:
- Add eslint
- Add sass
- Integrate React Router
- Enable SSR 
- Use Redux for state management