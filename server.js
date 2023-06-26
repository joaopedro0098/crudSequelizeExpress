const express = require('express') // importa o express e o atribui a variável express
const cors = require('cors') // importa o cors, é um pacote Node.js que garante a segurança de dados em solicitações feitas entre domíniso diferentes
const app = express() // instancio a função express e a armazeno na contante app 

let corOptions = {  
    origin: 'https://localhost: 8081'
    //definirá a origem da URL na qual as solicitações HTTP serão permitidas
}


// routes
const router = require('./routes/productRouter.js') // importo o módulo de roteamento localizado no arquivo productRouter.js dentro da pasta routes
app.use('/api/products', router) // estou dizendo para o express usar o roteador(router) para as rotas que começam

// midleware
app.use(cors(corOptions)) // o método app.use aplica a função cors que é chamada pelo corOptions
app.use(express.json()) // analisará o corpo da solicitação com formato JSON e a colocará no objeto req.body
app.use(express.urlencoded({extended:true})) // analisa o corpo da solicitação com formato de dados codificados em URL e extrai os dados da solicitação e coloca no objeto req.body

// testing 
app.get('/', (req,res) => { // aqui estou definindo a rota raiz, pode ser considerada home do site
     res.json({messge:"here is the Home page"}) // mensagem qualquer
})

// port 
const PORT = process.env.PORT || 8080 /* definindo que o sistema através de process.enc.PORT enontre nas variáveis do ambiente
                                         alguma PORT já definida, se não encontrar ou se não tiver nenhuma definida ele executa a 8080 
                                         processs é um objeto global no Node.js que fornece informações e controle sobre o processo 
                                         em execução, env é uma propriedade desse objeto que contém as variáveis de ambiente desse sistema 
                                         operacional*/ 

//server
app.listen(PORT, () => { // declaro que a porta de escuta será a variável PORT antes definida
    console.log(`Server is running in port ${PORT}`)
})







