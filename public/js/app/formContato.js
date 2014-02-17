$(function () {
    $('.closeButton').click(function () {
        $('.alert > div').removeClass('active');
    });

    $('#formContato').submit(function (e) {

        e.preventDefault();
        var form = $(e.currentTarget);

        var nome = form.find('[name=nome]');
        var email = form.find('[name=email]');
        var mensagem = form.find('[name=mensagem]');

        var data = {
            nome: nome.val(),
            email: email.val(),
            mensagem: mensagem.val()
        };

        var url = window.location.origin + form.attr('action');
        //var data = 'nome=' + data.nome + '&email=' + data.email + '&mensagem=' + data.mensagem;

        debugger;

        $.ajax({
            type: "post",
            url: form.attr('action'),
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function () {
                $('.alert > div').removeClass('active');
                $('.alert .carregando').addClass('active');
                form.find('[type=text], [type=email], textarea').attr('disabled', true);
            },
            success: function (msg) {
                console.log(msg);
                $('.alert > div').removeClass('active');
                $('.alert .success').addClass('active');
                nome.val('');
                email.val('');
                mensagem.val('');
            },
            error: function (xhr, msg) {
                console.log(msg + '\n' + xhr.responseText);
                $('.alert > div').removeClass('active');
                $('.alert .erro').addClass('active');
            }
        });
        //.done(function (data, textStatus, jqXHR) {
        //    console.log('Data: %s - jqXHR: %o', data, jqXHR);
        //    $('.alert > div').removeClass('active');
        //    $('.alert .success').addClass('active');
        //    $('[name=nome]').val('');
        //    $('[name=email]').val('');
        //    $('[name=mensagem]').val('');

        //})
        //.fail(function (jqXHR, textStatus, errorThrown) {
        //    console.log('Error: %s - jqXHR: %o', errorThrown, jqXHR);
        //    $('.alert > div').removeClass('active');
        //    $('.alert .error').addClass('active');
        //})
        //.always(function (data, textStatus, result) {
        //    $('form').find('[type=text], [type=email], textarea').removeAttr('disabled');
        //});
    });
});
