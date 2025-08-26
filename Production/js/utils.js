function sortByKeyDesc(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}


function sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const comunicateWebView = function(action,params){
    let url = "";
    if (params != ""){
        url = "uniwebview://"+action+"?"+params;
    }else{
        url = "uniwebview://"+action;
    }
    window.location.replace(url);
}

function getParameterByName(name){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    timer:5000,
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    },
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
let html = ''+
    '<button class="roudend-button xl" style="margin-right:10px">'+
    '    <span><i class="icon-menu"></i></span>'+
    '</button>'+
'';

const createAviso = (text)=>{
    Toast.fire({
        title: '<label>'+text+'</label>'
    })
}

const createQuestion = (title,text,cancelButtonIsActive = true,okCallBack = () => {}, cancelCallBack = () => {}) => {
    Swal.fire({
        title:title,
        text: text,
        showCancelButton: cancelButtonIsActive,
        position: 'center',
        confirmButtonText: '<i class="icon-Correcto">',
        cancelButtonText: '<i class="icon-x"></i>',
        showClass: {
            popup: 'animate__animated animate__fadeInUp'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        },
      }).then((result) => {
        if (result.isConfirmed) {
            if(typeof okCallBack == 'function'){
                okCallBack()
            }
        }else{
            if(typeof cancelCallBack == 'function'){
                cancelCallBack()
            }
        }
    })

}
const getMobileOperatingSystem = () =>{
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/windows phone/i.test(userAgent)) {
        return "windows";
    }

    if (/android/i.test(userAgent)) {
        return "android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "ios";
    }

    return "unknown";
}