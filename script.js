const listaJogadoras = document.getElementById('listaJogadoras');
const modal = document.getElementById('modal');
const fecharModal = document.getElementById('fecharModal');
const btnAdicionar = document.getElementById('btnAdicionar');
const formJogadora = document.getElementById('formJogadora');
const inputs = formJogadora.querySelectorAll('input');
const tituloModal = document.getElementById('tituloModal');
const idInput = document.getElementById('id');

let jogadoras = JSON.parse(localStorage.getItem('jogadoras')) || [];

function renderizarJogadoras() {
  listaJogadoras.innerHTML = '';
  jogadoras.forEach(jogadora => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${jogadora.foto}" alt="${jogadora.nome}">
      <h3>${jogadora.nome}</h3>
      <p>${jogadora.posicao} - ${jogadora.clube}</p>
      <button onclick="editarJogadora(${jogadora.id})">Editar</button>
      <button onclick="deletarJogadora(${jogadora.id})">Deletar</button>
    `;
    listaJogadoras.appendChild(card);
  });
}

function salvarJogadora(event) {
  event.preventDefault();
  const jogadora = {
    id: idInput.value ? parseInt(idInput.value) : Date.now(),
    nome: inputs[0].value,
    posicao: inputs[1].value,
    clube: inputs[2].value,
    foto: inputs[3].value
  };

  if (idInput.value) {
    const index = jogadoras.findIndex(j => j.id === jogadora.id);
    jogadoras[index] = jogadora;
  } else {
    jogadoras.push(jogadora);
  }

  localStorage.setItem('jogadoras', JSON.stringify(jogadoras));
  renderizarJogadoras();
  modal.style.display = 'none';
  formJogadora.reset();
  idInput.value = '';
}

function editarJogadora(id) {
  const jogadora = jogadoras.find(j => j.id === id);
  inputs[0].value = jogadora.nome;
  inputs[1].value = jogadora.posicao;
  inputs[2].value = jogadora.clube;
  inputs[3].value = jogadora.foto;
  idInput.value = jogadora.id;
  tituloModal.textContent = 'Editar Jogadora';
  modal.style.display = 'flex';
}

function deletarJogadora(id) {
  jogadoras = jogadoras.filter(j => j.id !== id);
  localStorage.setItem('jogadoras', JSON.stringify(jogadoras));
  renderizarJogadoras();
}

function abrirModal() {
  formJogadora.reset();
  tituloModal.textContent = 'Adicionar Jogadora';
  modal.style.display = 'flex';
}

function fecharModalFunc() {
  modal.style.display = 'none';
}

btnAdicionar.addEventListener('click', abrirModal);
fecharModal.addEventListener('click', fecharModalFunc);
formJogadora.addEventListener('submit', salvarJogadora);

renderizarJogadoras();