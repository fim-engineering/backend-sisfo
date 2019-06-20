

# Documentation RESTful API BLST
<img width="300" src="http://www.blst.co.id/images/logo-company.png">



##### Index-List-for-Select-Form | GET

```
/product/category-general | List Kategori untuk holding perusahaan
```

- Header : Content-Type (application/json), Accept (application/json), Authorization (Bearer <token>)

### AUTHORIZATION

------



#### Sign Up

```
/auth/signup | POST
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
	"name":"full name"
	"email":"e-mail",
	"password":"password"
}
```

- Return :

```
{  
    "message": 'User Created',  
    "userId": datauser
}
```

#### Login

```
/auth/login | POST
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{	
	"email":"e-mail",
	"password":"password"
}
```

- Return :

```
{  
    "token": token,
    "userId": id user,
    "data": data loaded user,
}
```


### PRODUCT

------


#### Index (Read)

```
http://localhost:8080/product/index/?page=1&limit=10&sortby=name&name=&orderby=DESC | GET
```
- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	Tes 123 dicoba
}
```
-Return :

```
{  
    
}
```

#### UpdateProductpricestok (Update)
```
/product/updateproduct | PUT
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
    base_price : INTEGER,
	stok : INTEGER,
	id: INTEGER
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'product Updated',
     "data" : {
        	 
	 }
}
```

#### Detail (Read)

```
/product/api/detail/:id | GET
```
- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{

}
```
-Return :

```
{  
    
}
```

#### BestSeller (Read)

```
/product/bestseller | GET
```
- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{

}
```
-Return :

```
{  
    
}
```

#### ListProduct (Read)

```
/product/productlist | GET
```
- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{

}
```
-Return :

```
{  
    
}
```

#### SearchProduct
```
/product/search/?name=&author=&minprice=&maxprice=&category=&sortby=&page= | GET
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
	name:string,
	category:INTEGER,
	price:INTEGER

}
```

- Return :

```
{  
     "status" : 'search success',
     "data" : {
		 name,
		 category,
		 base_price,
		 description	 
	 }
}
```

#### SearchIdProduct
```
/product/searchid | POST
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{


}
```

- Return :

```
{  
	 
	 
}
```

### CATEGORY

------


#### Category (Read)

```
/category/ | GET
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	
}
```

- Return :

```
{      
     "data" : {
		 id,
		 name		 
	 }
}
```

#### Category (Crate)

```
/category/add | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	name:string
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Author Added',
     "data" : {
		 name,
		 order,
		 companyId,
		 storeId	 
	 }
}
```

### AUTHOR

------


#### Author (Read)

```
/author/ | GET
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	
}
```

- Return :

```
{  
     
     "data" : {
		 id,
		 name,
		 occupation		 
	 }
}
```

#### Author (Create)

```
/author/add | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
		name: string,
		front_degree: string,
        back_degree: string,
        place_of_birth: string,
        date_of_birth: date,
        no_ktp: integer,
        address: string,
        occupation: string,
        email: string,
        email2: string,
        phone: string,
        phone2: string,
        fax: string,
        photo: string,
        institution: string,
        bank_name: string,
        bank_branch: string,
        no_rek: string,
        an_no_rek: string,
        npwp: string,
        aw_name: string,
        aw_date_of_birth: date,
        aw_place_of_birth: string,
        aw_address: string,
        aw_phone: string,
        aw_ktp: integer,
        aw_email: string,
        aw_bank: string,
        aw_bank_branch: string,
        aw_no_rek: string,
        aw_an_no_rek: string,
        aw_npwp: string,
        companyId:integer
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Author Added',
     "data" : {
		 	name,
			front_degree,
        	back_degree,
        	place_of_birth,
        	date_of_birth,
        	no_ktp,
        	address,
        	occupation,
        	email,
	        email2,
	        phone,
	        phone2,
	        fax,
	        photo,
	        institution,
	        bank_name,
	        bank_branch,
	        no_rek,
	        an_no_rek,
	        npwp,
	        aw_name,
	        aw_date_of_birth,
	        aw_place_of_birth,
	        aw_address,
	        aw_phone,
	        aw_ktp,
	        aw_email,
	        aw_bank,
	        aw_bank_branch,
	        aw_no_rek,
	        aw_an_no_rek,
	        aw_npwp,
	        companyId 
	 }
}
```
#### Author (Update)

