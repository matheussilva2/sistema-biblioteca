const database = require('../services/database');

module.exports = {
    create: function(data){
        const current_date = (new Date()).toISOString().split('T')[0];
        let sql = "insert into Membro(cpf, nome, sobrenome, data_nascimento, logradouro, numero_casa, cidade, estado, complemento, criado_em) values(";
        data.forEach((item, key) => {
            sql += `'${item}'`;

            if(key < data.length - 1) {
                sql += ",";
            }
        });
        sql += `,'${current_date}');`;

        database.connection.query(sql, function(err){
            if(err) throw err;
            console.log("Membro criado!\n");
        });
    },
    selectAll: function(){
        const sql = "select * from Membro";
        return new Promise((resolve, reject) => {
            database.connection.query(sql, function(err, result){
                if(err){
                    return reject(err);
                }
    
                resolve(result);
            });
        });
    },
    selectOne: function(cpf){
        const sql = `select * from Membro where cpf='${cpf}'`;

        return new Promise((resolve, reject) => {
            database.connection.query(sql, function(err, result) {
                if(err) {
                    return reject(err);
                }

                resolve(result);
            });
        });
    },
    update: function(cpf, data) {
        let sql = "update Membro set ";
        const last_key = Object.keys(data)[Object.keys(data).length - 1];

        Object.keys(data).forEach(function(key){
            sql += `${key}='${data[key]}'`;
            if(last_key !== key) {
                sql += ',';
            }
        });

        sql += ` where cpf='${cpf}'`;

        database.connection.query(sql, function(err, result){
            if(err) throw err;

            console.log(`${result.affectedRows} registros alterados.`);
        });
    },
    delete: function(cpf) {
        let sql = `delete from Membro where cpf='${cpf}'`;

        database.connection.query(sql, function(err, result){
            if(err) throw err;

            console.log(`${result.affectedRows} registros excluídos.`);
        });
    }
};