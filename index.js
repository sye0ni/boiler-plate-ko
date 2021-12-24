const express = require('express')
const app = express()
const port = 5000

const {User}=require('./models/User')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

//application/x-www-form-urlencoded 데이터를 분석해서 갖고오도록 해주는 것
app.use(bodyParser.urlencoded({extended:true}));
//application/json 으로 된 것을 분석해서 가져오도록 해주는 것
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://lsy:aemna7c8@boilerplate.txqok.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{}).then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 메리크리스마스!!')
})

app.post('/register',(req,res)=>{
  //회원가입할때 필요한 정보들을 client에서 가져오면 그것들을 db에 넣어준다

  const user=new User(req.body);
  
  user.save((err)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  }) //정보들이 user model에 저장됨 (몽고db)
})//회원가입을 위한 route 생성 



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})