<?php

function obterIMC(float $peso, float $altura) : float {
    $imc = $peso / pow($altura, 2);
    return $imc;
}

function obterClassificacao(float $imc) : string {
    if ($imc >= 40.0) return "Obesidade III";
    else if ($imc > 35.0) return "Obesidade II";
    else if ($imc > 30.0) return "Obesidade I";
    else if ($imc > 25.0) return "Excesso de peso";
    else if ($imc > 18.5) return "Peso normal";
    else return "Abaixo do peso normal";
}

function responder(int $codStatus, array|null $info) : void {
    http_response_code( $codStatus );
    die( json_encode( $info, JSON_UNESCAPED_UNICODE, JSON_UNESCAPED_SLASHES ));
}

?>