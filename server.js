const express = require('express')

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware para analisar dados do formulário

// Rota para servir arquivos estáticos da pasta 'public'
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//Rota RAÍZ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); //enviando como resposta o html
    // res.status(200);
});

//Rota SUGESTÃO
app.get('/sugestao', (req, res) => {
    const nomeCliente = req.query.nome;
    const nomeHamburguer = req.query.nomehamburguer; 
    const ingredientesHamburguer = req.query.ingredientes;  

     const paginaAgradecimento = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8" />
            <title>Sugestão Recebida - DevBurger</title>
            <link rel="stylesheet" href="css/style.css" />
        </head>
        <body>
            <div id="formulario">
                <h1>Obrigado pela sua Sugestão!</h1>
                <h2>Prezado(a) ${nomeCliente},</h2>
                <p>Recebemos sua excelente sugestão para o hambúrguer "${nomeHamburguer}" com os ingredientes: "${ingredientesHamburguer}".</p>
                <p>Nossa equipe da DevBurger irá analisar com carinho!</p>
                <p><a href="/">Voltar para a página inicial</a></p>
            </div>
        </body>
        </html>
    `;

    // Envia a string HTML como resposta
    res.send(paginaAgradecimento);
    // res.status(200);
});

//Rota CONTATOS GET
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html')); //enviando como resposta o html
    // res.status(200);
});

//Rota CONTATOS POST
app.post('/contato', (req, res) => {
    const{nome, email, assunto, mensagem } = req.body;
    const pageConfContato= `
    <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8" />
            <title>Mensagem Recebida - DevBurger</title>
            <link rel="stylesheet" href="css/style.css" />
        </head>
        <body>
            <div id="formulario">
                <h2>Obrigado pela sua Mensagem!</h2>
                <p>Prezado(a) ${nome},</p>
                <p>Sua mensagem com o assunto *"${assunto}"* foi recebida com sucesso.</p>
                <p>Detalhes da sua mensagem:</p>
                <ul>
                    <li><strong>Nome:</strong> ${nome}</li>
                    <li><strong>E-mail:</strong> ${email}</li>
                    <li><strong>Assunto:</strong> ${assunto}</li>
                    <li><strong>Mensagem:</strong> ${mensagem}</li>
                </ul>
                <p>Em breve entraremos em contato!</p>
                <p style="margin-top: 20px;"><a href="/">Voltar para a página inicial</a></p>
            </div>
        </body>
        </html>
    `;


    res.send(pageConfContato); //envia a str html commo resposta
    // res.status(200);
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});