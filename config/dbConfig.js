module.exports = {
    HOST: 'localhost', 
    USER: 'root',
    PASSWORD: '1234',
    DB: 'node_sequelize_api_db',
    dialect: 'mysql',


    pool: {
        max: 5, // define número máximo de conexões
        min: 0, // define número mínimo de conexões inativas

        acquire: 30000, /* define o tempo máximo em milisegundos que o pool deve esperar para uma conexão estar disponível
                          antes de estar disponível antes de lançar umm erro de tempo limite */
        idle:10000 /* define o tempo máximo em milisegundos em que uma conexão pode ficar ativa no pool
                      antes de ser liberada  */
      
    }
    
}