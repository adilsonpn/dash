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
        var usertemp=localStorage.getItem("userDash");
        var user=JSON.parse(usertemp);
        console.log(user);

        document.getElementById("link").innerHTML = templateBarra
        .replace("**FOTO**",user.linkFoto)
        .replace("**NOME**", user.nome)

        document.getElementById("statusOk").innerHTML = "<h4>SUCESSO: "+res.statusOk+"</h4>";
        document.getElementById("statusFalha").innerHTML = "<h4>FALHA:  "+res.statusFalha+"</h4>";
        document.getElementById("statusFraude").innerHTML = "<h4>FRAUDE:  "+res.statusFraude+"</h4>";
        document.getElementById("nomeAgente").innerHTML="<h2>"+res.nome+"</h2>";
        document.getElementById("volumeAgente").innerHTML="<h3>Volume: "+res.volume+"</h3>";
    
        var ctx = document.getElementById("meuGrafico").getContext("2d");
        ctx.clearRect(0, 0, meuGrafico.width, meuGrafico.height);
    
        var grafico='';
        
    
        // criando a variavel do tipo grafico
        var grafico =  new Chart(ctx,
            {
                type: 'doughnut',
                data: {
                    labels: ['Sucesso', 'Falhas', 'Fraude'],
                    datasets: [{
                        label: 'Transacoes nas ultimas 24h',
                        backgroundColor: [ 
                            '#208000',
                            '#ebe134',
                            '#ff0000',
                        ],
                        data:[res.statusOk, res.statusFalha, res.statusFraude]
                    }]
                }
            });

    }
}




