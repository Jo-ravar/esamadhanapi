var router = require('express').Router();
var dbhelper=require('../utilities/dbhelper');
var ObjectID=require('mongodb').ObjectID;  




router.route('/add')
.post(function(req,res){
    if(!req.body.name||!req.body.proce){
        res.json({ success: false, message: 'Please fill all details.' });
    }else{
        var urlStr;
        if(!req.body.url)
        urlStr="Not available";
        else
        urlStr=req.body.url;

        var db=dbhelper.db;
        var collection = db.collection('Documents');
       collection.insertOne({
            name:req.body.name,
            proc:req.body.proce,
            url:urlStr
        }, function (err, result) {
            if (err) {
                console.log("Error in insert " + JSON.stringify(err));
                 return res.json({ success: false, message: 'Something went wrong.'});
               
            } else {
                console.log("Insert Successful " + JSON.stringify(result));
                 res.json({ success: true, message: 'Successfully Added' });
            }
        });

    }
});


router.route('/edit')
.post(function(req,res){
 if(!req.body.name ||!req.body.proce){
     res.json({success:false, message: 'Please enter document name and its procedure'});
 }else{
     var urlStr;
        if(!req.body.url)
        urlStr="Not available";
        else
        urlStr=req.body.url;

     var newData={
            name:req.body.name,
            proc:req.body.proce,
            url:urlStr
     };

        var db=dbhelper.db;
        var collection = db.collection('Documents');

     var id=req.query.id;
       var objectId = new ObjectID(id);
      console.log(" id "+id);
     var query= {_id:objectId};
 collection.update( query,newData, { upsert: true },function(err,result){
     if(err)
     {
                console.log("Error in insert " + JSON.stringify(err));
                 return res.json({ success: false, message: 'Something went wrong.'});
     }
     else{
         res.send(result);
     }
});
 
 }
});

router.route('/delete')
.post(function(req,res){
         var id=req.query.id;
         console.log(" id "+id);
         var db =dbhelper.db;
         var collection = db.collection('Documents');
         var objectId = new ObjectID(id);
          collection.remove({ _id: objectId},function(err ,data){
             if(err)
             {
                 console.error(JSON.stringify(err));
                 return res.json({ success: false, message: 'Something went wrong.'});
             }
             else
             {
                 console.log(data);
                   res.json({ success: true, message: 'Successfully Deleted' });
             }
        }); 

});

router.route('/search')
.get(function(req,res){

  var searchData=req.query.id;
  var db =dbhelper.db;
  var collection = db.collection('Documents');
  db.ensureIndex("Documents", {  
  proc: "text"
});
  collection.find({$text: {$search: searchData}}).toArray(function(err,data){
       if(err)
       {
                console.error(JSON.stringify(err));
                 return res.json({ success: false, message: 'Something went wrong.'});
       }
       else{
           console.log(data);
           res.send(data);
       }
  });

});

router.route('/det')
.get(function(req,res){
    
        var id = req.query.id;
        var db =dbhelper.db;
        var collection = db.collection('Documents');
        var objectId = new ObjectID(id);
        collection.findOne({ _id: objectId},function(err ,data){
             if(err)
             {
                 console.error(JSON.stringify(err));
                 return res.json({ success: false, message: 'Something went wrong.'});
             }
             else
             {
                 console.log(data);
                res.send(data);
             }
        }); 

});

module.exports = router;
