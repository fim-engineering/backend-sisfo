

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
	noKtp : STRING,
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
		"name" : req.body.name,
        "address": req.body.address,
        "phone": req.body.phone,
        "universityId": req.body.universityId,
        "photoUrl": req.body.urlPhoto,
        "headline" : req.body.headline,
        "photoUrl" : req.body.photoUrl,
        "religion" : req.body.religion,
        "bornPlace" : req.body.bornPlace,
        "bornDate" : req.body.bornDate,
        "cityAddress" : req.body.cityAddress,
        "provinceAddress" : req.body.provinceAddress,
        "emergencyPhone" : req.body.emergencyPhone,
        "gender" : req.body.gender,
        "bloodGroup" : req.body.bloodGroup,
        "hoby" : req.body.hoby,
        "expertise" : req.body.expertise,
        "institution":req.body.institution,
        "otherReligion": req.body.otherReligion
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
	name: "Next Gen",
    description:"TEXT"
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
	idTunnel: req.body.idTunnel,
	name: "Next Gen",
    description:"TEXT"
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

#### Tunnel User Save

```
/auth/save-tunnel | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{	
	TunnelId: "INTEGER	
}
```

- Return :

```
{  
    "status": true,
    "message": "Tunnel Updated",
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
{
	idTunnel: "INTEGER" // ID Jalur Masuk
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

#### Question Create

```
/question/create | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{
	question: "STRING",
	isMany: "INTEGER BOOL" 1 /0,
	header: OBJECT
		{
			'header_name':header_html_type, for <input type="header_html_type">
			'no':'number'
		}
	
	TunnelId : "INT",
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
	isMany: "INTEGER BOOL" 1 /0,
	header: OBJECT
		{
			'header_name':header_html_type, for <input type="header_html_type">
			'no':'number'
		}
    TunnelId: TunnelId,
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

# CRUD untuk Answer (Jawaban)

#### Answer List

```
/answer/lists | GET
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{
	idTunnel: req.body.TunnelId,
    ktpNumber: req.body.ktpNumber
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

#### Answer Save

```
/answer/save | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{
	 Answer: req.body.answers, // Array
            // [
            //     {
            //         QuestionId:1,
            //         answer: JSON with serialize header
            //     }
            // ]

    ktpNumber: req.body.ktpNumber,
    TunnelId: req.body.TunnelId,
    createdBy: userId
}
```

- Return :

```
{  
    "status": "true",
    "message": "Answer Saved",
    "data": "userIdentity"
}
```


# CRUD untuk Summary (Mapping dan Scoring)

#### Participant List Based Tunne;

```
/summary/lists | GET
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
    "status": true,
    "message": "Data Fetched",
	"data":{}
}
```

#### Final Update

```
/summary/update-final-submit | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{
	 ktpNumber: req.body.ktpNumber,
     TunnelId: req.body.tunneId
}
```

- Return :

```
{  
    "status": "true",
    "message": "Data Updated",
    "data": data
}
```

#### recruiter Evaluator Update

```
/summary/update-evaluator | POST
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <Token>)
- Body :

```
{
	    ktpNumber: req.body.ktpNumber,
    	TunnelId: req.body.tunneId,
        recruiterId: req.body.recruiterId
}
```

- Return :

```
{  
    "status": "true",
    "message": "Data Updated",
    "data": data
}
```