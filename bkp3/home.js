var templateBarra = `<img src="**FOTO**" width="20%" " ><br>**NOME**`;

var templateUser = `<table>
                        <tr>
                            <th>(**CONT**) **NOME** </th>
                            <td>Transações: **VOLUME**</td>
                        </tr>
                     </table>`;

function carregaTeste(){
    var userLogado = localStorage.getItem("userDash");
    if (!userLogado){
        window.location="index.html";
    }
    else{

        // a partir daqui posso fazer um fetch no endpoint de departamento e
        // preencher um conjunto de linhas com todos os usuários daquele depto
        
        fetch("http://localhost:8080/agentesfinanceiros")
        .then(res => res.json())
        .then(res => preenche(res))


        var usertemp=localStorage.getItem("userDash");
        var user=JSON.parse(usertemp);
        console.log(user);

        document.getElementById("link").innerHTML = templateBarra
        .replace("**FOTO**",user.linkFoto)
        .replace("**NOME**", user.nome)

    }
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

