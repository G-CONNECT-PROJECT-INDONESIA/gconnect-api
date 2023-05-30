## GConnect API
This is API for G-connect Project by Computer System and Network Laboratory Department of Computer Science and Electronic FMIPA UGM

## How to run
1. Clone this repository

```
$ git clone https://github.com/G-CONNECT-PROJECT-INDONESIA/gconnect-api.git
```
2. Create .env file

```
$ touch .env
```

3. Copy and paste this code to .env file

```
MYSQL_DB_NAME=gconnect_db
MYSQL_USERNAME=root
MYSQL_PASSWORD="yourpassword"
MYSQL_DIALECT=mysql
MYSQL_POOL_MAX=5
MYSQL_POOL_MIN=0
MYSQL_POOL_ACQUIRE=30000
MYSQL_POOL_IDLE=10000
PORT=5001
ENVIROMENT=production
PRODUCT_NAME="Gconnect API"
API_VERSION=v1
```

4. Install dependencies

```
$ npm install
```

5. Run the server

```
$ npm start
```

## How to run on Docker
1. Clone this repository
```
$ git clone https://github.com/G-CONNECT-PROJECT-INDONESIA/gconnect-api.git
```

2. Create .env file
```
$ touch .env
```

3. Copy and paste this code to .env file
```
MYSQL_DB_NAME=gconnect_db
MYSQL_USERNAME=root
MYSQL_PASSWORD="yourpassword"
MYSQL_DIALECT=mysql
MYSQL_POOL_MAX=5
MYSQL_POOL_MIN=0
MYSQL_POOL_ACQUIRE=30000
MYSQL_POOL_IDLE=10000
PORT=5001
ENVIROMENT=production
PRODUCT_NAME="Gconnect API"
API_VERSION=v1
```

4. Build the image
```
$ docker build -t gconnect-api .
```

5. Run the container
```
$ docker run -p 5001:5001 gconnect-api
```

## API Documentation

### Sensor Data
| Method | Endpoint | Description | Example |
| --- | --- | --- | --- |
| GET | /v0/sensordata | Get all sensor data | [https://gconnect-api.herokuapp.com/v0/sensordata](https://gconnect-api.herokuapp.com/v0/sensordata) |
| GET | v0/sensordata?date_l&data_r= | Get all sensor data in specific range of date | 
| GET | /v0/sensordata/:id | Get sensor data by id | [https://gconnect-api.herokuapp.com/v0/sensordata/5f9b7b4b1c9d440000b7b4a0](https://gconnect-api.herokuapp.com/v0/sensordata/5f9b7b4b1c9d440000b7b4a0) |
| POST | /v0/sensordata | Create new sensor data | [https://gconnect-api.herokuapp.com/v0/sensordata](https://gconnect-api.herokuapp.com/v0/sensordata) |
| PUT | /v0/sensordata/:id | Update sensor data by id | [https://gconnect-api.herokuapp.com/v0/sensordata/5f9b7b4b1c9d440000b7b4a0](https://gconnect-api.herokuapp.com/v0/sensordata/5f9b7b4b1c9d440000b7b4a0) |
| DELETE | /v0/sensordata/:id | Delete sensor data by id | [https://gconnect-api.herokuapp.com/v0/sensordata/5f9b7b4b1c9d440000b7b4a0](https://gconnect-api.herokuapp.com/v0/sensordata/5f9b7b4b1c9d440000b7b4a0) |

### Sensor Node
| Method | Endpoint | Description | Example |
| --- | --- | --- | --- |
| GET | /v0/sensornode | Get all sensor node | [https://gconnect-api.herokuapp.com/v0/sensornode](https://gconnect-api.herokuapp.com/v0/sensornode) |
| GET | /v0/sensornode/:id | Get sensor node by id | [https://gconnect-api.herokuapp.com/v0/sensornode/5f9b7b4b1c9d440000b7b4a0](https://gconnect-api.herokuapp.com/v0/node/5f9b7b4b1c9d440000b7b4a0) |
| POST | /v0/sensornode | Create new sensor node | [https://gconnect-api.herokuapp.com/v0/sensornode](https://gconnect-api.herokuapp.com/v0/node) |
| PUT | /v0/sensornode/:id | Update sensor node by id | [https://gconnect-api.herokuapp.com/v0/sensornode/5f9b7b4b1c9d440000b7b4a0](https://gconnect-api.herokuapp.com/v0/node/5f9b7b4b1c9d440000b7b4a0) |
| DELETE | /v0/sensornode/:id | Delete sensor node by id | [https://gconnect-api.herokuapp.com/v0/sensornode/5f9b7b4b1c9d440000b7b4a0](https://gconnect-api.herokuapp.com/v0/sensornode/5f9b7b4b1c9d440000b7b4a0) |