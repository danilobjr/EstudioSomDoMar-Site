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

    var gerarErroUrl = function (e, minlength) {
        var haErros = false;
        var campo = $(e.currentTarget);

        var regexp = /((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{2,}(\.[a-z]{2})?(\/[a-z0-9\-\.]{1,})?$/;

        if (campo.val() !== '' && !regexp.test(campo.val())) {
            haErros = true;
            campo.addClass('error');
            campo.siblings('.error').hide();
            campo.siblings().filter('.errorUrl').show();
        } else {
            campo.removeClass('error');
            campo.siblings().filter('.errorUrl').hide();
        }

        return haErros;
    };

    var gerarErroEmail = function (e, minlength) {
        var haErros = false;
        var campo = $(e.currentTarget);

        var regexp = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (campo.val() !== '' && !regexp.test(campo.val())) {
            haErros = true;
            campo.addClass('error');
            campo.siblings('.error').hide();
            campo.siblings().filter('.errorEmail').show();
        } else {
            campo.removeClass('error');
            campo.siblings().filter('.errorEmail').hide();
        }

        return haErros;
    };

    // campos

    var campoNome = $('[name=nome]');
    var campoSobrenome = $('[name=sobrenome]');
    var campoEmail = $('[name=email]');
    var campoPrimeiroTelefone = $('[name=telefone]');
    var campoPrimeiraRedeSocial = $('[name=redeSocial]');

    // configurando máscara

    campoPrimeiroTelefone.setMask();

    // eventos

    var verificarErrosDoCampoTelefone = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        if (!haErro) {
            haErro = gerarErroMinlength(e, 14);
        }

        return haErro;
    };

    var verificarErrosDoCampoNomeESobrenome = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        if (!haErro) {
            haErro = gerarErroMinlength(e, 2);
        }

        return haErro;
    };

    var verificarErrosDoCampoEmail = function (e) {
        var haErro = false;
        haErro = gerarErroRequired(e);

        if (!haErro) {
            haErro = gerarErroMinlength(e, 6);
        }

        if (!haErro) {
            haErro = gerarErroEmail(e);
        }

        return haErro;
    };

    var verificarErrosDoCampoRedeSocial = function (e) {
        var haErro = false;

        haErro = gerarErroMinlength(e, 10);

        //if (!haErro) {
        //    haErro = gerarErroUrl(e);
        //}

        return haErro;
    };

    // Bind de eventos

    campoNome.on('keyup', verificarErrosDoCampoNomeESobrenome);
    campoSobrenome.on('keyup', verificarErrosDoCampoNomeESobrenome);
    campoEmail.on('keyup', verificarErrosDoCampoEmail);
    campoPrimeiroTelefone.on('keyup', verificarErrosDoCampoTelefone);
    campoPrimeiraRedeSocial.on('keyup', verificarErrosDoCampoRedeSocial);

    // disparar verificação de validação de campos no submit do form

    $("#formUsuarioDadosPessoais").on('submit', function (e) {
        var haErros = false;

        haErros = verificarErrosDoCampoNomeESobrenome({ currentTarget: campoNome });
        if (haErros) { verificarErrosDoCampoNomeESobrenome({ currentTarget: campoSobrenome }); } else { haErros = verificarErrosDoCampoNomeESobrenome({ currentTarget: campoSobrenome }); }
        if (haErros) { verificarErrosDoCampoEmail({ currentTarget: campoEmail }); } else { haErros = verificarErrosDoCampoEmail({ currentTarget: campoEmail }); }
        if (haErros) {
            $('[name=telefone]').each(function (i, obj) {
                var _this = $(obj);
                verificarErrosDoCampoTelefone({ currentTarget: _this });
            });
        } else {
            $('[name=telefone]').each(function (i, obj) {
                var _this = $(obj);
                haErros = verificarErrosDoCampoTelefone({ currentTarget: _this });
            });
        }
        if (haErros) {
            $('[name=redeSocial]').each(function (i, obj) {
                var _this = $(obj);
                verificarErrosDoCampoRedeSocial({ currentTarget: _this });
            });
        } else {
            $('[name=redeSocial]').each(function (i, obj) {
                var _this = $(obj);
                haErros = verificarErrosDoCampoRedeSocial({ currentTarget: _this });
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

    $(document).on('click', '.adicionarTelefone', function (e) {
        var _this = $(e.currentTarget);
        var controle = _this.parent().parent();
        var clone = controle.clone();
        //clone.addClass('offset3');
        //clone.children('label').remove();
        clone.children('label').text('');
        //clone.find('.error').remove();
        var select = clone.find('select');
        select.children(':selected').removeAttr('selected');
        var input = clone.find('input');
        input.val('');
        input.setMask();
        input.on('keyup', verificarErrosDoCampoTelefone);

        var controleDeRemocaoExiste = clone.find('.btn-controls').find('.removerTelefone').length;

        if (!controleDeRemocaoExiste) {
            var controleDeRemocao = $('<a class="btn removerTelefone" href="#"><span class="icon-minus"></span></a>');
            clone.find('.btn-controls').append(controleDeRemocao);
        }

        clone.insertAfter(controle);
        select.focus();
    });

    $(document).on('click', '.removerTelefone', function (e) {
        var _this = $(e.currentTarget);
        _this.parent().parent().remove();
    });

    $(document).on('click', '.adicionarSocial', function (e) {
        var _this = $(e.currentTarget);
        var controle = _this.parent().parent();
        var clone = controle.clone();
        //clone.addClass('offset3');
        //clone.children('label').remove();
        clone.children('label').text('');
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