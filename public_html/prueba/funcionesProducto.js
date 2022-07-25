let productos;
let ordenes;

let productosCombo

let addProducts=[];

function cargarVerOrdenes() {

    $.ajax(
        {
            type: "GET",
            url: "prueba/listasOrdenes.html",
            async: true
        }
    ).done(function (data) {
        mostrarOrdenes();
        $('#container').html(data);
    }
    );
}

function mostrarOrdenes() {

    
    $.ajax(
        {
            type: "GET",
            asyc: true,
             
            url: "http://localhost:8080/api/prueba/orders"
        }
    ).done(function (data) {
        ordenes = data.data.ordenes;
        var tabla = "";

        for (var i = 0; i < ordenes.length; i++) {

            tabla += "<tr>";
            tabla += "<td id='idOrden' style='display:none'>" + ordenes[i].id + "</td>";
            tabla += "<td>" + ordenes[i].order_code + "</td>";
            tabla += "<td>" + ordenes[i].street_name+" "+
                              ordenes[i].address+" "+
                              ordenes[i].city+", "+
                              ordenes[i].state + "</td>";

            tabla += "<td>" + ordenes[i].total + "</td>";
            tabla += "<td>" + ordenes[i].last_update + "</td>";
            tabla += "<td><button class='btn btn-secondary text-white' data-bs-toggle='modal' data-bs-target='#modalDetalleOrden' onclick='cargarDetalleOrden(" + ordenes[i].id + ")'> <img src='assets/images/eye.png' height ='30' width='30'/></button></td>";         
            tabla += "</tr>";
        }
        tabla += "<tr></tr>";
        tabla += "<tr>";
        tabla += "<td></td>";
        tabla += "<td><strong>Total Pesos: "+data.data.total+ "</strong></td>";
        tabla += "<td><strong>Total Dolares: "+data.data.totalConvertido.USD.rate_for_amount+ "</strong></td>";
        tabla += "<td><strong>Total Euros: "+data.data.totalConvertido.EUR.rate_for_amount+ "</strong></td>";
        tabla += "<td><strong>Total Bolivares: "+data.data.totalConvertido.VES.rate_for_amount+ "</strong></td>";
        tabla += "</tr>";
        
        $('#tbOrdenes').html(tabla);
        
    });
    llenarComboProductos();
    
}

function busqueda(){
    var fecha = $("#txtSearch").val();
    var formData = new FormData();
    formData.append("fecha",fecha);
    $.ajax(
        {
            type: "POST",
            asyc: true,
            processData: false,
            contentType: false,
            data: formData, 
            url: "http://localhost:8080/api/prueba/ordersByDate"
        }
    ).done(function (data) {
        ordenes = data.data.ordenes;
        var tabla = "";

        for (var i = 0; i < ordenes.length; i++) {

            tabla += "<tr>";
            tabla += "<td id='idOrden' style='display:none'>" + ordenes[i].id + "</td>";
            tabla += "<td>" + ordenes[i].order_code + "</td>";
            tabla += "<td>" + ordenes[i].street_name+" "+
                              ordenes[i].address+" "+
                              ordenes[i].city+", "+
                              ordenes[i].state + "</td>";

            tabla += "<td>" + ordenes[i].total + "</td>";
            tabla += "<td>" + ordenes[i].last_update + "</td>";
            tabla += "<td><button class='btn btn-info text-white' data-bs-toggle='modal' data-bs-target='#modalDetalleOrden' onclick='cargarDetalleOrden(" + ordenes[i].id + ")'><img src='assets/images/eye.png' height ='30' width='30'/></button></td>";         
            tabla += "</tr>";
        }
        tabla += "<tr></tr>";
        tabla += "<tr>";
        tabla += "<td></td>";
        tabla += "<td><strong>Total Pesos: "+data.data.total+ "</strong></td>";
        tabla += "<td><strong>Total Dolares: "+data.data.totalConvertido.USD.rate_for_amount+ "</strong></td>";
        tabla += "<td><strong>Total Euros: "+data.data.totalConvertido.EUR.rate_for_amount+ "</strong></td>";
        tabla += "<td><strong>Total Bolivares: "+data.data.totalConvertido.VES.rate_for_amount+ "</strong></td>";
        tabla += "</tr>";
        
        $('#tbOrdenes').html(tabla);
        
    });
    llenarComboProductos();
    
}

