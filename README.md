download nodejs.exe and run
https://nodejs.org/dist/v5.9.0/node-v5.9.0-x64.msi
install npm command

download couchdb.exe and run
https://dl.bintray.com/apache/couchdb/win/1.6.1/setup-couchdb-1.6.1_R16B02.exe
open http://localhost:5984/_utils/
create database and views

// Add data from JSON package file to CouchDB using script
curl -d @products.json -X POST http://127.0.0.1:5984/productdb/_bulk_docs -H "Content-Type: application/json"

//install required packages
npm cache clean
npm install express --save
npm install serve-favicon --save
npm install morgan --save
npm install cookie-parser --save
npm install body-parser n--save
npm install debug --save
npm install node-libcurl --build-from-source
npm install cradle

//install couchdb client connection module
npm install nano --save

//to start node js
npm start
//open the url in browser
http://localhost:3000/


//create productID view('productId', 'productId')
function(doc){
	if(doc.name){
		emit(doc.name,doc._id)
	}
}


//create a view of all the product of a category('product','name')
function(doc){
	if(doc.category&&doc.name){
		emit(doc.category,doc.name)
	}
}

//create a view of all the categories('category', 'products_category')
function(doc){
	if(doc.category){
		emit(doc.category)
	}
}

API end - points for the following
//List all the products(all data)
http://localhost:3000

//List all the categories
http://localhost:3000/category

//list all the products of a category
http://localhost:3000/category/Cocktails

//create a product with category
localhost:3000/productName/Stella/productCategory/Beers

//create a product only with name
http://localhost:3000/productName/Heineken

//delete a product by name
http://localhost:3000/deleteProductName/Heineken