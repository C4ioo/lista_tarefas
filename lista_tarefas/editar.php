<?php
require 'conexao.php';

$id = $_GET['id'];

$tarefa = $pdo->prepare("SELECT * FROM tarefas WHERE id=?");
$tarefa->execute([$id]);
$tarefa = $tarefa->fetch();

if ($_POST) {
    $stmt = $pdo->prepare(
        "UPDATE tarefas SET nome=?, custo=?, data_limite=? WHERE id=?"
    );
    $stmt->execute([
        $_POST['nome'],
        $_POST['custo'],
        $_POST['data'],
        $id
    ]);
    header('Location: index.php');
    exit;
}
?>

<form method="post">
    Nome:
    <input required name="nome" value="<?= htmlspecialchars($tarefa['nome']) ?>"><br>

    Custo:
    <input required type="number" step="0.01" min="0"
           name="custo" value="<?= $tarefa['custo'] ?>"><br>

    Data Limite:
    <input required type="date"
           name="data" value="<?= $tarefa['data_limite'] ?>"><br>

    <button>Salvar</button>
</form>
