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

window.onload = iniciar();





