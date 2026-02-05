<?php
require 'conexao.php';


// BUSCA TAREFAS
$tarefas = $pdo->query("SELECT * FROM tarefas ORDER BY ordem")->fetchAll();
$total = array_sum(array_column($tarefas, 'custo'));
?>


<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Lista de Tarefas</title>
<style>
body { font-family: Arial; }
table { width: 100%; border-collapse: collapse; }
th, td { border: 1px solid #ccc; padding: 8px; }
.destaque { background: yellow; }
</style>
</head>
<body>


<h2>Lista de Tarefas</h2>


<table>
<tr>
<th>Nome</th><th>Custo (R$)</th><th>Data Limite</th><th>Ações</th>
</tr>


<?php foreach ($tarefas as $t): ?>
<tr class="<?= $t['custo'] >= 1000 ? 'destaque' : '' ?>">
<td><?= htmlspecialchars($t['nome']) ?></td>
<td><?= number_format($t['custo'], 2, ',', '.') ?></td>
<td><?= date('d/m/Y', strtotime($t['data_limite'])) ?></td>
<td>
<a href="editar.php?id=<?= $t['id'] ?>">Editar</a> |
<a href="excluir.php?id=<?= $t['id'] ?>" onclick="return confirm('Confirmar exclusão?')">Excluir</a> |
<a href="ordem.php?id=<?= $t['id'] ?>&dir=up">↑</a>
<a href="ordem.php?id=<?= $t['id'] ?>&dir=down">↓</a>
</td>
</tr>
<?php endforeach; ?>


<tr>
<td colspan="4"><strong>Total: R$ <?= number_format($total, 2, ',', '.') ?></strong></td>
</tr>
</table>


<br>
<a href="incluir.php">Incluir Nova Tarefa</a>


</body>
</html>