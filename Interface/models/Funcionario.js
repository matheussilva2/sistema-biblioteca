const database = require('../services/database');

module.exports = {
    create: function(data){
        const current_date = (new Date()).toISOString().split('T')[0];
        let sql = "insert into Funcionario(cpf_membro, numero_ctps, data_admissao) values(";
        data.forEach((item, key) => {
            sql += `'${item}'`;

            if(key < data.length - 1) {
                sql += ",";
            }
        });
        sql += `,'${current_date}');`;

        database.connection.query(sql, function(err){
            if(err) throw err;
            console.log("Funcionario criado!\n");
        });
    },
    selectAll: function(){
        const sql = "select * from Funcionario";
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
        const sql = `select * from funcionario inner join membro on membro.cpf=funcionario.cpf_membro where cpf='${cpf}'`;

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
        let sql = "update Funcionario set ";
        const last_key = Object.keys(data)[Object.keys(data).length - 1];

        Object.keys(data).forEach(function(key){
            sql += `${key}='${data[key]}'`;
            if(last_key !== key) {
                sql += ',';
            }
        });

        sql += ` where cpf_membro='${cpf}'`;

        database.connection.query(sql, function(err, result){
            if(err) throw err;

            console.log(`${result.affectedRows} registros alterados.`);
        });
    },
    delete: function(cpf) {
        let sql = `delete from Funcionario where cpf_membro='${cpf}'`;

        database.connection.query(sql, function(err, result){
            if(err) throw err;

            console.log(`${result.affectedRows} registros excluídos.`);
        });
    }
};