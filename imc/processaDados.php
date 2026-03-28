<?php

declare(strict_types=1);
require_once 'imcFunc.php';
header("Content-Type:application/json;charset=UTF-8");

$info = file_get_contents("php://input");
$pessoa = json_decode($info, true);

if (!$pessoa) responder(400, ["erro" => "Problemas de conversão com JSON"]);
if (!isset($pessoa["nome"], $pessoa["peso"], $pessoa["altura"])) responder(400, ["erro" => "Nem todos os valores vieram."]);
if ($pessoa["nome"] === "") responder(400, ["erro" => "O nome da pessoa precisa estar preenchido."]);
if (!(is_numeric($pessoa["peso"]) && is_numeric($pessoa["altura"]))) responder(400, "A altura e o peso precisam ser valores numéricos.");

$peso = (float) $pessoa["peso"];
$altura = (float) $pessoa["altura"];

if ($peso < 10 || $peso > 300 || $altura < 0.30 || $altura > 2.50) responder(400, "O peso precisa estar entre 10 e 300kg. A altura precisa estar entre 0.30 e 2.50m.");

$nome = $pessoa["nome"];
$imc = obterIMC($peso, $altura);
$classificacao = obterClassificacao($imc);

$pessoa["imc"] = $imc;
$pessoa["classificacao"] = $classificacao;

responder(200, $pessoa);

?>