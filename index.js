const express = require('express');
const app = express();
const db=require("./models")
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get('/getcll',async (req,res) => {
    console.log('API is up');
    const book=await db.Book.findAll({})
    console.log(book)
    res.status(201).send(book);
})

//create data
app.post('/books', async (req, res) => {
    try{
        const data = req.body;
    console.log(data);
        const book = await db.Book.bulkCreate(data);
        console.log(books);
        res.send("msg");
    }
    catch (err) {
        res.send(err);
    }
})

//read operation
app.get("/books/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(400).send({error:'Invalid id'});
        return;
    }
    try {
        const book = await db.Book.findOne({
            where: {
                id:id
            }
        });
        console.log(book);
        if (!book) res.send({
            Book: "Book not found"
        });
        res.send({
            Book: book
        });
    } catch (err) {
        res.send(err);
    }
});

//update

app.put('/books/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const book = await db.Book.update(data, {
            where: {
                id
            }
        });
        res.send('book updated');
    } catch (err) {
        res.send(err);
    }
});

app.delete('/books/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCount = await db.Book.destroy({
            where: {
                id: id
            }
        });
        if(deletedCount===0){
            res.status(404).send('No records were deleted')
        }else{
            res.status(200).send(`${deletedCount}record(s) were deleted`);
        }
        res.send('book deleted');
    } catch (err) {
        console.log('Error deleting book', err);
        res.status(200).send('Internal server error');
    }
});

db.sequelize.sync().then((req) => {
    app.listen(3001, () => {
        console.log('server started, 3001');
    })
})