let agreements = {
    data() {
        return {
            buttonAccept:{
                type:'primary-button-block',
                content:'Aceptar',
                typeButton:'button'
            }
        }
    },
    components:{
        'primary-button-block':primaryButtonBlock
    },
    methods: {
        acceptAgreements(){
            comunicateWebView("agreements","");
            //comunicateWebView("close", ""); //Ensure the terms close
        }
    },
    template:`
        <div class="container">
        
            <h1 class="text-center Lousie-George-Bold">AVISO DE PRIVACIDAD</h1>

            <div class="terms">
                <p>
                    <p>
                    Este Contrato establece los términos y condiciones generales (en adelante únicamente TÉRMINOS Y CONDICIONES) aplicables al uso de los contenidos, productos y servicios ofrecidos a través de la aplicación móvil INMOBEWISE.  Al usar INMOBEWISE, usted acepta los presentes términos y condiciones y sus políticas de Privacidad. Si usted no acepta estar vinculado a los términos y condiciones establecidos en este contrato, deberá abstenerse de utilizar INMOBEWISE.
                    </p>
                    <p>
                 INMOBEWISE es una aplicación móvil de comercio electrónico u online, donde las personas usuarias pueden vender y comprar diversos productos usando distintas soluciones de pago y envío.
                    </p>
                    <p>
                 INMOBEWISE conecta a las personas interesadas en realizar transacciones para la comercialización de bienes muebles o mercancías diversas. INMOBEWISE brinda una experiencia interactiva y tecnológica a sus usuarios, utilizando en sus procesos de comercialización técnicas de Realidad Aumentada que permiten la aplicación de elementos virtuales sobre una representación de la realidad física, a través de modelos en 3D, lo que implica una ventaja tanto para el que vende como el que compra.
                    </p>
                </p>
                <p>
                    <h6>I.- DEL OBJETO.</h6>
                    <p>    
                    El objeto del presente documento es regular el acceso y uso de la aplicación móvil INMOBEWISE. 
                    </p>
                    <p>
                 INMOBEWISE se reserva el derecho de modificar en cualquier momento y sin previo aviso, la presentación, los contenidos, la funcionalidad, los productos, los servicios y la configuración que pudiera estar contenida en dicha aplicación móvil.
                    </p>
                    <p>
                 INMOBEWISE también podrá, a su entera discreción, dar por terminados los servicios que ofrece y retirar cualquiera de sus contenidos.
                    </p>
                    <p>
                    Igualmente, INMOBEWISE se reserva la facultad de modificar, agregar, cambiar o eliminar parte de los presentes términos y condiciones y sus Políticas de Privacidad, razón por la cual se le recomienda revisar los términos y condiciones, así como sus Políticas de Privacidad regularmente, para conocer las modificaciones que se hayan realizado. La versión modificada de los términos y condiciones será publicada a través de la aplicación móvil. Si Usted no está de acuerdo con los términos y condiciones modificados deberá dejar de utilizar INMOBEWISE y los servicios que ofrece. El uso continuado de INMOBEWISE después de que los términos y condiciones modificados sean publicados, constituirá su aceptación a los mismos.
                    </p>
                </p>

                <p>
                    <h6>2.- DE LOS USUARIOS DE INMOBEWISE.</h6>
                    <p>
                    El acceso o utilización de INMOBEWISE, así como los recursos habilitados para interactuar entre INMOBEWISE y los usuarios, tales como espacios para realizar publicaciones o comentarios confiere la condición de usuario de la aplicación móvil, por lo que quedará sujeto a los términos y condiciones, así como a sus posteriores modificaciones.
                    </p>
                    <p>
                    El uso de INMOBEWISE está dirigido principalmente a usuarios residentes en la República Mexicana, por lo cual INMOBEWISE no asegura que la aplicación móvil cumpla total o parcialmente con la legislación de otros países, de forma que si el usuario reside o tiene su domicilio establecido en otro país y decide acceder o utilizar INMOBEWISE, lo hará bajo su propio riesgo y responsabilidad y deberá asegurarse de que tal acceso o navegación cumple con la legislación local aplicable, no asumiendo INMOBEWISE  ninguna responsabilidad que se pueda derivar de dicho acto.
                    </p>
                    <p>
                    El uso de INMOBEWISE está dirigido exclusivamente a personas que cuentan con la mayoría de edad (18 años cumplidos), con capacidad legal para otorgar contratos legalmente válidos según las leyes mexicanas, por lo que los menores de 18 años no están autorizados para utilizar INMOBEWISE. Al tratarse de una aplicación móvil dirigido a personas que cuentan con mayoría de edad, el usuario manifiesta ser mayor de edad y disponer de capacidad jurídica necesaria para sujetarse a los presentes términos y condiciones, por lo que INMOBEWISE no asume ninguna responsabilidad por el incumplimiento de este requisito.
                    </p>
                    <p>
                    El solo acceso a la aplicación móvil INMOBEWISE, no supone el establecimiento de ningún tipo de relación entre INMOBEWISE y el usuario.
                    </p>
                </p>

                <p>
                    <h6>3.- REGISTRO Y CUENTA.</h6>
                    <p>
                    Para acceder a la aplicación INMOBEWISE, el usuario acepta proporcionar los datos personales que le sean requeridos y completar el formulario correspondiente. Al crear su cuenta, deberá facilitar determinada información la cual deberá ser correcta y completa, recibiendo un número de cuenta virtual y la contraseña inicial que le corresponda. Es responsabilidad exclusiva del Usuario:
                    </p>
                    <ol type=a>
                    <li>Que sus datos de registro sean correctos y actualizados. Sin perjuicio de la información brindada en el formulario, INMOBEWISE podrá solicitar y/o consultar información adicional para corroborar la identidad de la Persona Usuaria.
                    <li>Mantener la confidencialidad y seguridad de su cuenta de usuario, incluyendo la de su contraseña y de toda la actividad que lleve a cabo con su cuenta; el usuario acepta que la cuenta es personal e intransferible.
                    <li>Actualizar y comprobar frecuentemente su contraseña.
                    <li>Notificar de forma inmediata a INMOBEWISE acerca de cualquier uso no autorizado de su cuenta de usuario o de su contraseña, o cualquier otra violación a la seguridad de éstos, con el fin de proceder a su cancelación inmediata.
                    </ol>
                    <p>
                 INMOBEWISE podrá rechazar una solicitud de registro o bien cancelar un registro ya aceptado, sin que esto genere derecho a un resarcimiento. No podrá registrarse nuevamente en INMOBEWISE la persona que hayan sido inhabilitada previamente.
                    </p>
                    <p>
                    En caso de detectarse el uso de mas de una cuenta, se podrán aplicar retenciones, débitos o cualquier otra medida si se considera que esa acción puede perjudicar al resto de las personas que usan INMOBEWISE, más allá de las sanciones que pudieran corresponder.
                    </p>
                </p>

                <p>
                    <h6>4.- PROHIBICIONES DE USO</h6>
                    <p>
                    Al utilizar INMOBEWISE, el usuario deberá abstenerse de:
                    </p>
                    <ul>
                    <li>Utilizar mecanismos o herramientas automatizadas o tecnología similar cuya finalidad sea realizar la extracción, obtención o recopilación, directa o indirecta, de cualquier información contenida en la aplicación móvil.
                    <li>Cualquier intento de modificación, adaptación, traducción, o conversión de los formatos o programas de la aplicación móvil o a los contenidos de ésta.
                    <li>Utilizar los códigos HTML de manera indebida.
                    <li>Recopilar y utilizar las descripciones de los productos.
                    <li>Copiar, imitar, replicar para su uso en servidores espejo, reproducir, distribuir, publicar, descargar, mostrar o transmitir cualquier contenido de INMOBEWISE (incluyendo marcas registradas) en cualquier forma o por cualquier medio; de manera enunciativa más no limitativa incluye los siguientes: medios electrónicos, mecánicos, medios de fotocopiado, grabación o cualquier otro medio.
                    <li>Acceder a datos no destinados al usuario o iniciar sesión en un servidor o cuenta en la que el usuario no tenga autorizado el acceso.
                    <li>Intentar interferir con el servicio a cualquier usuario, huésped o red, incluyendo, sin limitación, a través del envío de virus a la aplicación móvil, sobrecarga, inundación, spam, bombardeo de correo o fallas.
                    <li>Falsificar cualquier encabezado de TCP/IP o cualquier parte de la información del encabezado en cualquier correo electrónico o grupo de noticias.
                    <li>Subir, publicar, enviar, transmitir o poner a disposición cualquier contenido que sea ilegal, dañino, ofensivo, fraudulento, engañoso, amenazador, hostil, abusivo, tortuoso, difamatorio, vulgar, obsceno, censurable, calumnioso, que induzca al error, invasivo de la privacidad de terceros, u objetable de otro modo.
                    <li>Utilizar la aplicación móvil para acosar, amenazar, o intimidar a cualquier persona.
                    <li>Subir, publicar, enviar, transmitir o poner a disposición cualquier contenido que suponga una violación de los derechos de autor, marcas, u otros derechos de propiedad intelectual en cualquier jurisdicción.
                    <li>Perjudique o interfiera en las aplicaciones normales de INMOBEWISE, como el envío o la transmisión de virus, gusanos o troyano.
                    <li>Robar o alterar el código fuente de la aplicación móvil.
                    </ul>
                    <p>
                    El usuario es responsable de utilizar INMOBEWISE de acuerdo con la forma en que fue diseñada, comprometiéndose el usuario a utilizar la información, contenidos o servicios ofrecidos a través de la aplicación móvil sin contravenir los presentes términos y condiciones, la moral y el orden público y se abstendrá de realizar cualquier acto que pueda suponer una afectación a los derechos de terceros, o perjudique de algún modo el funcionamiento de INMOBEWISE.
                    </p>
                    <p>
                    Las violaciones al sistema o red de seguridad pueden dar lugar a responsabilidad civil o penal, por lo que INMOBEWISE solicitará la investigación de tales violaciones y cooperará con las autoridades en la persecución de usuarios que lleven a cabo tales violaciones.
                    </p>
                    <p>
                 INMOBEWISE no será responsable de las opiniones vertidas por los usuarios a través de los comentarios o publicaciones que estos realicen, sin embargo, se reserva el derecho de retirar todos aquellos comentarios y publicaciones que vulneren la Ley, el respeto a la dignidad de la persona, que sean discriminatorios, atente contra los derechos de tercero o el orden público, o bien que a su juicio no resulten adecuados para su publicación.
                    </p>
                    <p>
                    Igualmente, INMOBEWISE podrá a su entera discreción y en cualquier momento, por motivo justificado o no, y sin tener que notificar de forma anticipada su decisión, suspender el acceso del usuario a cualquiera de, o a todos, los servicios ofrecidos en la aplicación móvil. 
                    </p>
                    <p>
                    En caso de que el usuario decida anular su cuenta, deberá dejar de acceder a, y no utilizar más la aplicación móvil.  INMOBEWISE no tendrá obligación alguna de devolver la información facilitada por el usuario, su cuenta, su número de cuenta virtual o contraseña. El usuario asume y acepta que INMOBEWISE podrá  conservar copia de la información del usuario y revelar dicha información a terceros si lo considera necesario para: a) proteger la integridad de la aplicación móvil; b) proteger los derechos de INMOBEWISE; c) cumplir con una orden judicial; d) cumplir cualquier trámite legal; e) hacer valer los derechos y acciones que asisten  a INMOBEWISE al tenor de este contrato; y e)  satisfacer cualquier petición relativa a la infracción de derechos de terceros. 
                    </p>
                </p>

                <p>
                    <h6>5.- POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS</h6>
                    <p>
                    De conformidad con lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de Particulares, INMOBEWISE se compromete a adoptar las medidas necesarias que estén a su alcance para asegurar la privacidad de los datos personales recabados de forma que se garantice su seguridad, se evite su alteración, pérdida o tratamiento no autorizado. Asimismo, sus datos personales serán tratados de conformidad con los principios de licitud, calidad, finalidad, lealtad y responsabilidad. Todo tratamiento de datos personales quedará sujeto al consentimiento de su titular en términos del aviso de privacidad de INMOBEWISE.
                    </p>
                    <p>
                    Los datos financieros que proporcione el usuario a través de la aplicación móvil utilizando los mecanismos habilitados para tal efecto, se tratarán con la mayor diligencia y cuidado.
                    </p>
                    <p>
                 INMOBEWISE procurará que los datos personales contenidos en las bases de datos o archivos que en su caso se utilicen, sean pertinentes, correctos y actualizados para los fines para los cuales fueron recabados.
                    </p>
                    <p>
                    El tratamiento de los datos personales se limitará al cumplimiento de las finalidades previstas en el <b>Aviso de Privacidad</b>, el cual encontrará disponible en la siguiente dirección electrónica: <a href="#">https:/ INMOBEWISE.com/ArvisApp/Testing/v1/agreements</a>.
                    </p>
                </p>

                <p>
                    <h6>6.- TRANSFERENCIA DE DATOS A TERCEROS.</h6>
                    <p>
                 INMOBEWISE transferirá los datos proporcionados por el usuario a terceros, únicamente cuando resulte necesario para efectos de envío de productos y pago.
                    </p>
                </p>

                <p>
                    <h6>7.- POLÍTICA EN MATERIA DE PROPIEDAD INTELECTUAL E INDUSTRIAL.</h6>
                    <p>
                 INMOBEWISE es titular de todos los derechos de propiedad intelectual o industrial de la aplicación móvil, entendiendo por este el código fuente que hace posible su funcionamiento, material gráfico, imágenes, documentos, archivos de audio o video, logotipos, marcas, combinaciones de colores, estructuras, diseños y demás elementos que lo distinguen. Serán por consiguiente protegidas por la legislación mexicana en materia de propiedad intelectual e industrial y la que resulte aplicable. Por consiguiente, queda expresamente prohibida la reproducción, distribución, o difusión de los contenidos de la aplicación móvil, con fines comerciales, en cualquier soporte y por cualquier medio, sin la autorización de INMOBEWISE.
                    </p>
                    <p>
                    El usuario se compromete a respetar los derechos de propiedad intelectual e industrial de INMOBEWISE. No obstante, además de poder visualizar los elementos de la aplicación móvil, podrá imprimirlos, copiarlos o almacenarlos, siempre y cuando sea exclusivamente para su uso estrictamente personal.
                    </p>
                    <p>
                    Los usuarios se comprometen a respetar los derechos de propiedad intelectual e industrial, marcas, diseños etc. que sean propiedad de terceros y que utilicen la aplicación móvil para venta de sus productos.
                    </p>
                    <p>
                    Por otro lado, el usuario, se abstendrá de suprimir, alterar o manipular cualquier elemento, archivo o contenido de la aplicación móvil, y por ningún motivo realizará actos tendientes a vulnerar la seguridad, los archivos o bases de datos que se encuentren protegidos, ya sea a través de un acceso restringido mediante un usuario y contraseña, o porque no cuente con los permisos para visualizarlos, editarlos o manipularlos.
                    </p>
                    <p>
                    En caso de que el usuario o algún tercero consideren que cualquiera de los contenidos de la aplicación móvil suponga una violación de los derechos de protección de propiedad industrial o intelectual, deberá comunicarlo inmediatamente a INMOBEWISE a través de los datos de contacto disponibles en la aplicación móvil.
                    </p>
                </p>
                
                <p>
                    <h6>8.- RENUNCIA DE GARANTÍAS SOBRE EL ACCESO Y NAVEGACIÓN EN LA APLICACIÓN MÓVIL.</h6>
                    <p>
                    El usuario acepta asumir todos los riesgos asociados y/o derivados del uso de la aplicación móvil, que puedan causar daños directos, indirectos, accidentales, especiales, consecuentes, ejemplares o punitivos en que pueda incurrir o que sean en su agravio, independientemente de su causa, incluyendo, entre otros, los riesgos de pérdidas económicas, daños a la propiedad, gastos de negociación con otros usuarios de la aplicación móvil (ya sean desconocidos, menores, extranjeros o personas que actúan bajo falsa identidad), pérdida de beneficios, cualquier pérdida de datos, cualquier costo de adquisición o sustitución de bienes o servicios, daños por no mantener la seguridad de sus contraseña o de los detalles de su cuenta o por cualquier otro daño, por lo que INMOBEWISE no asume ninguna responsabilidad respecto a los mismos. 
                    </p>
                    <p>
                 INMOBEWISE proporciona los servicios de la aplicación móvil tal como están y según disponibilidad, por lo que INMOBEWISE, sus directivos, empleados, accionistas, licenciantes (“afiliados”), no proporcionan garantía de ningún tipo, ya sea expresa o implícita, incluyendo sin limitar, garantías de comercialización, calidad comercial, la aptitud para un propósito particular, no infracción o cualquier garantía o condición que surja de usos del comercio.
                    </p>
                    <p>
                 INMOBEWISE, sus directivos, empleados, accionistas, licenciantes (“afiliados”), tampoco garantizan que la aplicación móvil: a)  cumpla con los requisitos que usted espera; b) la continuidad y disponibilidad de los contenidos, productos o servicios ofrecidos a través de la aplicación móvil, no obstante llevará a cabo las acciones que de acuerdo a sus posibilidades le permitan mantener  el buen funcionamiento de la aplicación móvil, sin que ello suponga alguna responsabilidad de parte de INMOBEWISE; c) que el funcionamiento de la aplicación móvil  sea puntual, seguro o libre de  errores; d) que el contenido de usuario se almacenará y/o transmitirá sin interrupciones o suspensiones; e) que cualquier producto, sitio, información, u otro material, ya sea en forma tangible o intangible, comprado u obtenido por usted a través de la aplicación móvil  cumplirá con sus expectativas o con cualquier estándar de calidad esperado; y e) que cualquier defecto en el funcionamiento u operación de la aplicación móvil o software relacionado será corregido. Cualquier material, información o dato obtenido o descargado a través del uso de la aplicación móvil es accedido a su propio riesgo y usted será enteramente responsable por cualquier daño a sus equipos informáticos y/o pérdida de datos que resulte de la descarga o acceso a esos materiales. Ningún consejo, declaración o información oral o escrita, provista a usted por parte de INMOBEWISE o sus afiliados, a través de la aplicación móvil creará ningún tipo de garantía que no esté expresamente enunciada en estos términos y condiciones.
                    </p>
                    <p>
                 INMOBEWISE tampoco se hace responsable de los daños que pudiera ocasionarse por el uso inadecuado de la aplicación móvil. En ningún caso INMOBEWISE será responsable por las pérdidas, daños o perjuicios de cualquier tipo que surjan por el solo acceso o utilización de la aplicación móvil.
                    </p>
                </p>

                <p>
                    <h6>9.- INDEMNIZACIÓN.</h6>
                    <p>
                    El usuario se compromete a indemnizar, defender en pleito y exonerar de toda responsabilidad a INMOBEWISE, así como a sus directivos, encargados, comerciales o empleados frente a las reclamaciones de terceros (en la indemnización se incluyen entre otros, los gastos de asistencia legal y costos judiciales) interpuestas o derivadas del acceso por parte del usuario de la aplicación móvil  y el uso que éste haga del mismo, la información facilitada por el usuario, o el incumplimiento  por parte de éste de los términos y condiciones de este contrato. INMOBEWISE se reserva el derecho, a su propio costo, de asumir la defensa exclusiva y control de cualquier asunto sujeto a indemnización por parte del usuario.
                    </p>
                </p>

                <p>
                    <h6>10.- SANCIONES.</h6>
                    <p>
                    En caso de que la Persona Usuaria incumpliera una ley o los Términos y Condiciones, INMOBEWISE podrá advertir, suspender, restringir o inhabilitar temporal o definitivamente su cuenta, sin perjuicio de otras sanciones que se establezcan en las reglas de uso particular de los servicios de INMOBEWISE.
                    </p>
                </p>

                <p>
                    <h6>11.- RESPONSABILIDAD.</h6>
                    <p>
                 INMOBEWISE será responsable por defecto en la prestación de su servicio, en la medida en que le sea imputable y con el alcance previsto en las leyes vigentes.
                    </p>
                </p>

                <p>
                    <h6>12.- TARIFAS.</h6>
                    <p>
                 INMOBEWISE podrá cobrar por sus servicios y la Persona Usuaria se compromete a pagarlos a tiempo. 
                    </p>
                    <p>
                 INMOBEWISE Podrá modificar o eliminar las tarifas en cualquier momento. De la misma manera, INMOBEWISE podrá modificar las tarifas temporalmente por promociones en favor de las Personas Usuarias. 
                    </p>
                    <p>
                    Para conocer el detalle de las tarifas de cada servicio, las Personas Usuarias deberán consultar los términos y condiciones correspondientes
                    </p> 
                </p>

                <p>
                    <h6>13.- LEGISLACIÓN Y JURISDICCIÓN APLICABLE.</h6>
                    <p>
                 INMOBEWISE se reserva el derecho de ejercitar las acciones civiles o penales que considere necesarias por la utilización indebida de la aplicación móvil, sus contenidos, productos o servicios, o por el incumplimiento de los presentes términos y condiciones.
                    </p>
                    <p>
                    La relación entre el usuario y INMOBEWISE se regirá por la legislación vigente en México, específicamente en el Estado de Tlaxcala, renunciando el usuario a cualquier otra jurisdicción que pudiera llegar a corresponder. De surgir cualquier controversia en relación con la interpretación y/o aplicación de los presentes términos y condiciones, las partes se someterán a la jurisdicción ordinaria de los Tribunales que correspondan conforme a derecho en la entidad federativa de Tlaxcala.
                    </p>
                </p>
            </div>
            
            <!--
            <p>



                CONSULTORES EN DESARROLLO TECNOLOGICO DE SISTEMAS DTI S.A. DE C.V., es una sociedad mercantil de nacionalidad mexicana, con domicilio en Carretera Industrias Oriente 2-C, colonia Centro, localidad Panzacola, C.P. 90796, Papalotla de Xicohtencatl, Tlaxcala, es la responsable del uso y protección de los datos personales que proporcione para tener acceso y utilizar los servicios de <i class="Lousie-George-Bold">“INMOBEWISE”</i>, Aplicación Móvil  de Realidad Aumentada que pone a disposición diversos servicios, datos que serán protegidos conforme a lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares; al respecto le informamos lo siguiente: 
                Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades, que son necesarias para el servicio que solicita: identificación y localización; información sobre productos y servicios; prestación de servicios en caso de concretarse; validar la veracidad y calidad de la información proporcionada por usted; dar seguimiento a tu proceso de compra y entrega de los productos adquiridos; notificación sobre actualizaciones de la aplicación, marcas inscritas y promociones; atender dudas, quejas, comentarios, sugerencias, soporte y aclaraciones; para realizar seguimiento sobre la interacción de su cuenta con las diferentes marcas; Supervisar y mejorar nuestra respuesta del servicio de asistencia al cliente; conservar su información para el cumplimiento de disposiciones legales y requerimientos de autoridades y/o entidades regulatorias.
                De manera adicional se utilizarán para: publicidad y mercadotecnia; notificaciones; prospección comercial; para conocer sus hábitos de consumo, gustos, preferencias.
                Para conocer mayor información sobre los términos y condiciones en que serán tratados sus datos personales, y la forma en que podrá ejercer sus derechos ARCO, puede consultar el <a href="#">aviso de privacidad integral</a>. 


                
            </p>-->
            <primary-button-block
                @clicked-button="acceptAgreements"
                :field="buttonAccept"
            ></primary-button-block>
            <br>
            <br>
        </div>
    `
};