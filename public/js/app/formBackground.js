$(function () {
    // validações

    var gerarErroMinlength = function (e, minlength) {
        var haErros = false;
        var campo = $(e.currentTarget);

        if (campo.val() !== '' && campo.val().length < minlength) {
            haErros = true;
            campo.addClass('error');
            campo.siblings('.error').hide();
            campo.siblings().filter('.errorMinlength').show();
        } else {
            campo.removeClass('error');
            campo.siblings().filter('.errorMinlength').hide();
        }

        return haErros;
    };

    var gerarErroNomeArquivo = function (e) {
        var haErros = false;
        var campo = $(e.currentTarget);

        var regexp = /[a-zA-Z0-9\.\-\_]{1,}\.{1}[a-zA-Z0-9\.\-\_]{1,4}$/;

        if (campo.val() !== '' && !regexp.test(campo.val())) {
            haErros = true;
            campo.addClass('error');
            campo.siblings('.error').hide();
            campo.siblings().filter('.errorNomeArquivo').show();
        } else {
            campo.removeClass('error');
            campo.siblings().filter('.errorNomeArquivo').hide();
        }

        return haErros;
    };

    // campos 

    var campoCorDeFundo = $('[name=corFundo]');
    var campoImagemBackground = $('[name=imagemBackground]');

    // eventos

    var verificarErrosDoCampoImagemBackground = function (e) {
        var haErro = false;
        //haErro = gerarErroRequired(e);

        //if (!haErro) {
        haErro = gerarErroMinlength(e, 5);
        //}

        if (!haErro) {
            haErro = gerarErroNomeArquivo(e);
        }

        return haErro;
    };

    var habilitarBotaoSalvar = function (e) {
        var _this = $(e.currentTarget);
        var botaoSalvarDoForm = _this.closest('form').find('[type=submit]');
        botaoSalvarDoForm.attr('disabled', false);
    };

    // bind de eventos

    campoCorDeFundo.on('change', habilitarBotaoSalvar);
    campoImagemBackground.on('keyup', habilitarBotaoSalvar);
    campoImagemBackground.on('keyup', verificarErrosDoCampoImagemBackground);

    // disparar verificação de validação de campos no submit do form

    $("#formBackground").on('submit', function (e) {
        var haErros = false;

        haErros = verificarErrosDoCampoImagemBackground({ currentTarget: campoImagemBackground });

        var haAlgumaMensagemDeErroSendoExposta = $(e.currentTarget).find('.error:visible').length;

        if (!haErros && haAlgumaMensagemDeErroSendoExposta) {
            haErros = true;
        }

        if (haErros) {
            e.preventDefault();
        }
    });
});