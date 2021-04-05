# Connect and network business - Backend

## Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [PostgresSQL](https://www.postgresql.org/)

## Getting started
- Clone the repository
```
git clone https://github.com/salmantec/Fake-Financial-Institution.git
```
- Install dependencies
```
cd fake_financial_institution
yarn
```
- Create Your DB in postgres 
``
create database fake_financial_institution
``
- Export the Database URL like, 
```
export DATABASE_URL='postgres://[db-user]:[password]@localhost:5432/fake_financial_institution'
```

- Build and run the project
```
yarn start
```
Navigate to `http://localhost:3000`

- To view the API documentation
Navigate to `http://localhost:3000/api-docs`
