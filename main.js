let request = require("request");
let cheerio = require("cheerio");
let mongoose = require('mongoose');
var color = require("colors");
let db = require("./database");

const fs = require("fs");

var max = 699;
let jockNumber = 33880;

var jockSchema = mongoose.Schema({
    id:Number,
    jock:String
});
var dataModel = db.model("jock", jockSchema);
function getHaha(index) {
    console.log(`请求${index}页`.red);
    request.get(`http://jandan.net/duan/page-${index}#comments`, function(error, response, body) {
        let $ = cheerio.load(body);
        $(".commentlist .text p").each(function(idx, element) {
            var haha = $(element).text();
            var data = new dataModel({
                id:jockNumber,
                jock: haha
            });
            data.save(function(error, doc) {
                if (error) console.log("error :" + error);
                else console.log(`第${doc.id}条:下载完毕`);
            })
            jockNumber++;
        });
        if(index < 2) {console.log("全部下载完成");return;}
        else {
            setTimeout(function(){
                console.log("---------------------------".green);
                getHaha(index-=1);
                console.log("---------------------------".green);
            },1000);
        }
    });
}

getHaha(max);
