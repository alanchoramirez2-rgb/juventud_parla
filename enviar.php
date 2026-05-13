<?php
/**
 * enviar.php – CD Juventud Parla
 * Gestiona el formulario de contacto y el de preinscripción.
 * Compatible con Hostinger (PHP 8.x + mail()).
 */

// ─────────────────────────────────────────────
// CONFIGURACIÓN  ← Editar antes de subir
// ─────────────────────────────────────────────
define('DESTINO_EMAIL', 'alanchoramirez2@gmail.com'); // ← tu correo corporativo
define('CHARSET',       'UTF-8');

// ─────────────────────────────────────────────
// CABECERAS
// ─────────────────────────────────────────────
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('X-Content-Type-Options: nosniff');

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

// ─────────────────────────────────────────────
// FUNCIÓN AUXILIAR: sanear entrada
// ─────────────────────────────────────────────
function limpiar(string $valor): string {
    $valor = trim($valor);
    $valor = stripslashes($valor);
    $valor = htmlspecialchars($valor, ENT_QUOTES, 'UTF-8');
    return $valor;
}

// ─────────────────────────────────────────────
// DETERMINAR TIPO DE FORMULARIO
// ─────────────────────────────────────────────
$tipo = limpiar($_POST['tipo'] ?? 'preinscripcion');

// ─────────────────────────────────────────────
// FORMULARIO DE CONTACTO GENERAL
// ─────────────────────────────────────────────
if ($tipo === 'contacto') {

    $nombre  = limpiar($_POST['contactNombre']  ?? '');
    $email   = limpiar($_POST['contactEmail']   ?? '');
    $mensaje = limpiar($_POST['contactMensaje'] ?? '');

    $errores = [];
    if (empty($nombre))  $errores[] = 'El nombre es obligatorio.';
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = 'El correo electrónico no es válido.';
    }
    if (empty($mensaje)) $errores[] = 'El mensaje es obligatorio.';

    // Anti-injection
    foreach ([$nombre, $email] as $campo) {
        if (preg_match('/[\r\n]/', $campo)) {
            $errores[] = 'Caracteres no permitidos detectados.';
            break;
        }
    }

    if (!empty($errores)) {
        http_response_code(422);
        echo json_encode(['success' => false, 'message' => implode(' ', $errores)]);
        exit;
    }

    $asunto = '=?UTF-8?B?' . base64_encode('[Juventud Parla] Nuevo mensaje de contacto') . '?=';
    $cuerpo  = "=== NUEVO MENSAJE DE CONTACTO – CD JUVENTUD PARLA ===\n";
    $cuerpo .= "Fecha: " . date('d/m/Y H:i') . "\n\n";
    $cuerpo .= "Nombre:  {$nombre}\n";
    $cuerpo .= "Email:   {$email}\n\n";
    $cuerpo .= "Mensaje:\n{$mensaje}\n\n";
    $cuerpo .= "==========================================\n";
    $cuerpo .= "Mensaje generado automáticamente desde juventudparla.es\n";

    $headers  = "From: noreply@juventudparla.es\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";

    $enviado = mail(DESTINO_EMAIL, $asunto, $cuerpo, $headers);

    if ($enviado) {
        echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error al enviar. Inténtalo de nuevo.']);
    }
    exit;
}

// ─────────────────────────────────────────────
// FORMULARIO DE PREINSCRIPCIÓN (por defecto)
// ─────────────────────────────────────────────
$nombreJugador      = limpiar($_POST['nombreJugador']      ?? '');
$fechaNac           = limpiar($_POST['fechaNac']           ?? '');
$equipoProcedencia  = limpiar($_POST['equipoProcedencia']  ?? '');
$especificarClub    = limpiar($_POST['especificarClub']    ?? '');
$posicion           = limpiar($_POST['posicion']           ?? '');
$nombreTutor        = limpiar($_POST['nombreTutor']        ?? '');
$telefono           = limpiar($_POST['telefono']           ?? '');
$email              = limpiar($_POST['email']              ?? '');

$errores = [];

if (empty($nombreJugador))     $errores[] = 'El nombre del jugador/a es obligatorio.';
if (empty($fechaNac))          $errores[] = 'La fecha de nacimiento es obligatoria.';
if (empty($equipoProcedencia)) $errores[] = 'El equipo de procedencia es obligatorio.';
if (empty($posicion))          $errores[] = 'La posición es obligatoria.';
if (empty($nombreTutor))       $errores[] = 'El nombre del tutor/a es obligatorio.';

if (empty($telefono)) {
    $errores[] = 'El teléfono es obligatorio.';
} elseif (!preg_match('/^[0-9]{9}$/', preg_replace('/\s+/', '', $telefono))) {
    $errores[] = 'El teléfono debe tener 9 dígitos.';
}

if (empty($email)) {
    $errores[] = 'El correo electrónico es obligatorio.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores[] = 'El correo electrónico no es válido.';
}

// Anti-injection
foreach ([$nombreJugador, $nombreTutor, $email] as $campo) {
    if (preg_match('/[\r\n]/', $campo)) {
        $errores[] = 'Caracteres no permitidos detectados.';
        break;
    }
}

if (!empty($errores)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errores)]);
    exit;
}

$asunto  = '=?UTF-8?B?' . base64_encode('[Juventud Parla] Nueva Preinscripción 2026/2027') . '?=';
$cuerpo  = "=== NUEVA PREINSCRIPCIÓN – CD JUVENTUD PARLA ===\n";
$cuerpo .= "Fecha: " . date('d/m/Y H:i') . "\n\n";
$cuerpo .= "---- DATOS DEL JUGADOR/A ----\n";
$cuerpo .= "Nombre:              {$nombreJugador}\n";
$cuerpo .= "Fecha de nacimiento: {$fechaNac}\n";
$cuerpo .= "Equipo procedencia:  {$equipoProcedencia}\n";
if (!empty($especificarClub)) {
    $cuerpo .= "Club especificado:   {$especificarClub}\n";
}
$cuerpo .= "Posición:            {$posicion}\n\n";
$cuerpo .= "---- DATOS DEL TUTOR/A LEGAL ----\n";
$cuerpo .= "Nombre tutor/a:      {$nombreTutor}\n";
$cuerpo .= "Teléfono:            {$telefono}\n";
$cuerpo .= "Email:               {$email}\n\n";
$cuerpo .= "==========================================\n";
$cuerpo .= "Mensaje generado automáticamente desde juventudparla.es\n";

$headers  = "From: noreply@juventudparla.es\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$enviado = mail(DESTINO_EMAIL, $asunto, $cuerpo, $headers);

if ($enviado) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => '¡Preinscripción recibida! Nos pondremos en contacto contigo pronto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al enviar. Por favor, inténtalo de nuevo o contáctanos directamente.'
    ]);
}
