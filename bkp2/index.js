function enviar(){
    var txtEmail = document.getElementById("txtEmail").value;
    var txtSenha = document.getElementById("txtSenha").value;

    console.log("Valores digitados = "+txtEmail+" / "+ txtSenha);

    // json que vai no corpo da mensagem
    var msgBody = {
        email: txtEmail,
        racf: txtEmail,
        senha: txtSenha
    }

    var cabecalho = {
        method : 'POST',
        body   : JSON.stringify(msgBody),
        headers : {
            'Content-type':'application/json'
        }

    }
    fetch("http://localhost:8080/login", cabecalho)
        .then(resposta=>tratarResultado(resposta));
}

function tratarResultado(resp){
    if (resp.status == 200){ // ok, usuario e senha existem
       //alert("Usuario IDENTIFICADO");
       document.getElementById("resposta").innerHTML = "";
       resp.json().then(res => efetivarLogin(res));
    }
    else if (resp.status == 404){  // not found
        //alert("Usuario NAO FOI ENCONTRADO EM NOSSA BASE");
        console.log("teste404");
        document.getElementById("resposta").innerHTML = "<h1>Usuario não encontrado</h1>";
    }
    else if (resp.status == 403){  // forbidden
       // alert("Senha INVALIDA");
       console.log("teste403");
       document.getElementById("resposta").innerHTML = "<h1>Senha Inválida</h1>";
       
    }
}

function efetivarLogin(res){
    // qual a idéia? gravar no LocalStorage o objeto que eu recebi
    // redirecionar para a página HOME.HTML
    localStorage.setItem("userDash",JSON.stringify(res));
    window.location="home.html";
}

function destruir(){
localStorage.removeItem("userDash");

}