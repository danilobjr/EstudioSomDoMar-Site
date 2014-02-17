var contexto = require('./../repository/contexto');

module.exports = function () {
    var obterProgramaDeRadio = function () {
        return contexto.radio.obterPrograma();
    };

    var alterar = function (radioAlterada) {
        return contexto.radio.alterar(radioAlterada);
    };

    return {
        obterPrograma: obterProgramaDeRadio,
        alterar: alterar
    };
} ();