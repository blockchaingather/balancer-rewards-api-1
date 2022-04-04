# balancer-rewards-api

Server API built with NodeJS and Express Built to be deployed

## clone the repo

```bash
git clone https://github.com/cryptobadass/balancer-rewards-api.git && cd balancer-rewards-api
```

## local environment

### 1. Install dependencies

```bash
npm install
npm install ts-node-dev -g
```

### 2. Configure .env.development reference .env.example

```bash
MYSQL_HOST = localhost
MYSQL_USER = your mysql user
MYSQL_PASSWORD = your mysql password
MYSQL_DATABASE = your mysql database
PORT = server prot
```

### 3. Start the app

```bash
npm run dev
```

## production environment

### 1.Install dependencies

```bash
npm install
npm install pm2 -g
```

### 2.Configure .env.production reference .env.example and environment variable

> first configure environment variable

```bash
export NODE_ENV=production
```

> second configure .env.production

```bash
MYSQL_HOST = localhost
MYSQL_USER = your mysql user
MYSQL_PASSWORD = your mysql password
MYSQL_DATABASE = your mysql database
PORT = server prot
```

### 3.Start the app

```bash
npm run prod
```
