const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-livros");
const modelo = document.querySelector("#modelo-livro");


const apiKey = "cv_VKcwZMun2wRvUuzD6wV3d7npxyJLu1ertkDJJpSMlaobFWFmE1eYbroYG812nRsn";

const apiUrl = "https://api-ds.codeverse.dev.br/api/livros";

async function buscarLivros() {

  resposta.textContent="Carregando livros..."
  try {
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });
    
    if(!retorno.ok){
      throw new Error("Não foi possível carregar os livros.");
    }

    const resultado = await retorno.json();

    for (const livro of resultado.data){
      
      const card = modelo.content.cloneNode(true);

      card.querySelector(".nome").textContent = livro.title;
      card.querySelector(".genero").textContent = livro.genero;
      card.querySelector(".numero_paginas").textContent = livro.numero_paginas;
      card.querySelector(".ano_publicacao").textContent = livro.ano_publicacao;
      card.querySelector(".autor").textContent = livro.autor;

      const imagem = card.querySelector(".imagem-livro");

      if (livro.imageUrl){
        imagem.src = livro.imageUrl;
        imagem.alt = livro.title;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }

      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar os livros. Tente novamente!" 
  }
}

buscarLivros();