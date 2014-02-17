var express = require('express'),
    engine = require('ejs-locals'),
    http = require('http'),
    path = require('path'),
    autenticacaoRequerida = require('./app/infra/autenticacao').autenticacaoRequerida,
    hash = require('./app/infra/pass').hash,
    home = require('./routes/home'),
    contato = require('./routes/contato'),
    login = require('./routes/login'),
    admin = require('./routes/admin'),
    usuario = require('./routes/usuario'),
    pagina = require('./routes/pagina'),
    portfolio = require('./routes/portfolio'),
    foto = require('./routes/foto'),
    video = require('./routes/video'),
    artista = require('./routes/artista'),
    servico = require('./routes/servico'),
    radio = require('./routes/radio');

var app = express();

app.configure(function () {
    app.engine('ejs', engine);
    app.set('port', process.env.PORT || 3000);

    // LOGIN
    app.use(express.cookieParser('Authentication Tutorial '));
    app.use(express.session());

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.locals({ _layoutFile: true });
    app.use(express.favicon());
    //app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// routes

app.get('/', home.index);
app.get('/login', login.index);
app.get('/logout', login.logoff);
app.get('/admin', autenticacaoRequerida, admin.index);
app.get('/admin/perfil', autenticacaoRequerida, usuario.index);
app.get('/admin/usuario/alterar/:id', autenticacaoRequerida, usuario.editar);
app.get('/admin/paginas', autenticacaoRequerida, pagina.index);
app.get('/admin/pagina/alterar/:id', autenticacaoRequerida, pagina.editar);
app.get('/admin/portfolio', autenticacaoRequerida, portfolio.index);
app.get('/admin/portfolio/novo', autenticacaoRequerida, portfolio.novo);
app.get('/admin/portfolio/alterar/:id', autenticacaoRequerida, portfolio.editar);
app.get('/admin/fotos', autenticacaoRequerida, foto.index);
app.get('/admin/foto/alterar/:id', autenticacaoRequerida, foto.editar);
app.get('/admin/foto/nova', autenticacaoRequerida, foto.nova);
app.get('/admin/videos', autenticacaoRequerida, video.index);
app.get('/admin/video/novo', autenticacaoRequerida, video.novo);
app.get('/admin/artistas', autenticacaoRequerida, artista.index);
app.get('/admin/artista/novo', autenticacaoRequerida, artista.novo);
app.get('/admin/artista/alterar/:id', autenticacaoRequerida, artista.editar);
app.get('/artista/:id', artista.exibir);
app.get('/admin/servico/novo', autenticacaoRequerida, servico.novo);
app.get('/admin/servico/alterar/:id', autenticacaoRequerida, servico.editar);
app.get('/admin/servicos', autenticacaoRequerida, servico.index);
app.get('/admin/radio', autenticacaoRequerida, radio.index);

// actions

app.post('/contato/enviarEmail', contato.enviarEmail);
app.post('/login', login.logon);
app.post('/admin/usuario/alterar/dados-pessoais', autenticacaoRequerida, usuario.alterarDadosPessoais);
app.post('/admin/pagina/alterar', autenticacaoRequerida, pagina.alterar);
app.post('/admin/foto/nova', autenticacaoRequerida, foto.incluir);
app.post('/admin/foto/alterar', autenticacaoRequerida, foto.alterar);
app.get('/admin/foto/excluir/:id', autenticacaoRequerida, foto.excluir);
app.post('/admin/video/novo', autenticacaoRequerida, video.incluir);
app.get('/admin/video/excluir/:id', autenticacaoRequerida, video.excluir);
app.post('/admin/artista/novo', autenticacaoRequerida, artista.incluir);
app.post('/admin/artista/alterar/dados-pessoais', autenticacaoRequerida, artista.alterarDadosPessoais);
app.post('/admin/artista/alterar/musicas', autenticacaoRequerida, artista.alterarMusicas);
app.post('/admin/artista/alterar/imagem-perfil', autenticacaoRequerida, artista.alterarImagemPerfil);
app.post('/admin/artista/alterar/background', autenticacaoRequerida, artista.alterarBackground);
app.get('/admin/artista/excluir/:id', autenticacaoRequerida, artista.excluir);
app.post('/admin/portfolio/novo', autenticacaoRequerida, portfolio.incluir);
app.post('/admin/portfolio/alterar', autenticacaoRequerida, portfolio.alterar);
app.get('/admin/portfolio/excluir/:id', autenticacaoRequerida, portfolio.excluir);
app.post('/admin/servico/novo', autenticacaoRequerida, servico.incluir);
app.post('/admin/servico/alterar', autenticacaoRequerida, servico.alterar);
app.get('/admin/servico/excluir/:id', autenticacaoRequerida, servico.excluir);
app.post('/admin/radio/alterar', autenticacaoRequerida, radio.alterar);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
