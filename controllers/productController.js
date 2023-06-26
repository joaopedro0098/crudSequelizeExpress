const db = require('../models') // importei o modelo e o atribuí a variável db

// create main Model

const Product = db.products // atribuí  db a
const Review = db.reviews


// 1. create product 
const addProduct = async (req, res) => {

 let info = {
     title: req.body.title,
     price: req.body.price, 
     description: req.body.description, 
     published: req.body.published ? req.body.published : false 
    }
    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)
}

// 2. get all products 
const getAllProducts = async (req, res) => {
    
    let products = await Product.findAll({})
    res.status(200).send(products)
  } 

// 3. get single poduct 
const getOneProduct = async (req, res) => {
  
   let id = req.params.id
   let product = await Product.findOne({where: {id: id}})
   res.status(200).send(product)
 }

// 4. update Product 
const updateProduct = async (req, res) => {
   
   let id = req.params.id
   const product = await Product.update(req.body, { where: {id: id}})
   res.status(200).send(product)
}

// 5. delete product by id
const deleteProduct = async (req, res) => {
   
   let id = req.params.id
   await Product.destroy({where: {id : id }} )
   res.status(200).send("Product was delected!")
}
// 6. get published product 
const getPublishedProduct = async (req, res) => {
   
   const products = await Product.findAll({ where: { published: true }})
   res.status(200).send(products)

} 
//7.connect one many relation Product and Reviews
const getProductReviews = async (req, res) => {
    const id = req.params.id
    const data = await Product.findOne({
        include: [{
            models:Review, 
            as: 'review'
        }],
        where: {id: id}
    })
    res.status(200).send(data)
}

 module.exports = { 
   addProduct, 
   getAllProducts, 
   getOneProduct, 
   updateProduct,
   deleteProduct,
   getPublishedProduct,
   getProductReviews

   } 
 