function cargarDetalleOrden(id){
    
    var data = {
        order_id:id
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/prueba/order_id",
        async: true,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).done(function(data)
    {
        $('#txtOrden').val(data.data.order_code);
        $('#txtTelDetalle').val(data.data.phone);
        $('#txtCalleDetalle').val(data.data.street_name);
        $('#txtColDetalle').val(data.data.address);
        $('#txtCiudadDetalle').val(data.data.city);
        $('#txtEstadoDetalle').val(data.data.state);
        $('#txtSubtotal').val(data.data.subtotal);
        $('#txtTotal').val(data.data.total);
        $('#txtDescuento').val(data.data.discount);
        $('#txtFechaOrden').val(data.data.last_update);
        var tabla ="";
        for(var i=0; i< data.data.products.length; i++){
            tabla += "<tr>";
            tabla += "<td>" + data.data.products[i].title + "</td>";
            tabla += "<td>" + data.data.products[i].qty + "</td>";
            tabla += "<td>" + data.data.products[i].price + "</td>";
            tabla += "</tr>";
        }
        $('#tbProductosOrdenes').html(tabla);

        

    });       
    
}



function cargarVerProductos() {

    $.ajax(
        {
            type: "GET",
            url: "prueba/listas.html",
            async: true
        }
    ).done(function (data) {
        mostrarProductos();
        $('#container').html(data);
    }
    );
}

function mostrarProductos() {
    $.ajax(
        {
            type: "GET",
            asyc: true,
             
            url: "http://localhost:8080/api/prueba/products"
        }
    ).done(function (data) {
        productos = data.data;
        var tabla = "";

        for (var i = 0; i < productos.length; i++) {

            tabla += "<tr>";
            tabla += "<td>"+(i+1 )+"</td>";
            tabla += "<td id='idProducto' style='display:none'>" + productos[i].id + "</td>";
            tabla += "<td>" + productos[i].category + "</td>";
            tabla += "<td>" + productos[i].title + "</td>";
            tabla += "<td>" + productos[i].sale_count + "</td>";
            tabla += "<td>" + productos[i].price + "</td>";
            tabla += "<td><img width='75' height='100' src='" + productos[i].image_url + "'/></td>";            
            tabla += "</tr>";
        }
        var ctx= document.getElementById("myChart").getContext("2d");
        var myChart=new Chart(ctx,{
            type:"bar",
            data:{
                labels:[productos[0].title,productos[1].title,productos[2].title,productos[3].title,productos[4].title],
                datasets:[{
                    label:'Ventas',
                    data:[productos[0].sale_count,productos[1].sale_count, productos[2].sale_count, productos[3].sale_count, productos[4].sale_count ],
                    backgroundColor:[
                        'rgb(228, 188, 212)',
                        'rgb(198, 225, 241)',
                        'rgb(244, 217, 236)',
                        'rgb(236, 223, 219)',
                        'rgb(181, 197, 215)'
                    ]
                }]
            },
            options:{
                scales:{
                    yAxes:[{
                        tcks:{
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

        $('#tbProducto').html(tabla);
    });
    
    
}


function llenarComboProductos() {
   
    $.ajax(
        {
            type: "GET",
            asyc: true,
            url: "http://localhost:8080/api/prueba/products"
        }
    ).done(function (data) {
        productosCombo = data.data;
        var combo = "";

        for (var i = 0; i < productosCombo.length; i++) {
            combo += "<option value='" + productosCombo[i].id + "'>" + productosCombo[i].title + "</option>";
        }

        $('#comboProducto').html(combo);
    });

}

var list = "";
let index = 0; 
var labels = [];
function agregarProduducto(){
    var prouctoSel = $("#comboProducto").val();
    var nombre = $("#comboProducto option:selected").text();
    
    addProducts[index]=prouctoSel;
    labels[index]="<th><button onclick='quitarProducto("+index+")' class='btn-danger'>x</button></th>"+
                  "<th><h7>"+nombre+"</h7></th><br>";
    list+=labels[index];
    
    index++;
    $('#productosList').html(list);
    
}

function quitarProducto(id){
    
    addProducts[id]=null;
    labels[id]=null;
    list="";
    for (let i = 0; i < labels.length; i++) {
        list+=labels[i];
        
    }
    $('#productosList').html(list);
    
}   

async function guardarOrden(){
    
    var tel = $("#txtTelefono").val();
    var calle = $("#txtCalle").val();
    var colonia = $("#txtColonia").val();
    var ciudad = $("#txtCiudad").val();
    var estado = $("#txtEstado").val();
    var cp = $("#txtCp").val();
    var productos = [];
    
    var repetidos = {};
    addProducts.forEach(function(numero){
        repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
    

    let result = addProducts.filter((item,index)=>{
      return addProducts.indexOf(item) === index;
    });

    result.sort();
    
   
    for (let i = 0; i < result.length; i++) {
        var producto = {};
        producto['product_id']=result[i];
        producto['qty']=repetidos[result[i]];
        productos.push(producto);
    }

    var data = 
    {
        phone: tel,
        address: colonia,
        city: ciudad,
        state: estado,
        street_name: calle,
        zip_code: cp,
        product_list: productos
    };

    let response = await fetch('http://localhost:8080/api/prueba/create',{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res=json()).catch(error => console.error('msj:', error))
        .then(response=>console.log('data:', response));

    window.location.reload();
    cargarVerOrdenes();
}


