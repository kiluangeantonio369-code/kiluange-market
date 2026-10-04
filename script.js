const WHATSAPP = "244953934686";

const produtos = [
  {
    id: 1,
    nome: "Camiseta BICO DAS'AXILAS",
    preco: 6000,
    categoria: "BICO",
    descricao: "Primeira coleção BICO DAS'AXILAS."
  },
  {
    id: 2,
    nome: "Chapéu das'axilas",
    preco: 3000,
    categoria: "BICO",
    descricao: "sempre a bicar."
  },
  {
    id: 3,
    nome: "Capa das'axilas",
    preco: 4500,
    categoria: "Acessórios",
    descricao: "Capa que dá bico"
  },
  {
    id: 4,
    nome: "Calças Linho",
    preco: 8000,
    categoria: "MODA",
    descricao: "Calças linho masculinas"
  },
  {
    id: 5,
    nome: "Pandora portuguesa",
    preco: 20000,
    categoria: "Acessórios",
    descricao: "Pandora pra combinar com linho"
  },
  {
    id: 6,
    nome: "Mascote santopeia",
    preco: 18000,
    categoria: "Acessórios",
    descricao: "Malha grossa, mascote prata"
  }
];

let carrinho = JSON.parse(localStorage.getItem("carrinhoKiluange")) || [];

const grade = document.querySelector("#grade-produtos");
const contador = document.querySelector("#contador-carrinho");

function dinheiro(valor) {
  return valor.toLocaleString("pt-AO") + " Kz";
}

function guardar() {
  localStorage.setItem("carrinhoKiluange", JSON.stringify(carrinho));
}

function atualizarContador() {
  if (!contador) return;

  const total = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
  contador.textContent = total;
}

function mostrarProdutos(lista = produtos) {
  if (!grade) return;

  grade.innerHTML = "";

  lista.forEach(produto => {
    const card = document.createElement("article");

    card.className = "produto-card";

    card.innerHTML = `
      <div class="produto-imagem">
        <span>${produto.nome.charAt(0)}</span>
      </div>

      <div class="produto-info">
        <small>${produto.categoria}</small>
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <strong>${dinheiro(produto.preco)}</strong>

        <button onclick="adicionarCarrinho(${produto.id})">
          Adicionar ao carrinho
        </button>
      </div>
    `;

    grade.appendChild(card);
  });
}

function adicionarCarrinho(id) {
  const produto = produtos.find(p => p.id === id);

  if (!produto) return;

  const existente = carrinho.find(p => p.id === id);

  if (existente) {
    existente.quantidade++;
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1
    });
  }

  guardar();
  atualizarContador();

  alert(`${produto.nome} foi adicionado ao carrinho!`);
}

function abrirCarrinho() {
  let mensagem = "🛒 *PEDIDO — KILUANGE MARKET*%0A%0A";
  let total = 0;

  if (carrinho.length === 0) {
    alert("O teu carrinho está vazio.");
    return;
  }

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    mensagem += `• ${item.nome}%0A`;
    mensagem += `  Quantidade: ${item.quantidade}%0A`;
    mensagem += `  Subtotal: ${dinheiro(subtotal)}%0A%0A`;
  });

  mensagem += `💰 *TOTAL: ${dinheiro(total)}*%0A%0A`;
  mensagem += "Olá! Quero finalizar este pedido.";

  window.open(
    `https://wa.me/${WHATSAPP}?text=${mensagem}`,
    "_blank"
  );
}

function filtrar(categoria) {
  if (categoria === "todos") {
    mostrarProdutos();
    return;
  }

  const filtrados = produtos.filter(
    produto => produto.categoria.toLowerCase() === categoria.toLowerCase()
  );

  mostrarProdutos(filtrados);
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarProdutos();
  atualizarContador();

  document.querySelectorAll(".filtro").forEach(botao => {
    botao.addEventListener("click", () => {
      const categoria = botao.dataset.categoria || "todos";
      filtrar(categoria);
    });
  });

  const botoesCarrinho = document.querySelectorAll(
    '[aria-label*="carrinho"], [aria-label*="Carrinho"]'
  );

  botoesCarrinho.forEach(botao => {
    botao.addEventListener("click", abrirCarrinho);
  });
});
