var templateBarra = `<img src="**FOTO**" width="80px" " ><br>**NOME**`;

var templateUser = `<div class="row">
                        <div class="card-body col-md-12 comborda text-center">
                            <h5>(**CONT**) **NOME**</h5>
                           
                           Volume transacional: **VOLUME**
                        </div>
                    </div>`;


function carregaParceira(){
    var parametro = window.location.search;
    console.log("URL = "+parametro);
    
    var numParceira = parametro.substr(4);

    console.log("Numero do departamento = "+numParceira);
    
    
    fetch("http://localhost:8080/agentesfinanceiros/"+numParceira+"/dashboard")
        .then(res => res.json())
        .then(res => carregarParceira(res));

}

function carregarParceira(res){
    var userLogado = localStorage.getItem("userDash");
    if (!userLogado){
        window.location="index.html";
    }
    else{
        console.log(res);
        var contSTR = "Parceira: "+res.nome+"<br>"
                        +"Volume Total: "+ res.volume+"<br>"
                        +"Status OK: "+res.statusOk+"<br>"
                        +"Status Falha: "+res.statusFalha+"<br>"
                        +"Status Fraude: "+res.statusFraude+"<br>";

        document.getElementById("conteudo").innerHTML=contSTR;

        var usertemp=localStorage.getItem("userDash");
        var user=JSON.parse(usertemp);
        console.log(user);

        document.getElementById("link").innerHTML = templateBarra
        .replace("**FOTO**",user.linkFoto)
        .replace("**NOME**", user.nome)
    }
}




