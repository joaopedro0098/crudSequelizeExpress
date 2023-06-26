const dbConfig = require ('../config/dbConfig.js') // importei a configuração do banco de dados para o modelo 
const {Sequelize, DataTypes} = require('sequelize') // importei por desestruturação só o que eu precisava do sequelize

const sequelize = new Sequelize( // criei uma nova instancia do sequelize para passar as configurações do banco de dados

    // daqui para baixo essas configurações seguem um padrão "nome do arquvi" + "propriedade". havendo uma associação através do "."
    /* É importante ressaltar que aqui eu não estu fazendo a configuração inicial do banco de dados mas simplesmente
       passando-as para o novo objeto Sequelize instanciado acima*/
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, {                                         
        host: dbConfig.HOST, 
        dialect: dbConfig.dialect, 
        operatorsAliases: false, /* personalisa os operadores de comparação. É preciso deixa-lo como falso para
                                    para que o usuário não tenha essa opção de personaliza-loao fazer uma solici-
                                    tação, garantindo assim a segurança */

            pooll: { // é uma analogia ao conceito de piscina("piscina de conexões"), é um objeto que define opções de conexão.
                max: dbConfig.pool.max,
                min: dbConfig.pool.min, 
                acquire: dbConfig.pool.acquire, 
                idle: dbConfig.pool.idle
    }
  })

sequelize.authenticate() /* este é um método fornecido pelo sequelize que é responsável por estabelecer uma conexão 
                            com o banco de dados mediante algumas credenciais de autenticação, as credenciais de 
                            autenticação estão presente na palavra "sequelize", já a palavra sequelize se refere a 
                            constante declarada logo acima, onde armazenei todas essas tais credenciais*/
.then(() => // função anonima
{ console.log('connected...') // msg de sucesso para a Promisse retornada pelo método autenticate()
})
.catch(err => {
    console.log('Error' + err) // caso haja algum erro
})

const db = {} /* declaro uma variável chamada db e a inicializo como um objeto vazio, será usada para armazenar 
                modelos e outras infomações sobre o  banco de dados */

db.Sequelize = Sequelize /* aqui estou adicionando uma propriedade chamada Sequelize ao objeto db declarado
                            acima e atribuindo a ela o valor da classe Sequelize*/

db.sequelize = sequelize /* aqui estou adicionando um propriedade chamada sequelize ao objeto db, esta palavra 
                            é a constante delcarada acima, ela possui todas as configurações de conexão com o 
                            banco de dados. Então, atribuo a essa palavra o valor o valor da constante sequelize
                            declara acima, lembrando que não é uma simples constante mas sim uma instancia do 
                            sequelize*/

db.products = require('./productModel.js')(sequelize,DataTypes)
db.reviews = require('./reviewModel.js')(sequelize,DataTypes)

db.sequelize.sync({ force: false})
.then(() => {
    console.log('yes re-sync done!')
})


// relacionamentos
db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})

module.exports = db;