```
/author/update | PUT
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
		name: string,
		front_degree: string,
        back_degree: string,
        place_of_birth: string,
        date_of_birth: date,
        no_ktp: integer,
        address: string,
        occupation: string,
        email: string,
        email2: string,
        phone: string,
        phone2: string,
        fax: string,
        photo: string,
        institution: string,
        bank_name: string,
        bank_branch: string,
        no_rek: string,
        an_no_rek: string,
        npwp: string,
        aw_name: string,
        aw_date_of_birth: date,
        aw_place_of_birth: string,
        aw_address: string,
        aw_phone: string,
        aw_ktp: integer,
        aw_email: string,
        aw_bank: string,
        aw_bank_branch: string,
        aw_no_rek: string,
        aw_an_no_rek: string,
        aw_npwp: string,
        companyId:integer
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Author Updated',
     "data" : {
		 	name,
			front_degree,
        	back_degree,
        	place_of_birth,
        	date_of_birth,
        	no_ktp,
        	address,
        	occupation,
        	email,
	        email2,
	        phone,
	        phone2,
	        fax,
	        photo,
	        institution,
	        bank_name,
	        bank_branch,
	        no_rek,
	        an_no_rek,
	        npwp,
	        aw_name,
	        aw_date_of_birth,
	        aw_place_of_birth,
	        aw_address,
	        aw_phone,
	        aw_ktp,
	        aw_email,
	        aw_bank,
	        aw_bank_branch,
	        aw_no_rek,
	        aw_an_no_rek,
	        aw_npwp,
	        companyId	 
	 }
}
```
#### Author (Delete)

```
/author/delete | delete
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	id:
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Author Deleted',
     "data" : {
		 	 
	 }
}
```


### Material

------


#### Material (Read)

```
/material/ | GET
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	
}
```

- Return :

```
{  
     
     "data" : {
		 id,
		 name		 		 
	 }
}
```

#### Author (Create)

```
/material/add | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	name: string,	
	companyId: integer,
	storeId:integer
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Material Added',
     "data" : {
		 	name,
			occupation			
	 }
}
```

### Customer

------

#### Customer (Crate)

```
/customer/add | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	firstname:string
	lastname:string
	email:string
	password:string
	dateofbirth:date
	phone:string
	flag:string
	profilpicture:text
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Customer Added',
     "data" : {
		 firstname,
		 lastname,
		 email,
		 password,
		 dateofbirth,
		 phone,
		 flag,
		 profilpicture	 
	 }
}
```

#### Customer (Update)

```
/customer/update | PUT
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	firstname:string
	lastname:string
	email:string
	password:string
	dateofbirth:date
	phone:string
	flag:string
	profilpicture:text
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Customer Updated',
     "data" : {
		 firstname,
		 lastname,
		 email,
		 password,
		 dateofbirth,
		 phone,
		 flag,
		 profilpicture	 	 
	 }
}
```
#### Customer (Delete)

```
/customer/delete | delete
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	id:
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Customer Deleted',
     "data" : {
		 name,
		 email,
		 password,
		 phone	 
	 }
}
```

### Slidebar

------

#### Slidebar (Crate)

```
/slidebar/add | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	slidebar:string
	name:string
	companyId:integer
	hyperlink:string
	order:integer
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Slidebar Added',
     "data" : {
		 slidebar,
		 name,
		 companyId,
		 hyperlink,
		 order	 
	 }
}
```

#### Slidebar (Update)

```
/slidebar/update | PUT
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	slidebar:string
	name:string
	companyId:integer
	hyperlink:string
	order:integer
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'slidebar Updated',
     "data" : {
		 slidebar,
		 name,
		 companyId,
		 hyperlink,
		 order	 
	 }
}
```
#### Slidebar (Delete)

