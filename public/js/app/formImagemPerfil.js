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

        var regexp = /[a-zA-Z0-9\.\-\_]{1,}\.{1}[a-zA-Z0-9\.\-\_]{3,4}/;

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

    var campoImagemPerfil = $('[name=imagemPerfil]');

    // eventos

    var verificarErrosDoCampoImagemPerfil = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        if (!haErro) {
            haErro = gerarErroMinlength(e, 5);
        }

        if (!haErro) {
            haErro = gerarErroNomeArquivo(e);
        }

        return haErro;
    };

    // bind de eventos

    campoImagemPerfil.on('keyup', verificarErrosDoCampoImagemPerfil);

    // disparar verificação de validação de campos no submit do form

    $("#formImagemPerfil").on('submit', function (e) {
        var haErros = false;

        haErros = verificarErrosDoCampoImagemPerfil({ currentTarget: campoImagemPerfil });

        var haAlgumaMensagemDeErroSendoExposta = $(e.currentTarget).find('.error:visible').length;

        if (!haErros && haAlgumaMensagemDeErroSendoExposta) {
            haErros = true;
        }

        if (haErros) {
            e.preventDefault();
        }
    });
});