$(function () {
    // validações

    var gerarErroRequired = function (e) {
        var haErros = false;
        var campo = $(e.currentTarget);

        if (campo.val() === '') {
            haErros = true;
            campo.addClass('error');
            campo.siblings('.error').hide();
            campo.siblings().filter('.errorRequired').show();
        } else {
            campo.removeClass('error');
            campo.siblings().filter('.errorRequired').hide();
        }

        return haErros;
    };

    // campos

    var campoDescricao = $('[name=descricao]').focus();

    // eventos

    var verificarErrosDoCampoDescricao = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        return haErro;
    };

    // Bind de eventos

    campoDescricao.on('keyup', verificarErrosDoCampoDescricao);

    // disparar verificação de validação de campos no submit do form

    $("#formNovoServico").on('submit', function (e) {
        var haErros = false;

        haErros = verificarErrosDoCampoDescricao({ currentTarget: campoDescricao });

        var haAlgumaMensagemDeErroSendoExposta = $(e.currentTarget).find('.error:visible').length;

        if (!haErros && haAlgumaMensagemDeErroSendoExposta) {
            haErros = true;
        }

        if (haErros) {
            e.preventDefault();
        }
    });
});