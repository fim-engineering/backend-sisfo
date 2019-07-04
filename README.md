

# Documentation RESTful API FIM 2019
<!-- <img width="300" src="https://yt3.ggpht.com/a/AGF-l79eetQ4HNIL6hyZdbO82yr3GeshtGC737s8EQ=s900-mo-c-c0xffffffff-rj-k-no"> -->

#### Development
1. `npm install`
2. `npm run docker:up` for running postgres docker
3. `npm run migrate` for migrated db in PG
4. `npm run docker:down` for stop postgress docker (*PLEASE DO THIS AFTER YOUR WORK!*)

#### Login

```
/auth/login | POST
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{	
	email: STRING,
	socialId: STRING,
	loginSource: STRING,
	profilPicture: STRING,
	firstName:STRING,
	lastName:STRING,
}
```

- Return :

```
{  
    "token": token, (jwtcode: 'thetokenstokens')
	"code": 200,
    "status": NUMBER STATUS
}
```

#### Check Session

```
/auth/checksession | POST
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{	
	token: STRING,
}
```

- Return :

```
{  
    message: `Token Not Found`,
    data: {} / null,
    status: false / true
}
```

#### Save KTP

```
/auth/savektp | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	
	noKtp : INT,
	urlKtp : STRING
}
```

- Return :

```
{  
    "status": false/true,
    "message": "Nomor KTP tersebut sudah digunakan oleh email <email>" / "KTP sudah terinput sebelumnya, User berhasil update" / "KTP & Foto KTP berhasil terupload"
}
```

#### Get Profile

```
/auth/get-profile | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	

}
```

- Return :

```
{  
    "status": true/false,
    "message": "Data Fetched",
	"data":{}
}
```

#### Update Profile

```
/auth/save-profile | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	
	"name": "Bagus Bin Paijo",
	"address": "Jl Lurus yang Engkau Ridhoi " ,
	"phone": "0821122222222" ,
	"universityId": "23" 
}
```

- Return :

```
{  
    "status": true/false,
    "message": "Sukses Update",
	"data":{}
}
```

#### Get University Data

```
/data/get-university | GET
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{}
```

- Return :

```
{  
    "status": true,
    "message": "Data Fetched",
	"data":{}
}
```

# CRUD untuk Tunnel (Jalur)

#### Tunnel List

```
/tunnel/list | GET
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{}
```

- Return :

```
{  
    "status": true,
    "message": "Data Fetched",
	"data":{}
}
```

#### Tunnel Create

```
/tunnel/create | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{
	name: "Next Gen"
}
```

- Return :

```
{  
    "status": true,
    "message": "Data Created",
	"data":{}
}
```

#### Tunnel Read

```
/tunnel/read | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	
	idTunnel: "1"
}
```

- Return :

```
{  
    "status": true,
    "message": "Data Fetched",
	"data":{}
}
```


#### Tunnel Update

```
/tunnel/update | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	
	idTunnel: "1"
	name: "Next Gen"
}
```

- Return :

```
{  
    "status": true,
    "message": "Data Updated",
	"data":{}
}
```

#### Tunnel Delete

```
/tunnel/delete | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	
	idTunnel: "1"
}
```

- Return :

```
{  
    "status": true,
    "message": "Data Deleted",
	"data":{}
}
```



# CRUD untuk Question (Pertanyaan)

#### Question List

```
/question/list | GET
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{}
```

- Return :

```
{  
    "status": true,
    "message": "Data Fetched",
	"data":{}
}
```

#### Question Create

```
/question/create | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{
	question: "STRING",
	tunnelId : "INT",
	batchFim : "STRING"
}
```

- Return :

```
{  
    "status": true,
    "message": "Data Created",
	"data":{}
}
```

#### Question Read

```
/question/read | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	
	idQuestion: "1"
}
```

- Return :

```
{  
    "status": true,
    "message": "Data Fetched",
	"data":{}
}
```


#### Question Update

```
/question/update | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	
	idQuestion: idQuestion,
    question:  question,
    tunnelId: tunnelId,
    batchFim: batchFim,
}
```

- Return :

```
{  
    "status": true,
    "message": "Data Updated",
	"data":{}
}
```

#### Question Delete

```
/question/delete | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	
	idQuestion: "1"
}
```

- Return :

```
{  
    "status": true,
    "message": "Data Deleted",
	"data":{}
}
```