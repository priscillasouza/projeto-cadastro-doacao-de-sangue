// configuração do servidor
const express = require("express")
const server2 = express()

// configurando servidor para apresentar arquivos estaticos
server2.use(express.static('public'))

// habilitando body do formulário
server2.use(express.urlencoded({extended: true}))

// conectando ao postgresql
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '2205',
    host: 'localhost',
    port: 5432,
    database: 'doacao'
})

// configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server2,
    noCache: true,  
})

// lista de doadores: Array
const donors = [
    {
        name: "Priscilla",
        blood: "AB+",
    },
    {
        name: "Paty Souza",
        blood: "B+",
    },
    {
        name: "Hugo Souza",
        blood: "A+",
    },
    {
        name: "Maria Silva",
        blood: "O+",
    },
]

// configurando a apresentação da página
server2.get("/", function(req, res) {
    db.query("SELECT * FROM donors", function(err, result){
        if(err) return res.send("Erro de banco de dados")

        const donors = result.rows
        return res.render("index.html", { donors})
    })
})

server2.post("/", function(req, res) {
    //pegando os dados do formulário
    const nome = req.body.nome
    const email = req.body.email
    const blood = req.body.blood


    if(nome == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios")
    }

    const query = `
    INSERT INTO donors ("nome", "email", "blood")
    VALUES ($1, $2, $3)`

    const values = [nome, email, blood]

    db.query(query, values, function(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/")
    })
    // colocando valores dentro do Array
   
})

// ligar o servidor e permitir o acesso na porta 3000
server2.listen(3000, function() {
   console.log("Iniciei o servidor")  
})   