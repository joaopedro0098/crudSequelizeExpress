const dbConfig = require ('../config/dbConfig.js') // importei a configuração do banco de dados para o modelo 
const {Sequelize, DataTypes} = require('sequelize') // importei por desestruturação só o que eu precisava do sequelize

const sequelize = new Sequelize( // criei uma nova instancia do sequelize para passar as configurações do banco de dados
        
    dbConfig.DB,
    dbConfig.USER, 
    dbConfig.PASSWORD, {                                         
        host: dbConfig.HOST, 
        dialect: dbConfig.dialect, 
        operatorsAliases: false, 

            pooll: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min, 
                acquire: dbConfig.pool.acquire, 
                idle: dbConfig.pool.idle
    }
  })

sequelize.authenticate()
.then(() => 
{ console.log('connected...')
})
.catch(err => {
    console.log('Error' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

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