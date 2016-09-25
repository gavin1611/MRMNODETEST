var express = require('express');
var Curl = require('node-libcurl').Curl;
var router = express.Router();
var nano = require('nano')('http://127.0.0.1:5984');
var productdb = nano.db.use('productdb');
var apikey = "4e4484a56f90eb9e4957402a7f0c4dc5";
var cradle = require('cradle');
var db = new(cradle.Connection)().database('productdb')

/* GET home page. */

//list all the products
router.get('/', function(req, res, next) {

    var db= require('nano')('http://localhost:5984/productdb')
        , per_page = 15
        , params   = {include_docs: true, limit: per_page, descending: true}
    ;

    db.list(params, function(error,body,headers) {
        console.log(body);
        res.send(body.rows);
    });

});

//list all the categories
router.get('/category', function(req, res, next){
    productdb.view('category', 'products_category',function(err, body){
        if(err)
            res.send(err);
        else
            res.send(body.rows);
    });
});

//list all the products of a category
router.get('/category/:category', function(req, res, next){
    var category = req.params.category;

    productdb.view('product','name',{startkey:category,endkey:[category,1]},function(err, body){
        if(err)
            res.send(err);
        else
            res.send(body.rows);
    });

});

//create a product with category
router.get('/productName/:productname/productCategory/:productcategory',function(req,res){
    var productName=req.params.productname;
    var productCategory=req.params.productcategory;
    console.log(productName);
    var data={name:productName,category:productCategory};
    console.log(data);
    productdb.insert(data,function(err, body){
            if(err){
                res.send(err);
            }
            if(!err){
                res.send("add product successfully");
            }
        });
});

//create a product only with name
router.get('/productName/:productname',function(req,res){
    var productName=req.params.productname;
    var data={name:productName};
    productdb.insert(data,function(err, body){
        if(err){
            res.send(err);
        }
        if(!err){
            res.send("add product successfully");
        }
    });
});

//delete a product by name
router.get('/deleteProductName/:deleteProductName',function(req,res){
    var deleteProductName=req.params.deleteProductName;
    var id="";
    productdb.view('productId', 'productId',function(err, body){
        if(err){
            res.send(err);
        }
        for(var i=0;i<body.rows.length;i++){
            if(body.rows[i].key==deleteProductName){
                id=body.rows[i].value;
                db.remove(id, function(err,info) {

                    res.send("delete successfully");
                });
            }
        }
    });

});


module.exports = router;


