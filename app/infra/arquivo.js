var fileSystem = require("fs");

exports.criar = function (path, nomeArquivo, conteudo, recriar) {
    var arquivos = fileSystem.readdirSync(path);

    if (arquivos) {
        var arquivoJahExiste = false;

        for (var i = 0; i < arquivos.length; i++) {
            //console.log('Encontrado: ' + files[i] + '; Procurado: ' + nomeArquivo);
            if (arquivos[i] === nomeArquivo) {
                arquivoJahExiste = true;
                //console.log('XML já existe!');
            }
        }

        if (!arquivoJahExiste || recriar) {
            try {
                console.log('LOG # arquivo.js: criando arquivo');
                fileSystem.writeFileSync(path + nomeArquivo, conteudo);
                console.log('LOG # arquivo.js: arquivo criado!');
            } catch (e) {
                console.log(e);
            }
        }
    } else {
        console.log('arquivo.js: Arquivo \'' + nomeArquivo + '\' não encontrado.');
    }
};

exports.obterDados = function (path, nomeArquivo) {
    var resultado = fileSystem.readFileSync(path + nomeArquivo);
    return resultado.toString('utf8');
};