```
/slidebar/delete | delete
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	id:
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Slidebar Deleted',
     "data" : {
		 	 
	 }
}
```
#### Login

```
/customer/login | POST
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{	
	"email":"e-mail",
	"password":"password"
}
```

- Return :

```
{  
    "token": token,
    "data":loadedCustomer,
}
```

### Cart

------

#### Cart (Create)

```
/cart/add | POST
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
	customerId:INTEGER,
	qty:INTEGER,

}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'cart Added',
     "data" : {
		 customerId,
		 qty,
		 price	 
	 }
}
```

#### Cart (Update)
```
/cart/update | PUT
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
	customerId:INTEGER,
	qty:INTEGER

}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Customer Updated',
     "data" : {
		 customerId,
		 qty,
		 price	 
	 }
}
```
#### Cart (Delete)

```
/cart/delete | delete
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
	id:
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Cart Deleted',
     "data" : {
		 	 
	 }
}
```

### Order

------

#### Order (Create)

```
/order/add | POST
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
	CustomerId:INTEGER,
	addressId:INTEGER,
	bankId:INTEGER,
   	weight:INTEGER,
   	price: INTEGER,
   	subtotal:INTEGER,
   	diskon:INTEGER,
   	kode_unik: INTEGER,
   	address:STRING,
   	province_id:STRING,
   	city_id:STRING,
   	subdistrict_id:STRING,
   	courier:STRING,
   	etd:STRING,
   	value:INTEGER,
   	status:INTEGER,
   	no_resi:STRING

}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'order Added',
     "data" : {
		 customerId,
		 addressId,
		 bankId,
		 weight,
		 price,
		 subtotal,
		 diskon,
		 kode_unik,
		 address,
		 province_id,
		 city_id,
		 subdistrict_id,
		 courier,
		 etd,
		 value,
		 status,
		 no_resi	 
	 }
}
```

#### UpdatePayment (Update)
```
/order/updatepayment | PUT
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
    transactionId : STRING,
    confirmBy : STRING
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Order Updated',
     "data" : {
        CustomerId,
        invoiceNumber,
        transactionId,
        addressId,
        bankId,
        weight,
        price,
        subtotal,
        diskon,
        kode_unik,
        address,
        province_id,
        city_id,
        subdistrict_id,
        courier,
        etd,
        value,
        status,
        expireDate,
        no_resi,
        confirmBy,
        dateconfirm,
        prosesBy,
        dateproses,
        sendBy,
        datesend,
        receivedBy,
        datereceived,	 
	 }
}
```
#### UpdateOrderProcess (Update)
```
/order/updateorderprocess | PUT
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
    transactionId : STRING,
    prosesBy : STRING
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Order Updated',
     "data" : {
        CustomerId,
        invoiceNumber,
        transactionId,
        addressId,
        bankId,
        weight,
        price,
        subtotal,
        diskon,
        kode_unik,
        address,
        province_id,
        city_id,
        subdistrict_id,
        courier,
        etd,
        value,
        status,
        expireDate,
        no_resi,
        confirmBy,
        dateconfirm,
        prosesBy,
        dateproses,
        sendBy,
        datesend,
        receivedBy,
        datereceived,	 
	 }
}
```
#### UpdateSending (Update)
```
/order/updatesending | PUT
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
    transactionId : STRING,
    sendBy : STRING,
    no_resi : STRING
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Order Updated',
     "data" : {
        CustomerId,
        invoiceNumber,
        transactionId,
        addressId,
        bankId,
        weight,
        price,
        subtotal,
        diskon,
        kode_unik,
        address,
        province_id,
        city_id,
        subdistrict_id,
        courier,
        etd,
        value,
        status,
        expireDate,
        no_resi,
        confirmBy,
        dateconfirm,
        prosesBy,
        dateproses,
        sendBy,
        datesend,
        receivedBy,
        datereceived,	 
	 }
}
```
#### UpdateReceived (Update)
```
/order/updatereceived | PUT
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
    transactionId : STRING,
    receivedBy : STRING
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Order Updated',
     "data" : {
        CustomerId,
        invoiceNumber,
        transactionId,
        addressId,
        bankId,
        weight,
        price,
        subtotal,
        diskon,
        kode_unik,
        address,
        province_id,
        city_id,
        subdistrict_id,
        courier,
        etd,
        value,
        status,
        expireDate,
        no_resi,
        confirmBy,
        dateconfirm,
        prosesBy,
        dateproses,
        sendBy,
        datesend,
        receivedBy,
        datereceived,	 
	 }
}
```
#### Order (Delete)

