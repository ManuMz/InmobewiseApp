<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=UTF-8');
    include('Conexion.php');

    $cp = $_REQUEST['cp']; 
    $p_nombrebodega = 'InmobeWise';

    $link = conectar();
    $categorias = array();

    try 
    {
        if ($cp) 
        {
            $queryBodegas = mysqli_query($link, "CALL AR_CONSULTAR_ID_BODEGA_ARTHOPIA_ALL('$p_nombrebodega', '$cp')");
            
            while ($bodega = mysqli_fetch_assoc($queryBodegas)) 
            {
                $idBodega = $bodega['idBodega'];
                mysqli_next_result($link);

                // Obtener categorías específicas para la bodega con el ID recuperado
                $queryCategorias = mysqli_query($link, "CALL ASAR_categoriasB2('$idBodega')");
                while ($categoria = mysqli_fetch_assoc($queryCategorias)) 
                {
                    $subCategorias = getSubCategorias($idBodega, $categoria['idCategoria'], $link);
                    $categorias[] = array_merge($categoria, ['SubCategorias' => $subCategorias]);
                }
            }
        } 
    
        else 
        {
            // Cuando el cp es '12345', se obtienen todas las categorías sin filtrar por nombre de bodega
            // $queryCategorias = mysqli_query($link, "CALL ASAR_categorias()");
            // while ($categoria = mysqli_fetch_assoc($queryCategorias)) 
            // {
            //     $subCategorias = getSubCategorias(null, $categoria['idCategoria'], $link);
            //     $categorias[] = array_merge($categoria, ['SubCategorias' => $subCategorias]);
            // }
        }
        echo json_encode($categorias);
    } 
    catch (Exception $e) 
    {
        echo json_encode(['error' => $e->getMessage()]);
    }

    // Función para obtener subcategorías
    function getSubCategorias($idBodega, $idCategoria, $link) 
    {
        mysqli_next_result($link);
        $query = $idBodega ? "CALL ASAR_subCategoriasB2('$idCategoria', '$idBodega')" : "CALL ASAR_subCategorias('$idCategoria')";
        $result = mysqli_query($link, $query);

        $subCategorias = [];
        while ($subCat = mysqli_fetch_assoc($result)) 
        {
            $productos = getProductos($idBodega, $subCat['idProducto'], $link);
            $subCategorias[] = array_merge($subCat, ['Productos' => $productos]);
        }
        return $subCategorias;
    }

    // Función para obtener productos
    function getProductos($idBodega, $idSubCategoria, $link) 
    {
        mysqli_next_result($link);
        $query = $idBodega ? "CALL ASAR_productosB2('$idSubCategoria', '$idBodega')" : "CALL ASAR_productos('$idSubCategoria')";
        $result = mysqli_query($link, $query);

        $productos = [];
        while ($producto = mysqli_fetch_assoc($result)) 
        {
            $caracteristicas = getCaracteristicas($producto['idProBodPre'], $link);
            $producto['Caracteristicas'] = $caracteristicas;
            $productos[] = $producto;
        }
        return $productos;
    }

    // Función para obtener características
    function getCaracteristicas($idProBodPre, $link) 
    {
        mysqli_next_result($link);
        $query = "CALL ASAR_caracteristicas('$idProBodPre')";
        $result = mysqli_query($link, $query);

        $caracteristicas = [];
        while ($caracteristica = mysqli_fetch_assoc($result)) {
            $imagenes = getImagenes($caracteristica['idCaracteristica'], $link);
            $caracteristica['imagenes'] = $imagenes;
            $caracteristicas[] = $caracteristica;
        }
        return $caracteristicas;
    }

    // Función para obtener imágenes
    function getImagenes($idCaracteristicas, $link) 
    {
        mysqli_next_result($link);
        $query = "CALL ASAR_imagenes('$idCaracteristicas')";
        $result = mysqli_query($link, $query);

        $imagenes = [];
        while ($imagen = mysqli_fetch_assoc($result)) 
        {
            $imagenes[] = $imagen;
        }
        return $imagenes;
    }
?>
