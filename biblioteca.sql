create database biblioteca;

use biblioteca;

create table Categoria (
	id int not null auto_increment,
	nome varchar(255),
    criado_em timestamp,
    primary key(id)
);

create table Livro (
	isbn varchar(255) not null,
    titulo varchar(255) not null,
    lancamento timestamp not null,
    pais_publicacao varchar(255) not null,
    estoque tinyint unsigned not null default 0,
    criado_em timestamp,
    primary key (isbn)
);

create table Livro_Categoria(
	id int auto_increment not null,
    id_categoria int not null,
    isbn_livro varchar(255) not null,
    criado_em timestamp,
    primary key (id),
    constraint FK_LivroCategoria_Categoria foreign key (id_categoria) references Categoria(id),
    constraint FK_LivroCategoria_Livro foreign key (isbn_livro) references Livro(isbn)
);

create table Autor(
	id int auto_increment not null,
    nome varchar(255) not null,
    pais_nascimento varchar(2),
    data_nascimento timestamp,
    criado_em timestamp,
    primary key (id)
);

create table Autor_Livro(
	id int not null auto_increment,
    id_autor int not null,
    isbn_livro varchar(255) not null,
    constraint FK_LivroAutor_livro foreign key (isbn_livro) references Livro(isbn),
    constraint FK_LivroAutor_autor foreign key (id_autor) references Autor(id),
    primary key(id)
);

create table Membro(
	cpf varchar(255) not null,
    nome varchar(255) not null,
    sobrenome varchar(255) not null,
    data_nascimento timestamp not null,
    logradouro varchar(255) not null,
    numero_casa varchar(6) not null,
    cidade varchar(255) not null,
    estado varchar(2) not null,
    complemento varchar(255),
    criado_em timestamp,
    primary key (cpf)
);

create table Emprestimo (
	id int auto_increment not null,
    data_emprestimo timestamp not null,
    data_devolucao timestamp,
    isbn_livro varchar(255) not null,
    cpf_membro varchar(255) not null,
    constraint FK_EmprestimoLivroMembro_livro foreign key (isbn_livro) references Livro(isbn),
    constraint FK_EmprestimoLivroMembro_membro foreign key (cpf_membro) references Membro(cpf),
    primary key (id)
);

create table Funcionario (
	cpf_membro varchar(255) not null,
    numero_ctps varchar(255) not null unique,
    data_admissao timestamp not null,
    data_demissao timestamp,
    primary key (cpf_membro),
    constraint FK_MembroFuncionario foreign key (cpf_membro) references Membro(cpf)
);