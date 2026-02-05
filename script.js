let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

const lista = document.getElementById('lista');
const totalEl = document.getElementById('total');

function salvar() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function renderizar() {
    lista.innerHTML = '';
    let total = 0;

    tarefas.sort((a, b) => a.ordem - b.ordem);

    tarefas.forEach((t, i) => {
        total += t.custo;

        const tr = document.createElement('tr');
        if (t.custo >= 1000) tr.classList.add('destaque');

        tr.innerHTML = `
            <td>${t.nome}</td>
            <td>R$ ${t.custo.toFixed(2).replace('.', ',')}</td>
            <td>${new Date(t.data).toLocaleDateString('pt-BR')}</td>
            <td>
                <button onclick="editar(${i})">Editar</button>
                <button onclick="excluir(${i})">Excluir</button>
                <button onclick="subir(${i})">⬆</button>
                <button onclick="descer(${i})">⬇</button>
            </td>
        `;

        lista.appendChild(tr);
    });

    totalEl.innerHTML = `<strong>Total: R$ ${total.toFixed(2).replace('.', ',')}</strong>`;
}

function excluir(i) {
    if (confirm('Confirmar exclusão?')) {
        tarefas.splice(i, 1);
        tarefas.forEach((t, idx) => t.ordem = idx + 1);
        salvar();
        renderizar();
    }
}

function editar(i) {
    const t = tarefas[i];
    const nome = prompt('Nome da tarefa:', t.nome);
    if (!nome) return;

    if (tarefas.some((x, idx) => x.nome === nome && idx !== i)) {
        alert('Já existe uma tarefa com esse nome');
        return;
    }

    const custo = parseFloat(prompt('Custo:', t.custo));
    if (isNaN(custo) || custo < 0) return;

    const data = prompt('Data limite (AAAA-MM-DD):', t.data);
    if (!data) return;

    t.nome = nome;
    t.custo = custo;
    t.data = data;

    salvar();
    renderizar();
}

function subir(i) {
    if (i === 0) return;
    [tarefas[i], tarefas[i - 1]] = [tarefas[i - 1], tarefas[i]];
    tarefas.forEach((t, idx) => t.ordem = idx + 1);
    salvar();
    renderizar();
}

function descer(i) {
    if (i === tarefas.length - 1) return;
    [tarefas[i], tarefas[i + 1]] = [tarefas[i + 1], tarefas[i]];
    tarefas.forEach((t, idx) => t.ordem = idx + 1);
    salvar();
    renderizar();
}

document.getElementById('formTarefa').addEventListener('submit', e => {
e.preventDefault();

    const nome = document.getElementById('nome').value;
    const custo = parseFloat(document.getElementById('custo').value);
    const data = document.getElementById('data').value;

    if (tarefas.some(t => t.nome === nome)) {
        alert('Já existe uma tarefa com esse nome');
        return;
    }

    tarefas.push({
        nome,
        custo,
        data,
        ordem: tarefas.length + 1
    });

    salvar();
    renderizar();
    e.target.reset();
});

renderizar();