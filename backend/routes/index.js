const router = require('koa-router')()
const db=require('./dbConfig')
const UID=require('uuid/v1')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/v0/hello', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/v0/veglist',async(ctx)=>{
  //res.header('Content-Type','application/json');
  //ctx.set("Content-Type", "application/json") 
  let userid='10161768';

  let query=()=>{
      return new Promise((resolve,reject)=>{
          db.query("select * from veg",async(err,data)=>{
            console.log(data[0].VegName)
              if(err)
                  console.log(err)
              if(data.length==0){
                resolve({
                  code:3,
                  message:'nameerror'
                })
              }
              else{
                resolve({
                  data:data
                })
              }
          })
      })
  }
  let result=await query();
  ctx.body={result};
})


router.post('/v0/cart', async (ctx, next) => {
  let userid='10161768';
  let cartid=UID();
  let veglist=ctx.request.body.veglist;
  let count=0;
  let query=()=>{
      for(let i=0;i<veglist.length;i++){
        let vegid=veglist[i].vegid;
        let vegnum=veglist[i].vegnum;
        let param=[userid,vegid,cartid,vegnum];
        db.query("insert into cart (CustomerID,VegID,CartVegNo,VegSize) values (?,?,?,?)",param,async(err,data)=>{
          if(err)
            {
                console.log(err)
                resolve({
                  message:'error'
                })
            }
          else{
            count++;
            if(count==(veglist.length-1)){
              resolve({
                message:'success'
              })
            }
          }
        })
      }
  }

  let res=await query();
  ctx.body=res;
  

})

module.exports = router
