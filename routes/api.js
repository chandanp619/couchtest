var express = require('express');
var router = express.Router();
var couch = require('../couchdb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'status':'API is Working...'});
});

router.get('/list',function(req,res,next){
  var dataOutput = [];
  var product = couch.use('m_products');
  var per_page = 100;
  var params   = {include_docs: true, limit: per_page, descending: true}
  console.log(product);
  product.list(params,function(err,data){
    if(err){ 
      console.log(err);
    }else{
      data.rows.forEach(function(docs) {
          dataOutput.push(docs.doc);
      });
    }
    res.json(dataOutput);
  });
});

router.get('/add',function(req,res,next){

  var product = couch.use('m_products');
  var newProduct = {  
  "product_title": "Sample Product Three",
  "product_quantity": 10,
  "product_price": 210,
  "product_category": "Shoe",
  "product_type": "simple"
  };
  
  product.insert(newProduct,function(err){
    if(err)
    res.json(err);
    else
    res.json('Data Inserted');
  });
});

router.get('/update',function(req,res,next){

  var product = couch.use('m_products');
  var newProduct = {  
  "product_title": "Sample Product XXX",
  "product_quantity": 10,
  "product_price": 210,
  "product_category": "Shoe",
  "product_type": "simple"
  };
  // insert using _rev will update the doc
  product.insert(newProduct,{"_rev":"1-b757c4ce19a933174a14ca41a5d71f55"},function(err){
    if(err)
    res.json(err);
    else
    res.json('Data Updated');
  });
});

router.get('/remove',function(req,res,next){

  var product = couch.use('m_products');
  // insert using _rev will update the doc
  product.destroy("4969b3c23f5d057e2df3a7191400fe10","1-275bd34ef2dbe69c36424e7c2b756e20",function(err){
    if(err)
    res.json(err);
    else
    res.json('Data Deleted');
  });
});

module.exports = router;
