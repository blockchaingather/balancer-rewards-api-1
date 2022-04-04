# balancer-rewards-api
Server API built with NodeJS and Express

## clone the repo
```
git clone this-project-code && cd balancer-rewards-api
```
## 1. Local environment
### 1.1. Install dependencies:
```
npm install
npm install ts-node-dev -g
```

### 1.2. Configure .env.development reference .env.example
```
MYSQL_HOST = localhost
MYSQL_USER = your mysql user
MYSQL_PASSWORD = your mysql password
MYSQL_DATABASE = your mysql database
PORT = server prot
```

### 1.3. Start the app:
```
npm run dev
```

## 2. Production environment
### 2.1. Install dependencies:
```
npm install
npm install typescript -g
npm install supervisor -g
```
### 2.2. Configure .env.production reference .env.example and environment variable
> Firstly, configure environment variable
```
export NODE_ENV=production
```
> Secondly, configure .env.production
```
MYSQL_HOST = localhost
MYSQL_USER = your mysql user
MYSQL_PASSWORD = your mysql password
MYSQL_DATABASE = your mysql database
PORT = server prot
```

### 2.3. Start the app:
```
npm run build
npm run prod
```
