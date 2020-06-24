import knex from 'knex'
import path from 'path'

const connection = knex({ //Configurando a conexão do banco de dados
    client: 'sqlite3',  
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
})

export default connection;