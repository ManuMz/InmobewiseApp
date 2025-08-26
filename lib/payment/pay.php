<?php
    header('Access-Control-Allow-Origin: *');
    class payObject {
        public $url;
        public $id;
        public $status;
    }
    
    error_reporting(E_ALL ^ E_NOTICE);
    include "Openpay/Openpay.php";

    // Obtener valores de POST
    $total = $_POST['total'];
    $name = $_POST['name'];
    $email = $_POST['email'];

    // Validar correo electrónico
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $email = 'info@arvis.mx';
    }

    $phone_number = $_POST['phone_number'];
    $calle = $_POST['calle'];
    $asentamiento = $_POST['asentamiento'];
    $referencias = $_POST['referencias'];
    $cp = $_POST['cp'];
    $noExt = $_POST['noExt'];
    $noInt = $_POST['noInt'];
    $state = $_POST['estado'];
    $municipio = $_POST['municipio'];
    $ciudad = $_POST['ciudad'];
    $descriptioncharge = "Compra en INMOBEWISE.";
    $redirect_url = "https://arvispace.com/resources/app/exitoCompraProduccion.html";

    try {
        // Modo de producción (false para pruebas, true para producción)
        Openpay::setProductionMode(false);

        // Instancia de Openpay con tus credenciales
        $openpay = Openpay::getInstance('msyosapf08kjvqgnrzgf', 'sk_48e6a002ead84f8987f3f0b5eb6c3553');

        // Crear objeto cliente
        $customerData = array(
            'name' => $name,
            'last_name' => $name, // Puedes ajustar esto si tienes un apellido específico
            'phone_number' => $phone_number,
            'email' => $email,
            'address' => array(
                'line1' => $calle . ' int ' . $noInt . ' ext ' . $noExt,
                'line2' => $asentamiento,
                'postal_code' => $cp,
                'state' => $state,
                'city' => $ciudad,
                'country_code' => 'MX'
            )
        );

        // Crear solicitud de cargo
        $chargeRequest = array(
            'method' => 'card',
            'amount' => $total,
            'description' => $descriptioncharge,
            'customer' => $customerData,
            'send_email' => false,
            'confirm' => false,
            'redirect_url' => $redirect_url
        );

        // Crear el cargo
        $charge = $openpay->charges->create($chargeRequest);

        // Manejo de respuesta del cargo
        $myObj = new payObject();
        $myObj->url = $charge->payment_method->url ?? ''; // El campo 'url' puede no existir, manejarlo con precaución
        $myObj->id = $charge->id;
        $myObj->status = $charge->status;
        $myJSON = json_encode($myObj);
        echo $myJSON;
    } catch (OpenpayApiTransactionError $e) {
        echo 'ERROR on the transaction: ' . $e->getMessage() . ' [error code: ' . $e->getErrorCode() . ', HTTP code: ' . $e->getHttpCode() . ']';
    } catch (OpenpayApiRequestError $e) {
        echo 'ERROR on the request: ' . $e->getMessage() . ' [error code: ' . $e->getErrorCode() . ', HTTP code: ' . $e->getHttpCode() . ']';
    } catch (OpenpayApiConnectionError $e) {
        echo 'ERROR while connecting to the API: ' . $e->getMessage();
    } catch (OpenpayApiAuthError $e) {
        echo 'ERROR on the authentication: ' . $e->getMessage();
    } catch (OpenpayApiError $e) {
        echo 'ERROR on the API: ' . $e->getMessage();
    } catch (Exception $e) {
        echo 'Error on the script: ' . $e->getMessage();
    }
?>
