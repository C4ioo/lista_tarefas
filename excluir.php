<?php
require 'conexao.php';
$pdo->prepare("DELETE FROM tarefas WHERE id=?")->execute([$_GET['id']]);
header('Location: index.php');