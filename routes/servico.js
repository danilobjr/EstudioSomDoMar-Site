var servicoGerente = require('./../app/gerentes/servicoGerente');

exports.index = function (req, res) {
    var servicos = servicoGerente.obterTodos();
    res.render('servicoIndex', { viewModel: servicos });
};

exports.novo = function (req, res) {
    res.render('servicoNovo');
};

exports.incluir = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };

    try {
        var novoServico = {
            descricao: req.body.descricao,
            secao: req.body.secao
        };

        servicoGerente.incluir(novoServico);

        resultado.sucesso = true;
        resultado.mensagem = 'Serviço/equipamento incluído com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao incluir serviço/equipamento: ' + error;
    }

    var servicos = servicoGerente.obterTodos();

    res.render('servicoIndex', { viewModel: servicos, resultado: resultado });
};

exports.editar = function (req, res) {
    var idServico = req.params.id;
    var servico = servicoGerente.obterPorId(idServico);
    res.render('servicoAlteracao', { viewModel: servico });
};

exports.alterar = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };
    var idServico = req.body.idServico;

    try {
        var servicoAlterado = {
            id: idServico,
            descricao: req.body.descricao
        };

        console.log(servicoAlterado);

        servicoGerente.alterar(servicoAlterado);
        resultado.sucesso = true;
        resultado.mensagem = 'Servico alterado com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao alterar servico: ' + error;
    }

    var servico = servicoGerente.obterPorId(idServico);

    res.render('servicoAlteracao', { viewModel: servico, resultado: resultado });
};

exports.excluir = function (req, res) {
    var resultado = { sucesso: false, mensagem: '' };

    try {
        servicoGerente.excluirPorId(req.params.id);

        resultado.sucesso = true;
        resultado.mensagem = 'Serviço/Equipamento excluído com sucesso';
    } catch (error) {
        resultado.mensagem = 'Erro ao excluir serviço/equipamento: ' + error;
    }

    var servicos = servicoGerente.obterTodos();

    res.render('servicoIndex', { viewModel: servicos, resultado: resultado });
};