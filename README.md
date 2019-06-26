

# Documentation RESTful API FIM 2019
<!-- <img width="300" src="https://yt3.ggpht.com/a/AGF-l79eetQ4HNIL6hyZdbO82yr3GeshtGC737s8EQ=s900-mo-c-c0xffffffff-rj-k-no"> -->





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

#### Update Profile

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


