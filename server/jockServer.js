let express = require("express");
var mongoose = require('mongoose');
let bodyParser = require("body-parser");
let db = require("../database");
let app = express();

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

var jockSchema = mongoose.Schema({
    id:Number,
    jock:String
});
var dataModel = db.model("jock", jockSchema);

app.all("*", function(req, res, next) {
    //当前设置随便跨域
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    next();
});

app.get("/number",function(req,res){
    console.log("收到了请求总数的ack");
    dataModel.count(function(err,total){
        res.send({totalNumber:total});
        res.end();
        db.close();
    });
});

app.get("/joke",function(req,res){
    console.log(req.query.page);
    dataModel.find({}).skip(req.query.page*5).limit(5).exec(function(err,docs){
        res.send({
            jockList:docs
        })
    });
});

function getJock(from,number){

}


app.listen(10222);
