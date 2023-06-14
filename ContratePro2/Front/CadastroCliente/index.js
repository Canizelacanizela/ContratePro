function cadastrarUsuario() {
    //Cria um objeto com os dados dos campos html <input>

    let nome = document.querySelector("#nome").value
    let email = document.querySelector("#email").value
    let senha = document.querySelector("#senha").value
    let telefone = document.querySelector("#telefone").value
    let cidade = document.querySelector("#cidade").value

    let corpo = {
        "nome": nome,
        "email": email,
        "senha": senha,
        "telefone": telefone, 
        "cidade": cidade
    }

    let options = {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(corpo)
    };

    fetch('http://localhost:3000/usercriar', options)
        .then(res => { return res.json() })
        .then(resp => {
            if (resp != undefined) {
                alert("Deu Certo");
                window.location.reload();
            } else {
                alert("Parece que deu erro");
                window.location.reload();
            }
        });
}