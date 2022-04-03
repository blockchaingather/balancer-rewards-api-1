# balancer-rewards-api
Server API built with NodeJS and Express Built to be deployed

## clone the repo
```
git clone https://github.com/cryptobadass/balancer-rewards-api.git && cd balancer-rewards-api
```
## local environment
### 1. Install dependencies:
```
npm install
npm install ts-node-dev -g
```

### 2. Configure .env.development reference .env.example
```
MYSQL_HOST = localhost
MYSQL_USER = your mysql user
MYSQL_PASSWORD = your mysql password
MYSQL_DATABASE = your mysql database
PORT = server prot
```

### 3. Start the app:
```
npm run dev
```

## production environment
### 1. Install dependencies:
```
npm install
npm install typescript -g
npm install supervisor -g
```
### 2. Configure .env.production reference .env.example and environment variable
> first configure environment variable
```
export NODE_ENV=production
```
> second configure .env.production
```
MYSQL_HOST = localhost
MYSQL_USER = your mysql user
MYSQL_PASSWORD = your mysql password
MYSQL_DATABASE = your mysql database
PORT = server prot
```

### 3. Start the app:
```
npm run build
npm run prod
```