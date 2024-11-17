const database = require('../services/database');

module.exports = {
    create: function(data){
        const current_date = (new Date()).toISOString().split('T')[0];
        let sql = "insert into Emprestimo(isbn_livro, cpf_membro, data_emprestimo) values(";
        data.forEach((item, key) => {
            sql += `'${item}'`;

            if(key < data.length - 1) {
                sql += ",";
            }
        });
        sql += `,'${current_date}');`;

        database.connection.query(sql, function(err){
            if(err) throw err;
            console.log("Empréstimo criado!\n");
        });
    },
    selectAll: function(){
        const sql = "select * from Emprestimo";
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
        const sql = `select * from Emprestimo where id=${id}`;

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
        let sql = "update Emprestimo set ";
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
        let sql = `delete from Emprestimo where id=${id}`;

        database.connection.query(sql, function(err, result){
            if(err) throw err;

            console.log(`${result.affectedRows} registros excluídos.`);
        });
    }
};