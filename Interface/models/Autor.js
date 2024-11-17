const database = require('../services/database');

module.exports = {
    create: function(data){
        const current_date = (new Date()).toISOString().split('T')[0];
        let sql = "insert into Autor(nome, pais_nascimento, data_nascimento, criado_em) values(";
        data.forEach((item, key) => {
            sql += `'${item}'`;

            if(key < data.length - 1) {
                sql += ",";
            }
        });
        sql += `,'${current_date}');`;

        database.connection.query(sql, function(err){
            if(err) throw err;
            console.log("Autor criado!\n");
        });
    },
    selectAll: function(){
        const sql = "select * from Autor";
        return new Promise((resolve, reject) => {
            database.connection.query(sql, function(err, result){
                if(err){
                    return reject(err);
                }
    
                resolve(result);
            });
        });
    },
    selectOne: function(id){
        const sql = `select * from Autor where id=${id}`;

        return new Promise((resolve, reject) => {
            database.connection.query(sql, function(err, result) {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    },
    update: function(id, data) {
        let sql = "update Autor set ";
        const last_key = Object.keys(data)[Object.keys(data).length - 1];

        Object.keys(data).forEach(function(key){
            sql += `${key}='${data[key]}'`;
            if(last_key !== key) {
                sql += ',';
            }
        });

        sql += ` where id=${id}`;

        database.connection.query(sql, function(err, result){
            if(err) throw err;

            console.log(`${result.affectedRows} registros alterados.`);
        });
    },
    delete: function(id) {
        let sql = `delete from Autor where id=${id}`;

        database.connection.query(sql, function(err, result){
            if(err) throw err;

            console.log(`${result.affectedRows} registros excluídos.`);
        });
    },
    getLivros: async function(autor_id) {
        let sql = `select * from autor_livro where id_autor='${autor_id}'`;
        const books = await new Promise((resolve, reject) => {
            database.connection.query(sql, function(err, result){
                if(err){
                    return reject(err);
                }
    
                resolve(result);
            });
        });
        let books_id_list = "(";
        books.forEach((book, key) => {
            books_id_list += `${book.isbn_livro}`;

            if(key < books.length - 1)
                books_id_list += ",";
        });
        
        books_id_list += ")";

        sql = `select * from livro where isbn in ${books_id_list}`;
        
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