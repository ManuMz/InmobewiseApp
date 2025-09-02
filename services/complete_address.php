<?php
    include_once("error_class.php");
    include_once("Conexion.php");

    $exclude_words = 
    [
        'Colonia',
        'colonia'
    ];

    $link = conectar();
    /**
     * Asentamiento y estado obtenido de google maps
     */
    $asentamiento = $_POST['asentamiento'];
    $estado = $_POST['estado'];
    $municipio = $_POST['municipio'];

    /**
     * Sentencia sql para obtener cp valido de nuestra bd debido a que la de google no esta actualizada
     * Solo devuelve el primer valor encontrado
     */
    $sql_statement = "
        SELECT 
            estados.d_codigo AS postal_code
        FROM 
            estados 
        WHERE 
            LOWER(estados.d_asenta) LIKE LOWER('%$asentamiento%') 
        AND 
            LOWER(estados.d_estado) LIKE LOWER('%$estado%')
        AND 
            LOWER(estados.D_mnpio) LIKE LOWER('%$municipio%')
        LIMIT 1;
    ";

    $result_query = mysqli_query($link, $sql_statement);

    if($result_query){
        $row = mysqli_fetch_assoc($result_query);

        $result = new stdClass();
        $result->code = 200;
        $result->status = "success";
        $result->postal_code = $row['postal_code'];

        if(is_null($result->postal_code)){
            $words = explode(" ",$asentamiento);
            $words_municipio = explode(" ",$municipio);

            foreach ($words as $word) {
                if(!in_array($word, $exclude_words)){
                    $sql_statement = "
                        SELECT 
                            estados.d_codigo AS postal_code
                        FROM 
                            estados 
                        WHERE 
                            LOWER(estados.d_asenta) LIKE LOWER('%$word%') 
                        AND 
                            LOWER(estados.d_estado) LIKE LOWER('%$estado%')
                        AND 
                            LOWER(estados.D_mnpio) LIKE LOWER('%$municipio%')
                        LIMIT 1;
                    ";

                    $result_query = mysqli_query($link, $sql_statement);
                    $row = mysqli_fetch_assoc($result_query);
                    if(!is_null($row['postal_code'])){
                        $result->postal_code = $row['postal_code'];
                        break;
                    }
                }
            }
        }

        if(is_null($result->postal_code)){
            $words = explode(" ",$asentamiento);
            $words_municipio = explode(" ",$municipio);

            foreach ($words as $word) {
                if(!in_array($word, $exclude_words)){
                    foreach ($words_municipio as $word_municipio) {
                        $sql_statement = "
                            SELECT 
                                estados.d_codigo AS postal_code
                            FROM 
                                estados 
                            WHERE 
                                LOWER(estados.d_asenta) LIKE LOWER('%$word%') 
                            AND 
                                LOWER(estados.d_estado) LIKE LOWER('%$estado%')
                            AND 
                                LOWER(estados.D_mnpio) LIKE LOWER('%$word_municipio%')
                            LIMIT 1;
                        ";

                        $result_query = mysqli_query($link, $sql_statement);
                        $row = mysqli_fetch_assoc($result_query);
                        if(!is_null($row['postal_code'])){
                            $result->postal_code = $row['postal_code'];
                            break;
                        }
                    }
                    if(!is_null($result->postal_code)){
                        break;
                    }
                }
            }
        }
        
        if(is_null($result->postal_code)){
            $sql_statement = "
                SELECT 
                    estados.d_codigo AS postal_code
                FROM 
                    estados 
                WHERE 
                    LOWER(estados.d_estado) LIKE LOWER('%$estado%')
                AND 
                    LOWER(estados.D_mnpio) LIKE LOWER('%$word_municipio%')
                LIMIT 1;
            ";

            $result_query = mysqli_query($link, $sql_statement);
            $row = mysqli_fetch_assoc($result_query);
            if(!is_null($row['postal_code'])){
                $result->postal_code = $row['postal_code'];
            }
        }

        echo json_encode($result);
    }else{
        /**
         * Devolver error
         */
        echo ErrorToJson(404,"informacion no encontrada");
    }
?>