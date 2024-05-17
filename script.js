const express=require('express')
const app=express();
const port=3000;
const path=require('path')
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))  
app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'))  
//!post data

let posts=[ 
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I love coding !"
    },
    {
        id:uuidv4(),
        username:"Sahil Yadav",
        content:"I am very much tired !"
    },
    {
        id:uuidv4(),
        username:"Shreya Rai",
        content:"I think we should stop now !"
    },
    {
        id:uuidv4(),
        username:"Sourav Yadav",
        content:"Anime is the best series to watch !"
    }
]

app.use('/', (req ,res) => {
    res.status(200).send('Hello World !')
})

//! to view all the post
app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts})
})

//! to add new post 
app.get('/posts/new',(req,res)=>{
    res.render("form.ejs")  
})

app.post("/posts",(req,res)=>{
    console.log(req.body)
    let{
        username,content
    }=req.body
    let id=uuidv4();
    posts.push({id,username,content})
    res.redirect('/posts')
})
app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    // console.log(id)
    // res.send("request working properly")
    let post=posts.find((p)=>{
        if (id===p.id) {
            return true;
        } 
    }
       
    );
    // console.log(post)
    res.render('show.ejs',{post})
})

//! for update 
app.get('/posts/:id/edit',(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{
        if (id===p.id) {
            return true;
        } 
    }
    );
    res.render('edit.ejs',{post})
})

app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>{
        if (id===p.id) {
            return true;
        } 
    }
    );  
    post.content=newContent;
    console.log(post)
    // console.log(id)
    // res.send("patch request working properly")
    res.redirect('/posts')
})

app.delete('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>{
        if (id===p.id) {
            return true;
        } 
    }
    ); 
    posts.splice(posts.indexOf(post),1)

    res.redirect('/posts')

})


// app.post('/posts/:id',(req,res)=>{
//     let {
//         id,Ncontent
//     }=req.body;
//     let post=posts.find((p)=>{
//         if (id===p.id) {
//             return true;
//         } 
//     }
//     );
//     post.content=Ncontent

// })

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})