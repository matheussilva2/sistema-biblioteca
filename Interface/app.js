const readline = require('node:readline');
const Membro = require('./models/Membro');
const Emprestimo = require('./models/Emprestimo');
const Categoria = require('./models/Categoria');
const Livro = require('./models/Livro');
const Autor = require('./models/Autor');
const Funcionario = require('./models/Funcionario');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

function membros() {
    console.log(`
---- Membros ----
1 - Todos os membros
2 - Membro por CPF
3 - Novo Membro
4 - Atualizar Membro
5 - Apagar Membro
    `);
    
    rl.question("> ", async(option) => {
        option = Number.parseInt(option);
        switch (option) {
            case 1:
                console.log(await Membro.selectAll());
                break;
            case 2:
                rl.question("CPF do membro: ", async(cpf) => {
                    console.log(await Membro.selectOne(Number.parseInt(cpf)));
                });
                break;
            case 3:
                cpf = await prompt("CPF: ");
                nome = await prompt("Nome: ");
                sobrenome = await prompt("Sobrenome: ");
                data_nascimento = await prompt("Data de Nascimento(YYYY-MM-DD): ");
                logradouro = await prompt("Logradouro: ");
                numero_casa = await prompt("Número da casa: ");
                cidade = await prompt("Cidade: ");
                estado = await prompt("Estado (Sigla): ");
                complemento = await prompt("Complemento: ");

                Membro.create([
                    cpf,
                    nome,
                    sobrenome,
                    data_nascimento,
                    logradouro,
                    numero_casa,
                    cidade,
                    estado,
                    complemento
                ]);
                break;
            case 4:
                cpf = await prompt("CPF: ");
                nome = await prompt("Nome: ");
                sobrenome = await prompt("Sobrenome: ");
                data_nascimento = await prompt("Data de Nascimento(YYYY-MM-DD): ");
                logradouro = await prompt("Logradouro: ");
                numero_casa = await prompt("Número da casa: ");
                cidade = await prompt("Cidade: ");
                estado = await prompt("Estado (Sigla): ");
                complemento = await prompt("Complemento: ");

                Membro.update(cpf, {
                    nome,
                    sobrenome,
                    data_nascimento,
                    logradouro,
                    numero_casa,
                    cidade,
                    estado,
                    complemento
                });
                break;
            case 5:
                cpf = await prompt("CPF: ");
                Membro.delete(cpf);
                break;
            default:
                break;
        }
    });
    mainMenu();
}

function funcionarios() {
    console.log(`
---- Funcionários ----
1 - Todos os Funcionários
2 - Funcionário por CPF
3 - Novo Funcionário
4 - Atualizar Funcionário
5 - Apagar Funcionário
    `);
    
    rl.question("> ", async(option) => {
        option = Number.parseInt(option);
        switch (option) {
            case 1:
                console.log(await Funcionario.selectAll());
                break;
            case 2:
                rl.question("CPF do funcionário: ", async(cpf) => {
                    console.log(await Funcionario.selectOne(Number.parseInt(cpf)));
                });
                break;
            case 3:
                cpf = await prompt("CPF do membro: ");
                ctps = await prompt("Número CTPS: ");

                Membro.create([
                    cpf,
                    ctps
                ]);
                break;
            case 4:
                cpf = await prompt("CPF: ");
                ctps = await prompt("Número CTPS: ");

                Membro.update(cpf, {
                    ctps
                });
                break;
            case 5:
                cpf = await prompt("CPF: ");
                Membro.delete(cpf);
                break;
            default:
                break;
        }
    });
    mainMenu();
}

function emprestimos() {
    console.log(`
---- Empréstimos ----
1 - Todos os Empréstimos
2 - Empréstimos por CPF
3 - Novo Empréstimo
4 - Atualizar Empréstimo
5 - Apagar Empréstimo
    `);
    
    rl.question("> ", async(option) => {
        option = Number.parseInt(option);
        switch (option) {
            case 1:
                console.log(await Emprestimo.selectAll());
                break;
            case 2:
                rl.question("ID do empréstimo: ", async(id) => {
                    console.log(await Emprestimo.selectOne(Number.parseInt(id)));
                });
                break;
            case 3:
                cpf = await prompt("CPF do membro: ");
                isbn = await prompt("ISBN do livro: ");

                Emprestimo.create([
                    isbn,
                    cpf
                ]);
                break;
            case 4:
                id = await prompt("ID do empréstimo: ");
                cpf = await prompt("CPF do membro: ");
                isbn = await prompt("ISBN do livro: ");

                Emprestimo.update(id, {
                    isbn,
                    cpf
                });
                break;
            case 5:
                id = await prompt("ID do emprésitmo: ");
                Emprestimo.delete(id);
                break;
            default:
                break;
        }
    });
    mainMenu();
}

