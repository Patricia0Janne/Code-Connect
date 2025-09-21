const uploadbtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");
const imagemPrincipal = document.querySelector(".main-image");
const nomeDaImagem = document.querySelector(".container-img-nome p");

//aciona o botao pra pegar a foto quando o input for clicado
uploadbtn.addEventListener("click", () => {
    inputUpload.click();
})
//cria uma funcao pra ler o conteudo e retornar as informações daquele conteudo
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name });
        }
        leitor.onerror = () => {
            reject(`Erro na leitura do arquio ${arquivo.name}`);
        }
        leitor.readAsDataURL(arquivo);

    })
}

//quando houver uma mudança no input ou add de arquivo ele vai esperar a funcao ler arquivo com o download do arq ser carregado para att imagem e nome na interface 
inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo");
        }
    }
})


const inputTags = document.getElementById("categoria");
const listaTags = document.getElementById("lista-tags");
const tagsDisponiveis = ["Front-End", "Programação", "Data Science", "Full-Stack", "Html", "CSS", "JavaScript"];

//adiciona a função no x da tag para remover quando clicado
listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

//verifica se o que foi digitado no input esta incluso no array 
async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}
//adiciona a tag na lista com a imagem do x sem espaços 
inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if(tagExiste){
                    const newTag = document.createElement("li");
                    newTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag"/>`;
                    listaTags.appendChild(newTag);
                    inputTags.value = "";
                }else{
                    alert("tag nao encontrada");
                }
                
            }
            catch(erro){
                console.erro("Erro ao verificar a existencia da tag.");
                alert("erro bla bla bla.");
            }
        }
    }
})



const botaoPublicar = document.querySelector(".botao-publicar")

//simula o envio para um back
async function publicarProjeto( nomeDoProjeto, descricaoDoProjeto, tagsProjeto){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;
            if(deuCerto){
                resolve("Projeto publica com sucesso.")
            }else {
                reject("Erro ao publicar o projeto.")
            }
        }, 2000)
    })
}   

//com o clique pega o valores escritos no formulario
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();
    const nomeDoProjeto =  document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try{
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("Deu tudo certo")
    }catch (erro){
        console.log("Deu erro");
        alert("Deu tudo errado")
        }
})

const botaoDescatar = document.querySelector(".botao-descartar");

botaoDescatar.addEventListener("click", (evento)=>{
    evento.preventDefault();
    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = `Imagem_projeto.png`
    
    listaTags.innerHTML="";

})
