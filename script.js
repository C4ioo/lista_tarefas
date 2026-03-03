let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let proximoId = parseInt(localStorage.getItem('proximoId')) || 1;

const lista = document.getElementById('lista');
const modal = document.getElementById('modalTarefa');
const form = document.getElementById('formTarefa');
const inputNome = document.getElementById('nome');

function salvar() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    localStorage.setItem('proximoId', proximoId);
}

inputNome.addEventListener('input', function() {
    const editIndex = document.getElementById('editIndex').value;
    const duplicado = tarefas.some((t, idx) => 
        t.nome.toLowerCase() === this.value.toLowerCase() && idx.toString() !== editIndex
    );
    
    const erroSpan = document.getElementById('erroNome');
    if (duplicado) {
        erroSpan.innerText = "Já existe uma tarefa com esse nome";
        inputNome.setCustomValidity("Nome duplicado");
    } else {
        erroSpan.innerText = "";
        inputNome.setCustomValidity("");
    }
});

function renderizar() {
    lista.innerHTML = '';
    let totalCusto = 0;

    tarefas.sort((a, b) => a.ordem - b.ordem);

    tarefas.forEach((t, i) => {
        totalCusto += parseFloat(t.custo);

        const tr = document.createElement('tr');
        if (t.custo >= 1000) tr.classList.add('destaque');

        const dataFormatada = t.data.split('-').reverse().join('/');

        tr.innerHTML = `
            <td>${t.id}</td>
            <td>${t.nome}</td>
            <td>R$ ${parseFloat(t.custo).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
            <td>${dataFormatada}</td>
            <td>
                <button onclick="editar(${i})">Editar</button>
                <button onclick="excluir(${i})">Excluir</button>
                <button onclick="subir(${i})" ${i === 0 ? 'disabled' : ''}>⬆</button>
                <button onclick="descer(${i})" ${i === tarefas.length - 1 ? 'disabled' : ''}>⬇</button>
            </td>
        `;

        lista.appendChild(tr);
    });

    document.getElementById('total').innerHTML = `<strong>Total: R$ ${totalCusto.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong>`;
}

function abrirModal() {
    form.reset();
    document.getElementById('editIndex').value = "";
    document.getElementById('modalTitulo').innerText = "Incluir Tarefa";
    modal.style.display = 'block';
    inputNome.focus();
}

function fecharModal() {
    modal.style.display = 'none';
}

function excluir(i) {
    if (confirm('Confirmar exclusão?')) {
        tarefas.splice(i, 1);
        salvar();
        renderizar();
    }
}

function editar(i) {
    const t = tarefas[i];
    document.getElementById('editIndex').value = i;
    document.getElementById('nome').value = t.nome;
    document.getElementById('custo').value = t.custo;
    document.getElementById('data').value = t.data;
    document.getElementById('modalTitulo').innerText = "Editar Tarefa";
    modal.style.display = 'block';
    inputNome.focus();
}

function subir(i) {
    if (i > 0) {
        [tarefas[i].ordem, tarefas[i - 1].ordem] = [tarefas[i - 1].ordem, tarefas[i].ordem];
        salvar();
        renderizar();
    }
}

function descer(i) {
    if (i < tarefas.length - 1) {
        [tarefas[i].ordem, tarefas[i + 1].ordem] = [tarefas[i + 1].ordem, tarefas[i].ordem];
        salvar();
        renderizar();
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const index = document.getElementById('editIndex').value;
    const dados = {
        nome: inputNome.value,
        custo: parseFloat(document.getElementById('custo').value),
        data: document.getElementById('data').value
    };

    if (index === "") {
        tarefas.push({
            id: proximoId++,
            ...dados,
            ordem: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.ordem)) + 1 : 1
        });
    } else {
        tarefas[index].nome = dados.nome;
        tarefas[index].custo = dados.custo;
        tarefas[index].data = dados.data;
    }

    salvar();
    renderizar();
    fecharModal();
});

renderizar();