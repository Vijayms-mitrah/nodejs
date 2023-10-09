const jwt = require('jsonwebtoken')
require('dotenv').config()

const user = [
    {
        name:"abc",
        title:"This is the title for abc"
    },
    {
        name:"def",
        title:"This is the title for def"
    },
    {
        name:"test",
        title:"This is the title for test"
    },
    {
        name:"react",
        title:"This is the title for react"
    }
]

app.post('/login',(req, res) => {
    const username = req.body.name;
    const user = {name:username};
    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: process.env.JWT_EXPIRES_IN});
    console.log("access_token",access_token, "privateKey", process.env.ACCESS_TOKEN, "user", user, "process.env.JWT_EXPIRES_IN", process.env.JWT_EXPIRES_IN);
    res.send(access_token)
})

const authendicateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    console.log("testtesttest", req.headers, "token", token);
    if(!token){
        return res.sendStatus(410);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user)=>{
        console.log("teetete", user);
        if(err){
            console.log("forbittenError", err);
            return res.status(403).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next()
    })
}

app.get('/posts', authendicateToken, (req, res)=>{
    console.log('userName', req.user.name);
    const filteredResponse = user.filter((a)=>a?.name === req.user.name)
    res.json(filteredResponse)
})