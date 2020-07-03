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
    console.log(res);
    var contSTR = "Parceira: "+res.nome+"<br>"
                    +"Volume Total: "+ res.volume+"<br>"
                    +"Status OK: "+res.statusOk+"<br>"
                    +"Status Falha: "+res.statusFalha+"<br>"
                    +"Status Fraude: "+res.statusFraude+"<br>";

    document.getElementById("conteudo").innerHTML=contSTR;
    
}