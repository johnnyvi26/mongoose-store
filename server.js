const express = require('express');
const app = express();
require('dotenv').config();
const Product = require('./models/products');
const productsSeed = require('./models/productsSeed');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const db = mongoose.connection;

///////////////////////////////////////////////////////////////////////////////
//////////////////////// MIDDLEWARE ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//methodOverride
app.use(methodOverride('_method'));


///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// DATABASE /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
 

// Database Configuration
const DATABASE_URL = process.env.DATABASE_URL
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Database Connection Error / Success
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////// ROUTES / CONTROLLERS ////////////////////////
///////////////////////////"///////////////////////////////////////////////////

app.get('/products/seed', (req, res) => {
    app.get('/products/seed', (req, res) => {
        Product.deleteMany({}, (error, allProducts) => { });

        Product.create(productsSeed, (error, data) => {
            res.redirect('/products');
        });
    });
});

// INDEX
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
    });
});

// NEW
app.get("/products/new", (req, res) => {
    res.render("new.ejs");
});

// Delete - delete a single ....
app.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (error, deletedProduct) => {
        res.redirect('/products');
    });
});


// // UPDATE
// Update - update a single ..
app.put('/products/:id', (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedProduct) => {
            res.redirect(`/products/${req.params.id}`);
        }
    );
});


// Create - create a new ...
app.post('/products/new', (req, res) => {
    Product.create(req.body, (error, createProduct) => {
        console.log(error);
        res.redirect('/products');
    });
});


// Edit - display form to update a ....
app.get('/products/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        });
    });
});


// Product - display a single 
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});


//////////////////////////////////////////////////////////////
/////////////////////////////// LISTENER /////////////////////
/////////////////////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is listening on port:`, PORT);
});