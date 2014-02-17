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

    var campoNomeMusica = $('[name=nomeMusica]').focus();
    var campoNomeArquivoMusica = $('[name=nomeArquivoMusica]');
    var campoNomaArquivoCapaAlbum = $('[name=nomeArquivoCapaAlbum]');

    // eventos

    var verificarErrosDoCampoNomeMusica = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        return haErro;
    };

    var verificarErrosDoCampoNomeArquivoMusica = function (e) {
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

    var verificarErrosDoCampoNomeArquivoCapaAlbum = function (e) {
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

    campoNomeMusica.on('keyup', verificarErrosDoCampoNomeMusica);
    campoNomeArquivoMusica.on('keyup', verificarErrosDoCampoNomeArquivoMusica);
    campoNomaArquivoCapaAlbum.on('keyup', verificarErrosDoCampoNomeArquivoCapaAlbum);

    // disparar verificação de validação de campos no submit do form

    $("#formMusicas").on('submit', function (e) {
        var haErros = false;

        //haErros = verificarErrosDoCampoNomeMusica({ currentTarget: campoNomeMusica });
        //if (haErros) { verificarErrosDoCampoNomeArquivoMusica({ currentTarget: campoNomeArquivoMusica }); } else { haErros = verificarErrosDoCampoSite({ currentTarget: campoNomeArquivoMusica }); }
        //if (haErros) { verificarErrosDoCampoNomeArquivoCapaAlbum({ currentTarget: campoNomaArquivoCapaAlbum }); } else { haErros = verificarErrosDoCampoEmail({ currentTarget: campoNomaArquivoCapaAlbum }); }

        if (haErros) {
            $('[name=nomeMusica]').each(function (i, obj) {
                var _this = $(obj);
                verificarErrosDoCampoNomeMusica({ currentTarget: _this });
            });
        } else {
            $('[name=nomeMusica]').each(function (i, obj) {
                var _this = $(obj);
                haErros = verificarErrosDoCampoNomeMusica({ currentTarget: _this });
            });
        }

        if (haErros) {
            $('[name=nomeArquivoMusica]').each(function (i, obj) {
                var _this = $(obj);
                verificarErrosDoCampoNomeArquivoMusica({ currentTarget: _this });
            });
        } else {
            $('[name=nomeArquivoMusica]').each(function (i, obj) {
                var _this = $(obj);
                haErros = verificarErrosDoCampoNomeArquivoMusica({ currentTarget: _this });
            });
        }

        if (haErros) {
            $('[name=nomeArquivoCapaAlbum]').each(function (i, obj) {
                var _this = $(obj);
                verificarErrosDoCampoNomeArquivoCapaAlbum({ currentTarget: _this });
            });
        } else {
            $('[name=nomeArquivoCapaAlbum]').each(function (i, obj) {
                var _this = $(obj);
                haErros = verificarErrosDoCampoNomeArquivoCapaAlbum({ currentTarget: _this });
            });
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

    $(document).on('click', '.adicionarMusica', function (e) {
        var _this = $(e.currentTarget);
        var controle = _this.parent().parent();
        var clone = controle.clone();
        //clone.addClass('offset3');
        clone.children('label').text('');
        //clone.find('.error').remove();
        var inputs = clone.find('input');
        //inputs.val('');
        inputs.removeAttr('value');
        inputs.filter('[name=nomeMusica]').on('keyup', verificarErrosDoCampoNomeMusica);
        inputs.filter('[name=nomeArquivoMusica]').on('keyup', verificarErrosDoCampoNomeArquivoMusica);
        inputs.filter('[name=nomeArquivoCapaAlbum]').on('keyup', verificarErrosDoCampoNomeArquivoCapaAlbum);

        var controleDeRemocaoExiste = clone.find('.btn-controls').find('.removerMusica').length;

        if (!controleDeRemocaoExiste) {
            var controleDeRemocao = $('<a class="btn removerMusica" href="#"><span class="icon-minus"></span></a>');
            clone.find('.btn-controls').append(controleDeRemocao);
        }

        clone.insertAfter(controle);
        inputs.first().focus();
    });

    $(document).on('click', '.removerMusica', function (e) {
        var _this = $(e.currentTarget);
        _this.parent().parent().remove();
    });

    $(document).on('click', '.adicionarSocial', function (e) {
        var _this = $(e.currentTarget);
        var controle = _this.parent().parent();
        var clone = controle.clone();
        clone.addClass('offset3');
        clone.children('label').remove();
        //clone.find('.error').remove();
        var select = clone.find('select');
        select.children(':selected').removeAttr('selected');
        var input = clone.find('input');
        input.val('');
        input.on('keyup', verificarErrosDoCampoRedeSocial);

        var controleDeRemocaoExiste = clone.find('.btn-controls').find('.removerSocial').length;

        if (!controleDeRemocaoExiste) {
            var controleDeRemocao = $('<a class="btn removerSocial" href="#"><span class="icon-minus"></span></a>');
            clone.find('.btn-controls').append(controleDeRemocao);
        }

        clone.insertAfter(controle);
        select.focus();
    });

    $(document).on('click', '.removerSocial', function (e) {
        var _this = $(e.currentTarget);
        _this.parent().parent().remove();
    });
});