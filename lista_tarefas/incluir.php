<?php
require 'conexao.php';


if ($_POST) {
$nome = $_POST['nome'];
$custo = $_POST['custo'];
$data = $_POST['data'];


$ordem = $pdo->query("SELECT IFNULL(MAX(ordem),0)+1 FROM tarefas")->fetchColumn();


$stmt = $pdo->prepare("INSERT INTO tarefas (nome,custo,data_limite,ordem) VALUES (?,?,?,?)");
$stmt->execute([$nome,$custo,$data,$ordem]);
header('Location: index.php');
}
?>


<form method="post">
Nome: <input required name="nome"><br>
Custo: <input required type="number" step="0.01" min="0" name="custo"><br>
Data Limite: <input required type="date" name="data"><br>
<button>Salvar</button>
</form>