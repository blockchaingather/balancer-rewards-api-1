# Balancer Rewards API

Server API built with NodeJS and Express.

###### tags: `Balancer`

## 1. Clone the code

```bash=
git clone this-project-code
```

## 2. Config .env

Copy .env.example file and rename it to .env. Then fill values in .env file.

```config=
MYSQL_HOST=localhost
MYSQL_USER=your mysql user
MYSQL_PASSWORD=your mysql password
MYSQL_DATABASE=your mysql database
PORT=server prot
```

## 3. Production environment

### 3.1. Install dependencies

```bash=
npm install

npm install pm2 -g
```

### 3.2. Configure environment variable

```bash=
export NODE_ENV=production
```

### 3.3. Run the project

```bash=
npm run prod
```

## 4. Local environment

### 4.1. Install dependencies

```bash=
npm install

npm install ts-node-dev -g
```

### 4.2. Run the project

```bash=
npm run dev
```