function livros() {
    console.log(`
---- Empréstimos ----
1 - Todos os Livros
2 - Livros por ISBN
3 - Novo Livro
4 - Atualizar Livro
5 - Apagar Livro
6 - Listar categorias do livro
    `);
    
    rl.question("> ", async(option) => {
        option = Number.parseInt(option);
        switch (option) {
            case 1:
                console.log(await Livro.selectAll());
                break;
            case 2:
                rl.question("ISBN: ", async(isbn) => {
                    console.log(await Livro.selectOne(Number.parseInt(isbn)));
                });
                break;
            case 3:
                isbn = await prompt("ISBN do livro: ");
                titulo = await prompt("Título do livro: ");
                lancamento = await prompt("Lançamento do livro(YYYY-MM-DD): ");
                pais_publicacao = await prompt("País de publicação do livro(Sigla): ");
                estoque = await prompt("Estoque: ");

                Livro.create([
                    isbn, titulo, lancamento, pais_publicacao, estoque
                ]);
                break;
            case 4:
                isbn = await prompt("ISBN do livro: ");
                titulo = await prompt("Título do livro: ");
                lancamento = await prompt("Lançamento do livro(YYYY-MM-DD): ");
                pais_publicacao = await prompt("País de publicação do livro(Sigla): ");
                estoque = await prompt("Estoque: ");

                Livro.update(isbn, {
                    titulo, lancamento, pais_publicacao, estoque
                });
                break;
            case 5:
                isbn = await prompt("ISBN: ");
                Livro.delete(isbn);
                break;
            case 6:
                isbn = await prompt("ISBN: ");
                categorias = await Livro.getCategorias(isbn);
                console.log(categorias);
            default:
                break;
        }
    });
    mainMenu();
}

function categorias() {
    console.log(`
---- Empréstimos ----
1 - Todas as Categorias
2 - Categoria por ID
3 - Nova Categoria
4 - Atualizar Categoria
5 - Apagar Categoria
    `);
    
    rl.question("> ", async(option) => {
        option = Number.parseInt(option);
        switch (option) {
            case 1:
                console.log(await Categoria.selectAll());
                break;
            case 2:
                rl.question("ID da categoria: ", async(id) => {
                    console.log(await Categoria.selectOne(Number.parseInt(id)));
                });
                break;
            case 3:
                let name = await prompt("Nome da categoria: ");
                Categoria.create(name);
                break;
            case 4:
                id = await prompt("ID da categoria: ");
                name = await prompt("Novo nome da categoria: ");

                Categoria.update(id, {
                    name
                });
                break;
            case 5:
                id = await prompt("ID da categoria: ");
                Categoria.delete(id);
                break;
            default:
                break;
        }
    });
    mainMenu();
}

function autores() {
    console.log(`
---- Empréstimos ----
1 - Todos os Autores
2 - Autor por ID
3 - Novo Autor
4 - Atualizar Autor
5 - Apagar Autor
    `);
    
    rl.question("> ", async(option) => {
        option = Number.parseInt(option);
        switch (option) {
            case 1:
                console.log(await Autor.selectAll());
                break;
            case 2:
                rl.question("ID da autora: ", async(id) => {
                    console.log(await Autor.selectOne(Number.parseInt(id)));
                });
                break;
            case 3:
                let nome = await prompt("Nome da autora: ");
                let pais_nascimento = await prompt("País de nascimento: ");
                let data_nascimento = await prompt("Data de nascimento da autora: ");
                Autor.create([nome, pais_nascimento, data_nascimento]);
                break;
            case 4:
                id = await prompt("ID da autora: ");
                nome = await prompt("Nome do autor: ");
                pais_nascimento = await prompt("País de nascimento: ");
                data_nascimento = await prompt("Data de nascimento da autora: ");
                Autor.update(id, {nome, pais_nascimento, data_nascimento});
                break;
            case 5:
                id = await prompt("ID da autora: ");
                Autor.delete(id);
                break;
            default:
                break;
        }
    });
    mainMenu();
}

function mainMenu() {
    console.log(`
---- Menu ----
1 - Membros
2 - Funcionários
3 - Empréstimo de Livros
4 - Livros
5 - Categorias
6 - Autores
    `);

    rl.question("> ", (option) => {
        option = Number.parseInt(option);
        switch (option) {
            case 1:
                membros();
                break;
            case 2:
                funcionarios();
                break;
            case 3:
                emprestimos();
                break;
            case 4:
                livros();
                break;
            case 5:
                categorias();
                break;
            case 6:
                autores();
                break;
            default:
                break;
        }
    });
}

mainMenu();