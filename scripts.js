let btnsOpcoes = document.querySelectorAll(".btn-opcao");
let btnsOpcoesAvanc = document.querySelectorAll(".btn-opcao-avanc");
let nomeFonte = document.getElementById("fontName");
let tamFonte = document.getElementById("fontSize");
let areaTexto = document.getElementById("caixa-texto");
let btnLink = document.getElementById("createLink");
let btnsAlinhamento = document.querySelectorAll(".alinhamento");
let btnsEspaco = document.querySelectorAll(".espacamento");
let btnsForamatacao = document.querySelectorAll(".formatacao");
let btnsCodigo = document.querySelectorAll(".codigo");
let btnSalvar = document.getElementById("bt-salvar");
let btnNovo = document.getElementById("bt-novo");
let tituloDoc = document.getElementById("titulo");
let inputAbrir = document.getElementById("input-abrir");
let nomePadrao = '';

let listaFontes = [
    "Times New Roman",
    "Arial",
    "Verdana",
    "Garamond",
    "Georgia",
    "Courrier New",
    "Cursive",
];

const iniciar = () => {
    marcar(btnsAlinhamento, true);
    marcar(btnsEspaco, true);
    marcar(btnsForamatacao, false);
    marcar(btnsCodigo, true);

    listaFontes.map((valor) => {
        let option = document.createElement("option");
        option.value = valor;
        option.innerHTML = valor;
        nomeFonte.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        tamFonte.appendChild(option);
    }

    tamFonte.value = 3;
};

const modificarTexto = (comando, uiPadrao, valor) => {
    document.execCommand(comando, uiPadrao, valor);
};

btnsOpcoes.forEach((button) => {
    button.addEventListener("click", () => {
        modificarTexto(button.id, false, null);
    });
});

btnsOpcoesAvanc.forEach((button) => {
    button.addEventListener("change", () => {
        modificarTexto(button.id, false, button.value);
    });
});

btnLink.addEventListener("click", () => {
    let linkUsuario = prompt("Adicionar URL?");
    if (/http/i.test(linkUsuario)) {
        modificarTexto(btnLink.id, false, linkUsuario);
    } else {
        linkUsuario = "http://" + linkUsuario;
        modificarTexto(btnLink.id, false, linkUsuario);
    }
});

const marcar = (className, precisaRemover) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (precisaRemover) {
                let estaAtivo = false;
                if (button.classList.contains("ativo")) {
                    estaAtivo = true;
                }
                removerMarcador(className);
                if (!estaAtivo) {
                    button.classList.add("ativo");
                }
            } else {
                button.classList.toggle("ativo");
            }
        });
    });
};

const removerMarcador = (className) => {
    className.forEach((button) => {
        button.classList.remove("ativo");
    });
};

function salvarTexto(data, filename, type) {
    const file = new Blob([data], { type: type });

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
        return
    }

    const a = document.createElement("a");
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);

    a.click();

    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

async function abrirTexto(arquivo) {
    let texto = await arquivo.text();
    areaTexto.insertAdjacentHTML('afterbegin', texto);
    let nomeArquivo = (inputAbrir.files.item(0).name).replace('.txt', '') 
    tituloDoc.innerHTML = nomeArquivo;
    nomePadrao = nomeArquivo; 

}

btnSalvar.addEventListener("click", () => {
    let arquivo = areaTexto.innerHTML;
    let nomeArquivo = areaTexto.innerHTML;
    if(nomePadrao == ''){
        nomeArquivo = 'Documento 1';
    }else{
        nomeArquivo = nomePadrao;
    }

    salvarTexto(arquivo, nomeArquivo, 'txt');
});

btnNovo.addEventListener("click", () => {
    location.reload();
});

window.onload = iniciar();





