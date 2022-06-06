<?php // то что будет запускаться php файл

$name = $_POST['name']; // здесь name должно совпадать с name в формах и инпутах
$phone = $_POST['phone']; // внутрь переменной $phone будет клаться сообщение $_POST['phone']
$email = $_POST['email'];  // некоторые переменые не подойдут в качестве названия -mail,

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;  
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // SMTP сервер есть у всех почт и с пом него и буд раб отпр писем
$mail->Host = 'smtp.gmail.com';  // настройка того SMTP servers почтового ресурса
$mail->SMTPAuth = true;                               // разр на вход через ввод аккаунта
$mail->Username = 'lecsni4@gmail.com';                 // Наш логин
$mail->Password = 'zctishwfiwmyamjx';                 // Наш пароль от ящика но лучше использовать пароль для приложений
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to порт исполь SMTP сервера
 
$mail->setFrom('lecsni4@gmail.com', 'Команда магазина Pulse');   // От кого письмо 
$mail->addAddress('lonax51564@roxoas.com');     // куда будет падать письмо
//$mail->addAddress('ellen@example.com');               // Можно добавлять доп почты куда будет падать письмо 
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Можно добавлять файлы к письму, кот лежат в директории
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // письмо придет в формате HTML
// Верстка письма, Карл! 
$mail->Subject = 'Данные'; // это синтаксис php
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br> 
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';
// . - склеивание строк, кокатенацию / и использ переменные для вставки инфы
if(!$mail->send()) { // ajax запрос
    return false;
} else {
    return true;
}

?>