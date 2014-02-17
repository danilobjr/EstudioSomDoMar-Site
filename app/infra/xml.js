// requires

var builder = require('xmlbuilder'),
    xml2js = require('xml2js'),
    arquivo = require('./../infra/arquivo'),
    util = require('util');

// variáveis

var pathXmlFile = __dirname + '/../repository/',
    xmlFileName = 'dados.xml',
    xmlParser = new xml2js.Parser({ explicitArray: false });

var corrigirJSONContexto = function (contexto) {
    contexto.paginas = contexto.paginas.pagina;

    for (var i = 0; i < contexto.paginas.length; i++) {
        contexto.paginas[i].texto.paragrafos = contexto.paginas[i].texto.paragrafos.paragrafo;
        if (!util.isArray(contexto.paginas[i].texto.paragrafos)) {
            contexto.paginas[i].texto.paragrafos = [contexto.paginas[i].texto.paragrafos];
        }
    }

    contexto.usuario.telefones = contexto.usuario.telefones.telefone;
    contexto.usuario.redesSociais = contexto.usuario.redesSociais.redeSocial;
        
    if (!util.isArray(contexto.usuario.telefones)) {
        contexto.usuario.telefones = [contexto.usuario.telefones];
    }

    if (!util.isArray(contexto.usuario.redesSociais)) {
        contexto.usuario.redesSociais = [contexto.usuario.redesSociais];
    }

    contexto.portfolio = contexto.portfolio.musica;

    if (!util.isArray(contexto.portfolio)) {
        contexto.portfolio = [contexto.portfolio];
    }

    contexto.artistas = contexto.artistas.artista;

    if (!util.isArray(contexto.artistas)) {
        contexto.artistas = [contexto.artistas];
    }

    for (var i = 0; i < contexto.artistas.length; i++) {
        contexto.artistas[i].telefones = contexto.artistas[i].telefones.telefone;
        contexto.artistas[i].redesSociais = contexto.artistas[i].redesSociais.redeSocial;

        if (contexto.artistas[i].musicas) {
            contexto.artistas[i].musicas = contexto.artistas[i].musicas.musica;
        }

        if (!util.isArray(contexto.artistas[i].telefones)) {
            contexto.artistas[i].telefones = [contexto.artistas[i].telefones];
        }

        if (!util.isArray(contexto.artistas[i].redesSociais)) {
            contexto.artistas[i].redesSociais = [contexto.artistas[i].redesSociais];
        }

        if (contexto.artistas[i].musicas && !util.isArray(contexto.artistas[i].musicas)) {
            contexto.artistas[i].musicas = [contexto.artistas[i].musicas];
        }
    }

    contexto.fotos = contexto.fotos.foto;

    if (!util.isArray(contexto.fotos)) {
        contexto.fotos = [contexto.fotos];
    }

    contexto.videos = contexto.videos.video;

    if (!util.isArray(contexto.videos)) {
        contexto.videos = [contexto.videos];
    }

    contexto.servicos = contexto.servicos.servico;

    if (!util.isArray(contexto.servicos)) {
        contexto.servicos = [contexto.servicos];
    }
}

var tornarDadosBrutos = function (dados) {
    var dadosBrutos = dados;

    for (var i = 0; i < dados.paginas.length; i++) {
        dados.paginas[i] = { pagina: dados.paginas[i] };
    }

    for (var i = 0; i < dados.paginas.length; i++) {
        for (var k = 0; k < dados.paginas[i].pagina.texto.paragrafos.length; k++) {
            dados.paginas[i].pagina.texto.paragrafos[k] = { paragrafo: dados.paginas[i].pagina.texto.paragrafos[k] };
        }
    }

    for (var k = 0; k < dados.usuario.telefones.length; k++) {
        dados.usuario.telefones[k] = { telefone: dados.usuario.telefones[k] };
    }

    if (dados.usuario.redesSociais) {
        for (var k = 0; k < dados.usuario.redesSociais.length; k++) {
            dados.usuario.redesSociais[k] = { redeSocial: dados.usuario.redesSociais[k] };
        }
    }

    for (var i = 0; i < dados.artistas.length; i++) {
        dados.artistas[i] = { artista: dados.artistas[i] };
    }

    for (var i = 0; i < dados.artistas.length; i++) {
        for (var k = 0; k < dados.artistas[i].artista.telefones.length; k++) {
            dados.artistas[i].artista.telefones[k] = { telefone: dados.artistas[i].artista.telefones[k] };
        }

        if (dados.artistas[i].artista.redesSociais) {
            for (var k = 0; k < dados.artistas[i].artista.redesSociais.length; k++) {
                dados.artistas[i].artista.redesSociais[k] = { redeSocial: dados.artistas[i].artista.redesSociais[k] };
            }
        }

        if (dados.artistas[i].artista.musicas) {
            for (var k = 0; k < dados.artistas[i].artista.musicas.length; k++) {
                dados.artistas[i].artista.musicas[k] = { musica: dados.artistas[i].artista.musicas[k] };
            }
        }
    }

    for (var i = 0; i < dados.portfolio.length; i++) {
        dados.portfolio[i] = { musica: dados.portfolio[i] };
    }

    for (var i = 0; i < dados.fotos.length; i++) {
        dados.fotos[i] = { foto: dados.fotos[i] };
    }

    for (var i = 0; i < dados.videos.length; i++) {
        dados.videos[i] = { video: dados.videos[i] };
    }

    for (var i = 0; i < dados.servicos.length; i++) {
        dados.servicos[i] = { servico: dados.servicos[i] };
    }

    return dadosBrutos;
}

exports.criar = function (dados, recriar) {
    var xml = builder.create({ contexto: dados });
    arquivo.criar(pathXmlFile, xmlFileName, xml.toString({ pretty: true }), recriar);
};

exports.salvar = function (contexto) {
    var dadosBrutos = tornarDadosBrutos(contexto);
    
    var recriar = true;
    this.criar(dadosBrutos, recriar);
};

exports.obterContexto = function (callback) {
    var contexto = arquivo.obterDados(pathXmlFile, xmlFileName, callback);

    xmlParser.parseString(contexto, function (err, result) {
        contexto = JSON.parse(JSON.stringify(result));
        contexto = contexto.contexto;
    });

    corrigirJSONContexto(contexto);
    
    return contexto;
};