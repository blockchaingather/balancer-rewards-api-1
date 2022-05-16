- [LBPs Interface](#lbps-interface)
	- [LBPs Group List](#lbps-group-list)
		- [Request](#request)
		- [Response](#response)
	- [LBPs Create Group](#lbps-create-group)
		- [Request](#request-1)
		- [Response](#response-1)
	- [LBPs Update Group](#lbps-update-group)
		- [Request](#request-2)
		- [Response](#response-2)
	- [LBPs Pools](#lbps-pools)
		- [Request](#request-3)
		- [Resposne](#resposne)
	- [LBP Pool Create](#lbp-pool-create)
		- [Request](#request-4)
		- [Response](#response-3)
	- [LBPs Pool Detail](#lbps-pool-detail)
		- [Request](#request-5)
		- [Response](#response-4)
	- [Get Token](#get-token)
		- [Request](#request-6)
		- [Response](#response-5)

## LBPs Interface

### LBPs Group List

> endpoint：/lbps

> method：GET

> data type：json

#### Request

```
curl -X GET https://api.yotei.finance/lbps?current_page=1&page_size=20 \
-H 'token: xxxx'
```

#### Response

```
{
	"success":true,
	"count":0,
	"result":
	[{
		 "id": 1,
		 "title":"xxxxx",
		 "description": "xxxx",
		 "image_url":"xxxx",
		 "link":"xxxx",
		 "seq":1
	}]
}
```

> notice: No parameters are transmitted. The first 20 pieces of data are returned by default

### LBPs Create Group

> endpoint：/lbp/group/create

> method：POST

> header：application/json

> data type：json

#### Request

```
curl -X POST https://api.yotei.finance/lbp/group/create \
  -H 'Content-Type: application/json' \
  -H 'token: xxxx' \
  -d '{
		 "title":"xxxxx",
		 "description": "xxxx",
		 "image_url":"xxxx",
		 "link":"xxxx",
		 "seq":1
	}'
```

#### Response

```
{
	"success":true,
	"result": {
		 "id": 1,
		 "title":"xxxxx",
		 "description": "xxxx",
		 "image_url":"xxxx",
		 "link":"xxxx",
		 "seq":1
	}
}
```

### LBPs Update Group

> endpoint：/lbp/group/update/< group_id >

> method：POST

> header：application/json

> data type：json

#### Request

```
curl -X POST https://api.yotei.finance/lbp/group/update/<group_id> \
  -H 'Content-Type: application/json' \
  -H 'token: xxxx' \
  -d '{
		 "title":"xxxxx",
		 "description": "xxxx",
		 "image_url":"xxxx",
		 "link":"xxxx",
		 "seq":1,
		 "deleted":1
	}'
```

#### Response

```
{
	"success":true,
	"result": {
		 "id": 1,
		 "title":"xxxxx",
		 "description": "xxxx",
		 "image_url":"xxxx",
		 "link":"xxxx",
		 "seq":1
	}
}
```

### LBPs Pools

> endpoint：/pools?group_id=< group_id >&current_page=1&page_size=20

> method：GET

> data type：json

#### Request

```
curl -X GET https://api.yotei.finance/pools?group_id=<group_id> &current_page=1&page_size=20 \
-H 'token: xxxx'
```

#### Resposne

```
{
	"success":true,
	"count":0,
	"result":
	[{
		'pool_id':"xxx",
		'pool_address':"xxx",
		"lbp_name":"xxx",
		"price": 0,
		"start_time": 0,
		"end_time": 0,
		"network": 1,
		"image_url": "xxx",
		"id":1
	}]
}
```

> notice: No parameters are transmitted. The first 20 pieces of data are returned by default

### LBP Pool Create

> endpoint：/pool/create

> method：POST 

> header：application/json

> data type：json

#### Request

```
curl -X POST https://api.yotei.finance/pool/create \
  -H 'Content-Type: application/json' \
  -H 'token: xxxx' \
  -d '{
		"group_id":1,
		"network_id":1,
		"lbp_name":"",
		"lbp_symbol":"",
		"main_token":"xxxx",
		"base_token":"xxxx",
		"image_url":"xxxx",
		"description":"xxxx",
		"price":0,
		"learn_more_url":"xxx"
		"swap_fee":0,
		"start_time":0,
		"end_time":0,
		"owner_address":"xxx",
		"pool_id":"xxx",
		"pool_address":"xxx",
		"blocked_countries":["us","cn"],
		"lbp_creation_tx": "xxxx"
	}'
```

#### Response

```
{
	"success":true,
	"result":{
		"id":1,
		"group_id":1,
		"network_id":1,
		"lbp_name":"",
		"lbp_symbol":"",
		"main_token":"xxxx",
		"base_token":"xxxx",
		"image_url":"xxxx",
		"description":"xxxx",
		"price":0,
		"learn_more_url":"xxx",
		"swap_fee":0,
		"start_time":0,
		"end_time":0,
		"owner_address":"xxx",
		"pool_id":"xxx",
		"pool_address":"xxx",
		"blocked_countries":["us","cn"],
		"lbp_creation_tx": "xxxx"
	}
}
```

### LBPs Pool Detail

> endpoint：/pool/< pool_id >

> method：GET

> data type：json

#### Request

```
curl -X GET https://api.yotei.finance/pool/< pool_id > \
-H 'token: xxxx'
```

#### Response

```
{
	"success":true,
	"result": {
		"id":1,
		"group_id":1,
		"lbp_name":"",
		"lbp_symbol":"",
		"main_token":"xxxx",
		"base_token":"xxxx",
		"image_url":"xxxx",
		"description":"xxxx",
		"price":0,
		"lbp_creation_tx": "0x38f93ab92e2482c15b0d453fc453526dcd910691a44e8e58105abc9394c5e0a1",
		"owner_address": "0x648715fbf07d63bb9f49e763fd18a8c249e56420",
		"pool_id": "xxxxx",
		"pool_address": "0xd20f6F1D8a675cDCa155Cb07b5dC9042c467153f",
		"swap_fee":0,
		"start_time":0,
		"end_time":0,
		"blocked_countries": [
			"us",
			"cn"
		],
		"network_id": 1,
		"learn_more_url": "https://www.theapis.xyz/",
	}
}
```

### Get Token

> endpoint：/getToken

> method：GET

> data type：json

#### Request

```
curl -X GET https://api.yotei.finance/getToken
```

#### Response

```
{
	token: "xxxxx"
}
```

> notice： The frontend determines whether the token is valid ( http statusCode = 401）
