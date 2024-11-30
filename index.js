const express = require('express');

const port = 8000;

const app = express();

app.set('view engine','ejs');

// connection database in mongodb
const db = require('./config/db')
db();

// connect userModel connection
const userModel = require("./models/UserModel");

app.use(express.urlencoded());

app.get('/',(req,res) => {
    res.render('Add');
})

app.post('/insertRecord',(req,res) => {
    const {book_title,book_author,book_price,category} = req.body;
    userModel.create({
        book_title : book_title,
        book_author : book_author,
        book_price : book_price,
        category : category
    })
    .then(() => {
        console.log("Record added Successfully....");
        res.redirect('/')        
    })
    .catch((err) => {
        console.log(err);
        return false;
    });
});

app.get('/viewBook',(req,res) => {
    userModel.find({})
    .then((book) => {
        return res.render('View',{
            book : book
        })
    }).catch((err) => {
        console.log(err);
        return false;
    })
}); 

app.get('/deleteRecord',(req,res)=>{
    // console.log('query',req.query);
    const Sr = req.query.deleteSr;
    userModel.findByIdAndDelete(Sr)
    .then((response)=>{
        console.log("Record Deleted");
        return res.redirect('/viewBook')
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

//update book
const updateBook = async (req, res) => {
    try {
        const { book_title, book_author, book_price, category } = req.body; 
        const editid = req.query.editId;

        if (!editid) {
            console.log("Edit ID is missing");
            return res.redirect('/viewBook'); 
        }


        await userModel.findByIdAndUpdate(editid, {
            book_title: book_title,
            book_author: book_author,
            book_price: book_price,
            category: category
        });

        console.log("Updated..");
        return res.redirect('/viewBook'); 

    } catch (error) {
        console.log(error);
        return res.redirect('/viewBook');
    }
};
const editBook = async(req,res) =>{
    try {
        const eid = req.query.editId
        // console.log(eid);
        const single = await userModel.findById(eid)
        return res.render('Editblog',{
            single
        }
    )       
    } catch (error) {
        console.log(error);
        return false;
        
    }
}

app.listen(port,(err) => {
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port : ${port}`);
})