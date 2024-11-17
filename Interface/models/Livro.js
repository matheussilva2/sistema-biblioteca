const database = require('../services/database');

module.exports = {
    create: function(data){
        const current_date = (new Date()).toISOString().split('T')[0];
        let sql = "insert into Livro(isbn, titulo, lancamento, pais_publicacao, estoque, criado_em) values(";
        data.forEach((item, key) => {
            sql += `'${item}'`;

            if(key < data.length - 1) {
                sql += ",";
            }
        });
        sql += `,'${current_date}');`;

        database.connection.query(sql, function(err){
            if(err) throw err;
            console.log("Livro criado!\n");
        });
    },
    selectAll: function(){
        const sql = "select * from Livro";
        return new Promise((resolve, reject) => {
            database.connection.query(sql, function(err, result){
                if(err){
                    return reject(err);
                }
    
                resolve(result);
            });
        });
    },
    selectOne: function(isbn){
        const sql = `select * from Livro where isbn=${isbn}`;

        return new Promise((resolve, reject) => {
            database.connection.query(sql, function(err, result) {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    },
    update: function(isbn, data) {
        let sql = "update Livro set ";
        const last_key = Object.keys(data)[Object.keys(data).length - 1];

        Object.keys(data).forEach(function(key){
            sql += `${key}='${data[key]}'`;
            if(last_key !== key) {
                sql += ',';
            }
        });

        sql += ` where isbn=${isbn}`;

        database.connection.query(sql, function(err, result){
            if(err) throw err;

            console.log(`${result.affectedRows} registros alterados.`);
        });
    },
    delete: function(isbn) {
        let sql = `delete from Livro where isbn=${isbn}`;

        database.connection.query(sql, function(err, result){
            if(err) throw err;

            console.log(`${result.affectedRows} registros excluídos.`);
        });
    },
    getCategorias: async function(isbn_livro) {
        let sql = `select * from livro_categoria where isbn_livro=${isbn_livro}`;
        const categories = await new Promise((resolve, reject) => {
            database.connection.query(sql, function(err, result){
                if(err){
                    return reject(err);
                }
    
                resolve(result);
            });
        });

        let categories_id_list = "(";
        categories.forEach((category, key) => {
            categories_id_list += `${category.id_categoria}`;

            if(key < categories.length - 1)
                categories_id_list += ",";
        });
        categories_id_list += ")";

        sql = `select * from categoria where id in ${categories_id_list}`;
        
        return new Promise((resolve, reject) => {
            database.connection.query(sql, function(err, result) {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    }
};