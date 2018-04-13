/* 
* @Author: Marte
* @Date:   2018-03-11 16:09:15
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-11 13:05:52
*/

var path = require('path');
var fs = require('fs');
var multer = require ('multer'); 


//设置上传的目录，  
//这里指定了一个临时目录（上传后的文件均保存到该目录下），  
//真正开发是一般加入path模块后使用path.join(__dirname,'temp');  
// var upload = multer({ 
//  dest:  path.join(__dirname, "../uploadFile"),
// });  

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var _path = path.join(__dirname, "../assets");
        if(!fs.existsSync(_path)){
            // console.log(222);
            fs.mkdirSync(_path);
        }
        // if(fs.existsSync(path.join(_path, file.originalname))){
        //  fs.unlinkSync(path.join(_path, file.originalname));
        // }
        cb(null, _path);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.originalname);  
    }
});

// // 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

var uploadSingleHandler = function(req, res, next){
    var uploadObj = upload.single('head');
    uploadObj(req, res, function(err){
        if(err){
            next(err);
        } else {
            next();
        }
    })
}

module.exports = {
    register: function(app){
        //单位件上传   
        //注意上传界面中的 <input type="file" name="avatar"/>中的name必须是下面代码中指定的名称  
        app.post('/singleUpload', uploadSingleHandler, function (req, res, next) {  
            console.log(req.file)
            // req.file is the `avatar` file   
            // req.body will hold the text fields, if there were any   
            // console.log(req.file);  
            // console.log(req.body);  
            
            res.end("上传成功");  
        });  
            
        //多附件上传  
        //注意上传界面中的 <input type="file" name="photos"/>中的name必须是下面代码中指定的名  
        app.post('/upload', upload.array('head', 12), function (req, res, next) {  
            // req.files is array of `photos` files   
            // req.body will contain the text fields, if there were any   
            // console.log(666);
            console.log(req.files);  
            // console.log(req.files[0].filename);  
            //res.end(req.file + "<br/><br/>" + req.body);  
            res.end(req.files[0].filename);  
            
        })              
    }
}