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
MYSQL_DB_NAME=db_name # ganti sesuai nama database yang mau dipake 
MYSQL_USERNAME=root # ganti sesuai username mysql
MYSQL_PASSWORD="your_password" # terserah mau pake password apa
MYSQL_DIALECT=mysql
MYSQL_POOL_MAX=5
MYSQL_POOL_MIN=0
MYSQL_POOL_ACQUIRE=30000
MYSQL_POOL_IDLE=10000
PORT=5001
ENVIROMENT=development
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

### Sensor Node (data sensornode)
| Method | Endpoint | Description | Example |
| --- | --- | --- | --- |
| GET | /api/nodes | Get all sensor data | [https://localhost:8000/api/nodes](https://localhost:5001/nodes) |
| GET | /api/nodes?date_l&data_r= | Get all sensor data in specific range of date | (masih belum ada)
| GET | /api/nodes/:nodeid | Get sensor data by id | [https://localhost:8000/api/nodes/5f9b7b4b1c9d440000b7b4a0](https://localhost:8000/api/nodes/5f9b7b4b1c9d440000b7b4a0) |
| POST | /api/nodes | Create new sensor data | [https://localhost:8000/api/nodes](https://localhost:8000/api/nodes) |
| PUT | /api/nodes/:nodeid | Update sensor data by id | [https://localhost:8000/api/nodes/5f9b7b4b1c9d440000b7b4a0](https://localhost:8000/api/nodes/5f9b7b4b1c9d440000b7b4a0) |
| DELETE | /api/nodes/:nodeid | Delete sensor data by id | [https://localhost:8000/api/nodes/5f9b7b4b1c9d440000b7b4a0](https://localhost:8000/api/nodes/5f9b7b4b1c9d440000b7b4a0) |

### Sensor Node --> Gateway
| Method | Endpoint | Description | Example |
| --- | --- | --- | --- |
| GET | /api/gateways | Get all sensor node | [https://localhost:8000/api/sensornode](https://localhost:8000/api/gateways) |
| GET | /api/gateways/:gatewayname(forex : "imogiri") | Get sensor node by id | [https://localhost:8000/api/gateways/5f9b7b4b1c9d440000b7b4a0](https://localhost:8000/api/node/5f9b7b4b1c9d440000b7b4a0) |
| POST | /api/gateways | Create new sensor node | [https://localhost:8000/api/gateways](https://localhost:8000/api/gateways) |
| PUT | /api/gateways/:gatewayname | Update sensor node by id | [https://localhost:8000/api/sensornode/5f9b7b4b1c9d440000b7b4a0](https://localhost:8000/api/node/5f9b7b4b1c9d440000b7b4a0) |
| DELETE | /api/gateways/:gatewayname | Delete sensor node by id | [https://localhost:8000/api/sensornode/5f9b7b4b1c9d440000b7b4a0](https://localhost:8000/api/sensornode/5f9b7b4b1c9d440000b7b4a0) |
