

# Documentation RESTful API FIM 2019
<!-- <img width="300" src="http://www.blst.co.id/images/logo-company.png"> -->





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


