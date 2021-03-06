var templateBarra = `<img src="**FOTO**" width="35px"> Bem vindo **NOME**`;

function verificaUsuario(){
    var userLogado = localStorage.getItem("userDash");
    if (!userLogado){
        window.location="index.html";
    }
    else{
        var user = JSON.parse(userLogado);
        document.getElementById("barraUser").innerHTML = templateBarra
                                                    .replace("**FOTO**",user.linkFoto)
                                                    .replace("**NOME**", user.nome);
    }
}

var templateUser = `<div class="row">
                        <div class="card-body col-md-12 comborda text-center">
                            <h5>(**CONT**) **NOME**</h5>
                           
                           Volume transacional: **VOLUME**
                        </div>
                    </div>`;

function carregaTeste(){

        // a partir daqui posso fazer um fetch no endpoint de departamento e
        // preencher um conjunto de linhas com todos os usuários daquele depto
        
        fetch("http://localhost:8080/agentesfinanceiros")
        .then(res => res.json())
        .then(res => preenche(res))
}

function preenche(res){
    console.log(res);    
    var linha = "";
    for (i=0; i<10; i++){
        var user = res[i];
        cont = i
        linha = linha + templateUser.replace("**NOME**",user.nome)
                                    .replace("**VOLUME**",user.volume)
                                    .replace("**CONT**",++cont);
    }
    document.getElementById("conteudo").innerHTML = linha;
}
