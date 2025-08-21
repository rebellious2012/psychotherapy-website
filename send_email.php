<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer classes
require 'lib/PHPMailer-master/src/Exception.php';
require 'lib/PHPMailer-master/src/PHPMailer.php';
require 'lib/PHPMailer-master/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Collect and sanitize input
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $specialist = filter_var(trim($_POST["specialist"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // 2. Validate input
    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        // Handle validation error
        http_response_code(400);
        echo "Пожалуйста, заполните все обязательные поля и введите действительный адрес электронной почты.";
        exit;
    }

    // Create an instance; passing `true` enables exceptions
    $mail = new PHPMailer(true);

    try {
        // 3. Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                   // Enable verbose debug output for testing
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'psyhelper.de';                         // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'support@psyhelper.de';                 // SMTP username
        $mail->Password   = '1234567890';                           // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Enable implicit SMTPS encryption
        $mail->Port       = 465;                                    // TCP port to connect to
        $mail->CharSet = "UTF-8";                                   // Set charset to UTF-8

        // 4. Recipients
        $mail->setFrom('support@psyhelper.de', 'PsyHelper Form');
        $mail->addAddress('info777institut@gmail.com', 'PsyHelper Admin'); // Add a recipient
        $mail->addReplyTo($email, $name);

        // 5. Content
        $subject = "Новая заявка с контактной формы от " . $name;
        $email_body = "<html><head><style>";
        $email_body .= "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }";
        $email_body .= "h2 { color: #2D1B14; }";
        $email_body .= ".container { border: 1px solid #FFD700; padding: 20px; border-radius: 10px; max-width: 600px; }";
        $email_body .= "p { margin-bottom: 10px; }";
        $email_body .= "strong { color: #2D1B14; }";
        $email_body .= "</style></head><body>";
        $email_body .= "<div class='container'>";
        $email_body .= "<h2>Новое сообщение с сайта</h2>";
        $email_body .= "<p><strong>Имя:</strong> " . htmlspecialchars($name) . "</p>";
        $email_body .= "<p><strong>Email для ответа:</strong> " . htmlspecialchars($email) . "</p>";
        if (!empty($specialist)) {
            $email_body .= "<p><strong>Выбранный специалист:</strong> " . htmlspecialchars($specialist) . "</p>";
        }
        $email_body .= "<p><strong>Сообщение:</strong></p>";
        $email_body .= "<p>" . nl2br(htmlspecialchars($message)) . "</p>";
        $email_body .= "</div>";
        $email_body .= "</body></html>";

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $email_body;
        $mail->AltBody = strip_tags($email_body); // Plain text version

        $mail->send();

        // 6. Redirect to a thank you page
        header("Location: thank_you.html");
        exit;

    } catch (Exception $e) {
        // Handle mail server error
        http_response_code(500);
        // For security, don't show detailed error to user.
        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        echo "К сожалению, произошла ошибка при отправке вашего сообщения. Пожалуйста, попробуйте еще раз позже.";
        exit;
    }

} else {
    // 7. Forbid access if not POST
    http_response_code(403);
    echo "Доступ запрещен.";
    exit;
}
?>