```
/order/delete | delete
```

- Header : Content-Type (application/json), Accept (application/json)
- Body :

```
{
	id:
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'order Deleted',
     "data" : {
		 	 
	 }
}
```
### AddressCustomer

------

#### AddressCustomer (Create)

```
/address/add | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	customerId:integer,
	province_id:string,
	city_id:string,
	subdistrict_id:string,
	address1:text,
	address2:text,
	postal_code:string
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Address Added',
     "data" : {
		 customerId,
		 province_id,
		 city_id,
		 subdistrict_id,
		 address1,
		 address2,
		 postal_code	 
	 }
}
```

#### AddressCustomer (Update)

```
/address/update | PUT
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	customerId:integer,
	province_id:string,
	city_id:string,
	subdistrict_id:string,
	address1:text,
	address2:text,
	postal_code:string
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'address Updated',
     "data" : {
		 customerId,
		 province_id,
		 city_id,
		 subdistrict_id,
		 address1,
		 address2,
		 postal_code	 
	 }
}
```
#### AddressCustomer (Delete)

```
/address/delete | delete
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	id:
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'address Deleted',
     "data" : {
		 	 
	 }
}
```

### BANK

------

#### Bank (Create)

```
/bank/add | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	companyId:integer,
	bankname:string,
	an:string,
	norek:string,
	logo:string
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Bank Added',
     "data" : {
		 companyId,
		 bankname,
		 an,
		 norek,
		 logo	 
	 }
}
```

#### Bank (Update)

```
/bank/update | PUT
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	companyId:integer,
	bankname:string,
	an:string,
	norek:string,
	logo:string
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'bank Updated',
     "data" : {
     	companyId,
		 bankname,
		 an,
		 norek,
		 logo	 
		 	 
	 }
}
```
#### Bank (Delete)

```
/bank/delete | delete
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	id:
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'bank Deleted',
     "data" : {
		 	 
	 }
}
```

### StatusOrder

------

#### StatusOrder (Create)

```
/statusorder/add | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	statusName	: STRING
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Status Order Added',
     "data" : {
		 statusName	 
	 }
}
```

#### StatusOrder (Update)

```
/statusorder/update | PUT
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	statusName	: STRING
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'Status Order Updated',
     "data" : {
     		statusName	 
		 	 
	 }
}
```
#### StatusOrder (Delete)

```
/statusorder/delete | delete
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	id:
}
```

- Return :

```
{  
     "status" : 'success',
     "message" : 'status order Deleted',
     "data" : {
		 	 
	 }
}
```

### ORDERPRODUCT

------


#### SEARCHORDERSUBTOTAL (POST)

```
/subtotal/ | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	searchby : STRING,
	value : INTEGER
	
}
```

- Return :

```
{      
     "data" : {
				 
	 }
}
```
#### SearchORDER (POST)

```
/orderproduct/searchorder | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	querysearch : STRING
	createdAt : DATE
	page : INTEGER
}
```

- Return :

```
{  
     {
		 	 
	 }
}
```
### TrackingRajaOngkir

------


#### CEKRESI (POST)

```
/district-recomendation/tracking/ | POST
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	id: INTEGER
	
}
```

- Return :

```
{      
     "data" : {
				 
	 }
}
```
### Dashboard

------


#### Index (GET)

```
/dashboard/index/ | get
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	
}
```

- Return :

```
{      
     "data" : {
		 		 
	 }
}
```

#### ReportProduk (GET)

```
/dashboard/reportproduk/ | get
```

- Header : Content-Type (application/json), Accept (application/json), Bearer (token)
- Body :

```
{
	
}
```

- Return :

```
{      
     "data" : {
		 		 
	 }
}
```
