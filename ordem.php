<?php
require 'conexao.php';

$id = $_GET['id'];
$dir = $_GET['dir'];

// tarefa atual
$atual = $pdo->query(
    "SELECT id, ordem FROM tarefas WHERE id = $id"
)->fetch();

$op  = $dir === 'up' ? '<' : '>';
$ord = $dir === 'up' ? 'DESC' : 'ASC';

// tarefa vizinha
$vizinho = $pdo->query(
    "SELECT id, ordem FROM tarefas 
     WHERE ordem $op {$atual['ordem']} 
     ORDER BY ordem $ord 
     LIMIT 1"
)->fetch();

if ($vizinho) {
    // usa um valor temporário para evitar duplicidade
    $pdo->exec("UPDATE tarefas SET ordem = -1 WHERE id = {$atual['id']}");
    $pdo->exec("UPDATE tarefas SET ordem = {$atual['ordem']} WHERE id = {$vizinho['id']}");
    $pdo->exec("UPDATE tarefas SET ordem = {$vizinho['ordem']} WHERE id = {$atual['id']}");
}

header('Location: index.php');
exit;
