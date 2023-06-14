function cadastrarUsuario() {
    //Cria um objeto com os dados dos campos html <input>

    let nome = document.querySelector("#nome").value
    let email = document.querySelector("#email").value
    let senha = document.querySelector("#senha").value
    let cidade = document.querySelector("#cidade").value
    let biografia = document.querySelector("#biografia").value
    let porhora = document.querySelector("#porhora").value
    let telefone = document.querySelector("#telefone").value
    let imagem = document.querySelector("#imagem").value
    let id_categoria = document.querySelector("#id_categoria").value

    let corpo = {
        "nome": nome,
        "email": email,
        "senha": senha,
        "cidade": cidade, 
        "biografia": biografia, 
        "porhora": porhora, 
        "telefone": telefone,
        "imagem": imagem,
        "id_categoria": Number(id_categoria) 
    }

    let options = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(corpo)
    };

    fetch('http://localhost:3000/profcriar', options)
        .then(res => { return res.json() })
        .then(resp => {
            if (resp != undefined) {
                alert("Deu Certo");
                window.location.reload();
            } else {
                alert("Parece que deu erro");
            }
        });
}
