$(function () {

    $('.autogrow').autogrow();

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

    var gerarErroMaxlength = function (e, maxLength) {
        var haErros = false;
        var campo = $(e.currentTarget);
        debugger;
        if (campo.val() !== '' && campo.val().length > maxLength) {
            haErros = true;
            campo.addClass('error');
            campo.siblings('.error').hide();
            campo.siblings().filter('.errorMaxlength').show();
        } else {
            campo.removeClass('error');
            campo.siblings().filter('.errorMaxlength').hide();
        }

        return haErros;
    };

    // campos

    var campoTitulo = $('[name=titulo]').focus();
    var campoSubtitulo = $('[name=subtitulo]');
    var campoParagrafo = $('[name=paragrafo]');

    // eventos

    var verificarErrosDoCampoTitulo = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        if (!haErro) {
            haErro = gerarErroMaxlength(e, 40);
        }

        return haErro;
    };

    var verificarErrosDoCampoSubtitulo = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        if (!haErro) {
            haErro = gerarErroMaxlength(e, 120);
        }

        return haErro;
    };

    var verificarErrosDoCampoParagrafo = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        if (!haErro) {
            haErro = gerarErroMinlength(e, 2);
        }

        if (!haErro) {
            haErro = gerarErroMaxlength(e, 500);
        }

        return haErro;
    };

    // Bind de eventos

    campoTitulo.on('keyup', verificarErrosDoCampoTitulo);
    campoSubtitulo.on('keyup', verificarErrosDoCampoSubtitulo);
    campoParagrafo.on('keyup', verificarErrosDoCampoParagrafo);

    // disparar verificação de validação de campos no submit do form

    $("#formAlterarPagina").on('submit', function (e) {
        var haErros = false;

        if (campoTitulo.length) {
            haErros = verificarErrosDoCampoTitulo({ currentTarget: campoTitulo });
        }

        if (campoSubtitulo.length) {
            if (haErros) { verificarErrosDoCampoSubtitulo({ currentTarget: campoSubtitulo }); } else { haErros = verificarErrosDoCampoSubtitulo({ currentTarget: campoSubtitulo }); }
        }

        if (campoParagrafo.length) {
            if (haErros) {
                $('[name=paragrafo]').each(function (i, obj) {
                    var _this = $(obj);
                    verificarErrosDoCampoParagrafo({ currentTarget: _this });
                });
            } else {
                $('[name=paragrafo]').each(function (i, obj) {
                    var _this = $(obj);
                    haErros = verificarErrosDoCampoParagrafo({ currentTarget: _this });
                });
            }
        }

        var haAlgumaMensagemDeErroSendoExposta = $(e.currentTarget).find('.error:visible').length;

        if (!haErros && haAlgumaMensagemDeErroSendoExposta) {
            haErros = true;
        }

        if (haErros) {
            e.preventDefault();
        }
    });

    // Comportamento dos botões para dicionar controles

    $(document).on('click', '.adicionarParagrafo', function (e) {
        var _this = $(e.currentTarget);
        var controle = _this.parent().parent();
        var clone = controle.clone();
        //clone.addClass('offset3');
        //clone.children('label').remove();
        clone.children('label').text('');
        clone.find('label.error').hide();
        var textarea = clone.find('textarea');
        textarea.removeAttr('style');
        textarea.val('');
        textarea.on('keyup', verificarErrosDoCampoParagrafo);

        var controleDeRemocaoExiste = clone.find('.btn-controls').find('.removerParagrafo').length;

        if (!controleDeRemocaoExiste) {
            var controleDeRemocao = $('<a class="btn removerParagrafo" href="#"><span class="icon-minus"></span></a>');
            clone.find('.btn-controls').append(controleDeRemocao);
        }

        clone.insertAfter(controle);
        textarea.focus();
        textarea.autogrow();
    });

    $(document).on('click', '.removerParagrafo', function (e) {
        var _this = $(e.currentTarget);
        _this.parent().parent().remove();
    });
});