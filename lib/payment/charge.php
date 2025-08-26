<?php
//URL: /var/www/arvispace.com/lib/payment/charge.php
    header('Access-Control-Allow-Origin:*');
    error_reporting(E_ALL ^ E_NOTICE);
    //require('../../lib/BBVA/Bbva.php');
    require ('Openpay/Openpay.php');
    //include "Openpay/Openpay.php";
    class payObject{
        public $ammount;
        public $authorization;
        public $operation_type;
        public $transaction_type;
        public $creation_date;
        public $operation_date;
        public $description;
        public $status;
    }
    try{
        $id = $_POST['id'];
       
        //Bbva::setProductionMode(true); //solo comentar cuando se requiera probar en testing de lo contrario debe estar descomentado prod
        //$bbva = Bbva::getInstance('myn9qs5vps5yf5yxdn8r', 'sk_19dfa48bf607422a9b9be33810d50c18');//prod

        //$bbva = Bbva::getInstance('mawzpooirxgvuyupfczv', 'sk_1fc9e49b40464a078f54e8bfbe8ef80c');//testing
        // Modo de producción (false para pruebas, true para producción)
        Openpay::setProductionMode(false);
        // Instancia de Openpay con tus credenciales
        $openpay = Openpay::getInstance('msyosapf08kjvqgnrzgf', 'sk_48e6a002ead84f8987f3f0b5eb6c3553');
        
        //$charge = $bbva->charges->get($id);
        // Crear el cargo
        $charge = $openpay->charges->get($id);
        
        $myPay = new payObject();
        $myPay->ammount = $charge->amount;
        $myPay->authorization = $charge->authorization;
        $myPay->operation_type = $charge->operation_type;
        $myPay->transaction_type = $charge->transaction_type;
        $myPay->creation_date = $charge->creation_date;
        $myPay->operation_date = $charge->operation_date;
        $myPay->description = $charge->description;
        $myPay->status = $charge->status;

        
        $myJSON = json_encode($myPay);
        
        echo $myJSON;
        echo $myJSON;


        /*
        if($charge->error_message!=null){
            header('Location: '.$charge->payment_method->url);
        }else{
        }*/
    }
    catch (BbvaApiTransactionError $e) {
        //echo 'ERROR on the transaction: ' . $e->getMessage() .' [error code: ' . $e->getErrorCode() .', error category: ' . $e->getCategory() .', HTTP code: '. $e->getHttpCode() .', request ID: ' . $e->getRequestId();
    } catch (BbvaApiRequestError $e) {
        //echo 'ERROR on the request: ' . $e->getMessage() .' [error code: ' . $e->getErrorCode() .', error category: ' . $e->getCategory() .', HTTP code: '. $e->getHttpCode() .', request ID: ' . $e->getRequestId();
    } catch (BbvaApiConnectionError $e) {
         //echo 'ERROR while connecting to the API: ' . $e->getMessage();
    } catch (BbvaApiAuthError $e) {
         //echo 'ERROR on the authentication: ' . $e->getMessage();
    } catch (BbvaApiError $e) {
         //echo 'ERROR on the API: ' . $e->getMessage();
    } catch (Exception $e) {
         //echo 'Error on the script: ' . $e->getMessage();
    }
?>