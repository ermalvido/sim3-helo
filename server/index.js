require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    session = require('express-session');
    authCtrl = require('./controllers/authCtrl'),
    postCtrl = require('./controllers/postCtrl'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
    app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
}).catch(err => console.log(err));

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.post('/auth/logout', authCtrl.logout)

app.post('/new/:userId', postCtrl.createPost)
app.get('/posts/:userId', postCtrl.getPosts)
app.get('/posts', postCtrl.getAllPosts)
app.get('/post/:post_id', postCtrl.selectPost)
app.delete('/post/delete/:post_id', postCtrl.deletePost)

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));