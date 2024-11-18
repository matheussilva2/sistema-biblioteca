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
                mainMenu();
                break;
            case 2:
                cpf = await prompt("CPF: ");
                console.log(await Membro.selectOne(Number.parseInt(cpf)));
                mainMenu();
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
                mainMenu();
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
                mainMenu();
                break;
            case 5:
                cpf = await prompt("CPF: ");
                Membro.delete(cpf);
                mainMenu();
                break;
            default:
                mainMenu();
                break;
        }
    });
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
                mainMenu();
                break;
            case 2:
                cpf = await prompt("CPF: ");
                console.log(await Funcionario.selectOne(Number.parseInt(cpf)));
                mainMenu();
                break;
            case 3:
                cpf = await prompt("CPF do membro: ");
                ctps = await prompt("Número CTPS: ");

                Funcionario.create([
                    cpf,
                    ctps
                ]);
                mainMenu();
                break;
            case 4:
                cpf = await prompt("CPF: ");
                numero_ctps = await prompt("Número CTPS: ");

                Funcionario.update(cpf, {
                    numero_ctps
                });
                mainMenu();
                break;
            case 5:
                cpf = await prompt("CPF: ");
                Funcionario.delete(cpf);
                mainMenu();
                break;
            default:
                mainMenu();
                break;
        }
    });
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
                mainMenu();
                break;
            case 2:
                id = await prompt("ID do empréstimo: ");
                console.log(await Emprestimo.selectOne(Number.parseInt(id)));
                mainMenu();
                break;
            case 3:
                cpf_membro = await prompt("CPF do membro: ");
                isbn_livro = await prompt("ISBN do livro: ");

                Emprestimo.create([
                    isbn_livro,
                    cpf_membro
                ]);
                mainMenu();
                break;
            case 4:
                id = await prompt("ID do empréstimo: ");
                cpf_membro = await prompt("CPF do membro: ");
                isbn_livro = await prompt("ISBN do livro: ");

                Emprestimo.update(id, {
                    isbn_livro,
                    cpf_membro
                });
                mainMenu();
                break;
            case 5:
                id = await prompt("ID do emprésitmo: ");
                Emprestimo.delete(id);
                mainMenu();
                break;
            default:
                mainMenu();
                break;
        }
    });
}

function livros() {
    console.log(`
---- Livros ----
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
                mainMenu();
                break;
            case 2:
                isbn = await prompt("ISBN: ");
                console.log(await Livro.selectOne(Number.parseInt(isbn)));
                mainMenu();
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
                mainMenu();
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
                mainMenu();
                break;
            case 5:
                isbn = await prompt("ISBN: ");
                Livro.delete(isbn);
                mainMenu();
                break;
            case 6:
                isbn = await prompt("ISBN: ");
                categorias = await Livro.getCategorias(isbn);
                console.log(categorias);
                mainMenu();
                break;
            default:
                mainMenu();
                break;
        }
    });
}

function categorias() {
    console.log(`
---- Categorias ----
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
                mainMenu();
                break;
            case 2:
                id = await prompt("ID da categoria: ");
                console.log(await Categoria.selectOne(Number.parseInt(id)));
                mainMenu();
                break;
            case 3:
                nome = await prompt("Nome da categoria: ");
                Categoria.create(nome);
                mainMenu();
                break;
            case 4:
                id = await prompt("ID da categoria: ");
                nome = await prompt("Novo nome da categoria: ");

                Categoria.update(id, {
                    nome
                });
                mainMenu();
                break;
            case 5:
                id = await prompt("ID da categoria: ");
                Categoria.delete(id);
                mainMenu();
                break;
            default:
                mainMenu();
                break;
        }
    });
}

function autores() {
    console.log(`
---- Autores ----
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
                mainMenu();
                break;
            case 2:
                id = await prompt("ID da autora: ");
                console.log(await Autor.selectOne(Number.parseInt(id)));
                mainMenu();
                break;
            case 3:
                nome = await prompt("Nome da autora: ");
                pais_nascimento = await prompt("País de nascimento: ");
                data_nascimento = await prompt("Data de nascimento da autora: ");
                Autor.create([nome, pais_nascimento, data_nascimento]);
                mainMenu();
                break;
            case 4:
                id = await prompt("ID da autora: ");
                nome = await prompt("Nome do autor: ");
                pais_nascimento = await prompt("País de nascimento: ");
                data_nascimento = await prompt("Data de nascimento da autora: ");
                Autor.update(id, {nome, pais_nascimento, data_nascimento});
                mainMenu();
                break;
            case 5:
                id = await prompt("ID da autora: ");
                Autor.delete(id);
                mainMenu();
                break;
            default:
                mainMenu();
                break;
        }
    });
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