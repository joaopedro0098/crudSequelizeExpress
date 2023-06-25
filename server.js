const express = require('express')
const cors = require('cors') // para garantir a segurança de dados em solicitações feitas entre domíniso diferentes
const app = express()

let corOptions = {  
    origin: 'https://localhost: 8081'
    //definirá a origem da URL na qual as solicitações HTTP serão permitidas
}


// routes
const router = require('./routes/productRouter.js')
app.use('/api/products', router)

// midleware
app.use(cors(corOptions))
app.use(express.json()) // analisará o corpo da solicitação com formato JSON e a colocará no objeto req.body
app.use(express.urlencoded({extended:true})) // analisa o corpo da solicitação com formato de dados codificados em URL e extrai os dados da solicitação e coloca no objeto req.body

// testing 
app.get('/', (req,res) => {
     res.json({messge:"here is the Home page"})
})

// port 
const PORT = process.env.PORT || 8080

//server
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})







