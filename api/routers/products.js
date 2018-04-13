const jwt = require('jsonwebtoken');
const db = require('../db/db');
// const apiResult = require('../utils/apiResult')
// const filter = require('../utils/filter.js')

module.exports = {
    register(app){
        //get方法获取商品信息
        app.get('/products', function(req, res){
            console.log(req.query)
            //可用
            if(req.query.type){
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' ORDER BY id"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            } 
            //可用
            else if(req.query.smalltype){
                var sql = "SELECT * from products WHERE smalltype Like '%"+req.query.smalltype+"%' ORDER BY id"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    if(data.qty == 0){
                        db.mysql.select("select * from products where smalltype = '美裙套装' order by id", function(data){
                            res.send(data)
                        })
                    } else{
                        res.send(data);
                    }
                    
                })
            } 
            //可用
            //首页流行
            else if(req.query.popular){
                var sql = "SELECT * from products WHERE popular ='1' ORDER BY id"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
                
            }
            //可用  首页新款
            else if(req.query.new){
                var sql = "SELECT * from products WHERE new = '1' ORDER BY id"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
                
            }
            //可用 首页精选
            else if(req.query.choiceness){
                var sql = "SELECT * from products WHERE choiceness = '1' ORDER BY id"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
                
            } else if(req.query.id){
                var sql = "SELECT * from products WHERE id = '" + req.query.id + "'  ORDER BY id"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
                
            } 
            else{
                var sql = "select * from products order by id";
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            }
            
        })
        app.get('/saleProducts',(req,res) => {
            if(req.query.brand){
                var sql = "SELECT * from products WHERE brand = '"+req.query.brand+"' ORDER BY saleQty"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })  
            } else if(req.query.address){
                var sql = "SELECT * from products WHERE address = '"+req.query.address+"' ORDER BY saleQty"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })  
            } else if(req.query.type){
                var sql = "SELECT * from products WHERE type = '"+req.query.type+"' ORDER BY saleQty"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })  
            }
            
        })
        app.get('/priceProducts',(req,res) => {
            if(req.query.brand){
                var sql = "SELECT * from products WHERE brand = '"+req.query.brand+"' ORDER BY price"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            } else if(req.query.address){
                var sql = "SELECT * from products WHERE address = '"+req.query.address+"' ORDER BY price"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            } else if(req.query.type){
                var sql = "SELECT * from products WHERE type = '"+req.query.type+"' ORDER BY price"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            }
            
        })
        app.get('/suibianid',(req,res) => {
            var sql = "SELECT * from products WHERE id = "+ req.query.id*1
            db.mysql.select(sql, function(data){
                // console.log(data)
                res.send(data);
            })
        })
        //后台
        //分页代码
        app.get('/page',(req,res) => {
            let db1 = req.query.db;
            let pageNum = (req.query.pageNum - 1)*10;
            let qty = req.query.qty;
            var sql = "select * from " + db1 + " order by id  limit "+ pageNum + "," + qty*1
                // var sql = "select * from products"
                // console.log(db.mysql)
            db.mysql.select(sql, function(data){
                    // console.log(data)
                res.send(data);
            })
            
            
        })
        //模糊搜索
        app.get('/insert',(req,res) => {
            let db1 = req.query.db;
            let key = req.query.key;
            let val = req.query.val;
            let pageNum = (req.query.pageNum - 1)*10;
            let qty = req.query.qty;
            console.log(pageNum)
                var sql = "select * from " + db1 +" where "+ key +" like '%"+ val + "%' order by id  limit "+ pageNum + "," + qty*1
                console.log('111',sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            
            
        })
        //增加商品
        app.get('/add',(req,res) => {
            let db1 = req.query.db;
            // let obj = req.query;
            // let keyArr = [];
            // let valArr = [];
            // for(var attr in obj){
            //     console.log(attr);
            //     console.log(obj[attr])
            //     while(attr != 'db'){
            //         console.log(111)
            //         keyArr.push(attr)
            //         valArr.push(obj[attr])
            //         break;
            //     }
            // }
            // console.log(keyArr)
            // console.log(valArr)
            // res.send('111')
            
            var promise = new Promise((resolve,reject) => {
                //获取该表所有的数据
                //修改id重复的bug
                let allsql = "select * from " + db1;
                
                let allGoods;
                db.mysql.select(allsql, function(data){
                    // console.log('da',data)
                    allGoods = data.data;
                    resolve(allGoods)
                })
                // function cb(){
                //     for(var i=0;i<allGoods.length;i++){
                //         idArr.push(allGoods[i]['_id'])
                //     }
                //     console.log('_id',idArr)
                // }
            })
            promise.then((allGoods) => {
                // console.log(allGoods)
                let promise1 = new Promise((resolve,reject) => {
                    let idArr = [];
                    for(var i=0;i<allGoods.length;i++){
                        idArr.push({_id:allGoods[i]['_id'],qty:allGoods[i]['qty'],id:allGoods[i].id})
                    }
                    resolve(idArr)
                })
                return promise1
            }).then((idArr) => {
                console.log('idArr',idArr)
                // let idValArr = [];
                // let idQtyArr = [];
                for(var i=0;i<idArr.length;i++){
                    // idValArr.push(idArr[i]['_id'])
                    // idQtyArr.push(idArr[i]['qty'])
                    while(idArr[i]['_id'] == req.query['_id']){
                        req.query['qty'] = req.query.qty*1 + idArr[i]['qty']*1
                        //删除原来的数据
                        console.log('delid',idArr[i]['id'])
                        var delsql = "delete from " + db1 +" where id = '" + idArr[i]['id'] +"'"
                        console.log(delsql)
                        db.mysql.select(delsql, function(data){
                            console.log('1111111',data)
                        })
                        break;
                    }
                }
                let obj = req.query;
                let keyArr = [];
                let valArr = [];
                for(var attr in obj){
                    console.log(attr);
                    console.log(obj[attr])
                    while(attr != 'db'){
                        console.log(111)
                        keyArr.push(attr)
                        valArr.push(obj[attr])
                        break;
                    }
                }
               
                // console.log(idValArr)
                // console.log(idQtyArr)
                console.log(keyArr)
                console.log(valArr)
                let suijiId = Math.ceil(Math.random()*10000000);
                console.log('suiji',suijiId)
                var sql = 'insert into ' + db1 + " (id,";
                for(var i=0;i<keyArr.length;i++){
                    sql += keyArr[i] + ','
                }
                sql = sql.slice(0,-1);
                sql += ") value ('" +suijiId + "',"
                for(var i=0;i<valArr.length;i++){
                    sql += "'"+valArr[i] + "',"
                }
                sql = sql.slice(0,-1);
                sql += " )"            
                console.log('add',sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
                
            })



            
        })
        //改
        app.get('/update',(req,res) => {
            let db1 = req.query.db;
            let id = req.query['id'];
            let username = req.query.username;
            let obj = req.query;
            let newObj = {};
            for(var attr in obj){
                console.log(attr);
                console.log(obj[attr])
                while(attr != 'db' && attr != 'id' && attr != 'username'){
                    console.log(111)
                    newObj[attr] = obj[attr]
                    break;
                }
            }
            console.log(newObj)
            var sql = "update " + db1 + " set " 
            for(var attr in newObj){
                sql += attr + "= " + newObj[attr] + ','
            }
            sql = sql.slice(0,-1);
            sql += " where id=" + id + " && username = '" + username + "'";
            db.mysql.select(sql, function(data){
                // console.log(data)
                res.send(data);
            })

            
        })
        //删除
        app.get('/delete',(req,res) => {
            let db1 = req.query.db;
            let id = req.query.id;
            let username = req.query.username;
            var sql = "delete from " + db1 + " where id = '" + id + "' && username = '"+ username + "'"
            db.mysql.select(sql, function(data){
                // console.log(data)
                // res.send(data);
                var sql = "select * from "+db1+" order by id"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            })
        })
        //可用
        //获取购物车商品数据
        app.get('/getCart',(req,res) => {
            let username = req.query.username;
            var sql = "select * from cart where username = '"+username+"' order by id"
            db.mysql.select(sql, function(data){
                // console.log(data)
                res.send(data);
            })
        })
        app.get('/community',(req,res) => {
            var sql = "select * from review order by _id"
            db.mysql.select(sql, function(data){
                // console.log(data)
                res.send(data);
            })
        })
         //增加商品
         //可用
         app.get('/addCollect',(req,res) => {
            let db1 = req.query.db;
            // let obj = req.query;
            // let keyArr = [];
            // let valArr = [];
            // for(var attr in obj){
            //     console.log(attr);
            //     console.log(obj[attr])
            //     while(attr != 'db'){
            //         console.log(111)
            //         keyArr.push(attr)
            //         valArr.push(obj[attr])
            //         break;
            //     }
            // }
            // console.log(keyArr)
            // console.log(valArr)
            // res.send('111')
            
            var promise = new Promise((resolve,reject) => {
                //获取该表所有的数据
                //修改id重复的bug
                let allsql = "select * from " + db1;
                
                let allGoods;
                db.mysql.select(allsql, function(data){
                    // console.log('da',data)
                    allGoods = data.data;
                    resolve(allGoods)
                })
                // function cb(){
                //     for(var i=0;i<allGoods.length;i++){
                //         idArr.push(allGoods[i]['_id'])
                //     }
                //     console.log('_id',idArr)
                // }
            })
            promise.then((allGoods) => {
                // console.log(allGoods)
                let promise1 = new Promise((resolve,reject) => {
                    let idArr = [];
                    for(var i=0;i<allGoods.length;i++){
                        idArr.push({_id:allGoods[i]['_id'],id:allGoods[i].id,username:allGoods[i].username,color:allGoods[i].color,size:allGoods[i].size,qty:allGoods[i].qty})
                    }
                    resolve(idArr)
                })
                return promise1
            }).then((idArr) => {
                console.log('idArr',idArr)
                // let idValArr = [];
                // let idQtyArr = [];
                let newQty = 0;
                for(var i=0;i<idArr.length;i++){
                    // idValArr.push(idArr[i]['_id'])
                    // idQtyArr.push(idArr[i]['qty'])
                    while(idArr[i]['_id'] == req.query['_id'] && idArr[i]['username'] == req.query['username'] && idArr[i]['color'] == req.query['color'] && idArr[i]['size'] == req.query['size']){
                        console.log('qianhouqty',idArr[i]['qty'])
                        newQty = newQty + idArr[i]['qty']*1 + req.query['qty']*1
                        console.log('qianhouqty',newQty)                        
                        //删除原来的数据
                        console.log('delid',idArr[i]['id'])
                        var delsql = "delete from " + db1 +" where id = '" + idArr[i]['id'] +"' && username='" +idArr[i]['username'] +"' && color = '" + idArr[i]['color'] + "' && size = '" + idArr[i]['size'] + "'"
                        console.log(delsql)
                        db.mysql.select(delsql, function(data){
                            console.log('1111111',data)
                        })
                        break;
                    }
                }
                let obj = req.query;
                let keyArr = [];
                let valArr = [];
                console.log('newQty',newQty)
                if(newQty != 0){
                    obj.qty = newQty
                }
                for(var attr in obj){
                    console.log(attr);
                    console.log(obj[attr])
                    while(attr != 'db'){
                        console.log(111)
                        keyArr.push(attr)
                        valArr.push(obj[attr])
                        break;
                    }
                }
                // console.log(idValArr)
                // console.log(idQtyArr)
                console.log('key',keyArr)
                console.log('val',valArr)
                let suijiId = Math.ceil(Math.random()*10000000);
                console.log('suiji',suijiId)
                var sql = 'insert into ' + db1 + " (id,";
                for(var i=0;i<keyArr.length;i++){
                    sql += keyArr[i] + ','
                }
                sql = sql.slice(0,-1);
                sql += ") value ('" +suijiId + "',"
                for(var i=0;i<valArr.length;i++){
                    sql += "'"+valArr[i] + "',"
                }
                sql = sql.slice(0,-1);
                sql += " )"            
                console.log('add',sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
                
            })



            
        })
        app.get('/addCollect1',(req,res) => {
            let db1 = req.query.db;
            let username = req.query.username;
            // let obj = req.query;
            // let keyArr = [];
            // let valArr = [];
            // for(var attr in obj){
            //     console.log(attr);
            //     console.log(obj[attr])
            //     while(attr != 'db'){
            //         console.log(111)
            //         keyArr.push(attr)
            //         valArr.push(obj[attr])
            //         break;
            //     }
            // }
            // console.log(keyArr)
            // console.log(valArr)
            // res.send('111')
            
            var promise = new Promise((resolve,reject) => {
                //获取该表所有的数据
                //修改id重复的bug
                let allsql = "select * from " + db1;
                
                let allGoods;
                db.mysql.select(allsql, function(data){
                    // console.log('da',data)
                    allGoods = data.data;
                    resolve(allGoods)
                })
                // function cb(){
                //     for(var i=0;i<allGoods.length;i++){
                //         idArr.push(allGoods[i]['_id'])
                //     }
                //     console.log('_id',idArr)
                // }
            })
            promise.then((allGoods) => {
                // console.log(allGoods)
                let promise1 = new Promise((resolve,reject) => {
                    let idArr = [];
                    for(var i=0;i<allGoods.length;i++){
                        idArr.push({_id:allGoods[i]['_id'],id:allGoods[i].id,username:allGoods[i].username,color:allGoods[i].color,size:allGoods[i].size,qty:allGoods[i].qty})
                    }
                    resolve(idArr)
                })
                return promise1
            }).then((idArr) => {
                console.log('idArr',idArr)
                // let idValArr = [];
                // let idQtyArr = [];
                let newQty = 0;
                for(var i=0;i<idArr.length;i++){
                    // idValArr.push(idArr[i]['_id'])
                    // idQtyArr.push(idArr[i]['qty'])
                    while(idArr[i]['_id'] == req.query['_id'] && idArr[i]['username'] == req.query['username'] && idArr[i]['color'] == req.query['color'] && idArr[i]['size'] == req.query['size']){
                        console.log('qianhouqty',idArr[i]['qty'])
                        newQty = newQty + idArr[i]['qty']*1 + req.query['qty']*1
                        console.log('qianhouqty',newQty)                        
                        //删除原来的数据
                        console.log('delid',idArr[i]['id'])
                        var delsql = "delete from " + db1 +" where id = '" + idArr[i]['id'] +"' && username='" +idArr[i]['username'] +"' && color = '" + idArr[i]['color'] + "' && size = '" + idArr[i]['size'] + "'"
                        console.log(delsql)
                        db.mysql.select(delsql, function(data){
                            console.log('1111111',data)
                        })
                        break;
                    }
                }
                let obj = req.query;
                let keyArr = [];
                let valArr = [];
                console.log('newQty',newQty)
                if(newQty != 0){
                    obj.qty = newQty
                }
                for(var attr in obj){
                    console.log(attr);
                    console.log(obj[attr])
                    while(attr != 'db'){
                        console.log(111)
                        keyArr.push(attr)
                        valArr.push(obj[attr])
                        break;
                    }
                }
                // console.log(idValArr)
                // console.log(idQtyArr)
                console.log('key',keyArr)
                console.log('val',valArr)
                let suijiId = Math.ceil(Math.random()*10000000);
                console.log('suiji',suijiId)
                var sql = 'insert into ' + db1 + " (id,";
                for(var i=0;i<keyArr.length;i++){
                    sql += keyArr[i] + ','
                }
                sql = sql.slice(0,-1);
                sql += ") value ('" +suijiId + "',"
                for(var i=0;i<valArr.length;i++){
                    sql += "'"+valArr[i] + "',"
                }
                sql = sql.slice(0,-1);
                sql += " )"            
                console.log('add',sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    var sql1 = "select * from cart where username = '"+username+"' order by id"
                    db.mysql.select(sql1, function(data){
                        // console.log(data)
                        res.send(data);
            })
                })
                
            })



            
        })

        //获取二级分类的所有商品的分类商品
        app.get('/smallType',(req,res) => {
            //可用 
            var db1 = req.query.db;
            var sql = "SELECT * from "+ db1 +" WHERE type Like '%"+req.query.type+"%' ORDER BY id"
            console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
                    
        })
        app.get('/smallType1',(req,res) => {
            //可用 
            if(req.query.smalltype){
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' && smalltype Like '%"+req.query.smalltype+"%' ORDER BY id"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            } else {
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' ORDER BY id"
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            }
            
                    
        })
        app.get('/smallTypeSaleqty',(req,res) => {
            //可用 
            if(req.query.smalltype){
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' && smalltype Like '%"+req.query.smalltype+"%' ORDER BY saleqty"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            } else {
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' ORDER BY saleqty"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            }      
        })
        //keyong
        app.get('/hotSale',(req,res) => {
            var sql = "SELECT * from products ORDER BY saleqty"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
        })
        app.get('/newTime',(req,res) => {
            var sql = "SELECT * from products ORDER BY time"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
        })
        app.get('/smallTypeNewTime',(req,res) => {
            //可用 
            if(req.query.smalltype){
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' && smalltype Like '%"+req.query.smalltype+"%' ORDER BY time"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            } else{
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' ORDER BY time"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            }
            
                    
        })
        app.get('/smallTypePrice',(req,res) => {
            //可用 
            if(req.query.smalltype){
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' && smalltype Like '%"+req.query.smalltype+"%' ORDER BY saleprice"
                console.log(sql)
                    db.mysql.select(sql, function(data){
                        // console.log(data)
                        res.send(data);
                    })
            } else {
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' ORDER BY saleprice"
                console.log(sql)
                    db.mysql.select(sql, function(data){
                        // console.log(data)
                        res.send(data);
                    })
            }
           
                    
        })
        app.get('/smallTypePriceDesc',(req,res) => {
            //可用 
            if(req.query.smalltype){
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' && smalltype Like '%"+req.query.smalltype+"%' ORDER BY saleprice DESC"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            } else {
                var sql = "SELECT * from products WHERE type Like '%"+req.query.type+"%' ORDER BY saleprice DESC"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    // console.log(data)
                    res.send(data);
                })
            }
            
                    
        })
        //万能模糊搜索
        app.get('/dimSearch',(req,res) => {
            let parmas = Object.values(req.query)[0];
            console.log(parmas)
            let promise = new Promise ((resolve,reject) => {
                let sql = "SELECT * from products WHERE name Like '%"+parmas+"%' ORDER BY id"
                console.log(sql)
                db.mysql.select(sql, function(data){
                    if(data.qty > 0){
                        console.log(111)
                        res.send({type: 'name',data: data});
                    } else {
                        resolve(parmas)
                    }
                })
            })
            promise.then((parmas) => {
                let promise1 = new Promise((resolve,reject) => {
                    let sql = "SELECT * from products WHERE type Like '%"+parmas+"%' ORDER BY id"
                    db.mysql.select(sql, function(data){
                        if(data.qty > 0){
                            console.log(111)
                            res.send({type: 'type',data: data});
                        } else {
                            resolve(parmas)
                        }
                    })
                    
                })
                return promise1
            }).then((parmas) => {
                let sql = "SELECT * from products WHERE price Like '%"+parmas+"%' ORDER BY id"
                db.mysql.select(sql, function(data){
                    if(data.qty > 0){
                        console.log(111)
                        res.send({type: 'price',data: data});
                    } else {
                        res.send({status: false})
                    }
                })
            })
        })
    }
}