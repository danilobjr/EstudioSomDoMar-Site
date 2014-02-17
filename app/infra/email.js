var emailjs = require("emailjs/email");

var server  = emailjs.server.connect({
   user:    "danilo.emailteste", 
   password:"daniloemailteste123456", 
   host:    "smtp.gmail.com", 
   ssl:     true
});

// send the message and get a callback with an error or details of the message that was sent
exports.enviar = function (nomeRemetente, emailRemetente, para, assunto, mensagem, callback) {
    var email = {
        from: nomeRemetente,
        to: para,
        subject: assunto,
        text: mensagem,
        attachment: 
       [
          {data:"<html>" + mensagem + "<br/><br/><b>" + nomeRemetente + "<b><br/>" + emailRemetente + "</html>", alternative: true}
          //{path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
       ]
    }

    server.send(email, function (erro, result) {
        if (erro) {
            callback(erro);
        } else {
            callback(undefined, result);
        }
    });
};