

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
	expireIn: INT,
	expireAt: INT,
}
```

- Return :

```
{  
    "token": token, (jwtcode: 'thetokenstokens')
	"code": 200,
    "expiresIn": expireAt,
    "status": NUMBER STATUS
}
```


