let color;
let valorIngresadoX = document.getElementById('inputX');
let valorIngresadoY = document.getElementById('inputY');
let canvas1 = document.getElementById("canvasPuntos"); 
let puntosIngresados = [];
let lienzo1 = canvas1.getContext("2d");
let canvas2 = document.getElementById('canvasGrafica');
let ctx = canvas2.getContext('2d');
let valoresX = [];
let valoresY = [];
let chart = new Chart (canvas2);


function graficar()
{
    //------------pertenece a barras------------------------------
    valorIngresadoX = document.getElementById('inputX').value;
    valorIngresadoY = document.getElementById('inputY').value;
    //------------------------------------------------------------


    if(valorIngresadoX == '' || valorIngresadoY == '')
    {
        alert('Ingresa valores de X & Y');
    }
    else if(valorIngresadoX > 250 || valorIngresadoY > 250 || valorIngresadoX < -250 || valorIngresadoY < -250)
    {
        alert('Los valores no pueden ser mayor a 250!');
    }
    else if(valoresX.length >= 5 && valoresY.length >= 5)
    {
        alert ('No se pueden ingresar mas valores Borra para continuar');
    }
    else
    {
        //------------------------------Plano cartesiano--------------------------------------------------------
        
        let valorIngresadoXN = parseFloat(valorIngresadoX) + 250; // Determina la direccion del punto en X 
        let valorIngresadoYN = parseFloat(-valorIngresadoY) + 250; // Determina la direccion del punto en Y
    
        // Dibuja el punto
        // color = '#' + (Math.round(Math.random()*0xffff)).toString(16);
        lienzo1.strokeStyle = color;
        lienzo1.beginPath();
        lienzo1.lineWidth = 2;
        lienzo1.arc(valorIngresadoXN, valorIngresadoYN, 1, 0, 2 * Math.PI); // Los dos primeros valores representan las coordenadas del punto
        lienzo1.fillStyle = color;
        lienzo1.fillText(`(${valorIngresadoX}, ${valorIngresadoY})`, valorIngresadoXN, valorIngresadoYN - 5);
        lienzo1.stroke();
        lienzo1.closePath();
        puntosIngresados.push(`(X = ${valorIngresadoX}; Y = ${valorIngresadoY})`);
        valorIngresadoX.value = '';
        valorIngresadoY.value = '';
        TAResultados.innerText = puntosIngresados;

//-----------------------grafica de barras-----------------------------

        valoresX.push(valorIngresadoX);
        valoresY.push(valorIngresadoY);
        destruyeCanvas();
        creaCanvas();
    }
}


function borrar()
{
    location.reload();
}

// Dibuja la cuadricula del plano cartesiano

for (let x = 0; x<= 500; x = x+10)
{
    lienzo1.moveTo(x,0);
    lienzo1.lineTo(x,500);
}

for (let y = 0; y <= 500; y = y+10)
{
    lienzo1.moveTo(0,y);
    lienzo1.lineTo(500,y);
}

lienzo1.strokeStyle = "#999";
lienzo1.stroke();

lienzo1.lineWidth=1;
lienzo1.strokeStyle = '#000'; 

//Dibuja el eje X
lienzo1.beginPath(); 
lienzo1.moveTo(250,0); 
lienzo1.lineTo(250,500);
lienzo1.stroke(); 
lienzo1.closePath(); 

//Dibuja el eje Y
lienzo1.beginPath(); 
lienzo1.moveTo(0,250);
lienzo1.lineTo(500,250);
lienzo1.stroke();
lienzo1.closePath();


function creaCanvas ()
{
    chart = new Chart (canvas2, {
        type:'bar',
        data:{
            labels:valoresX,
            datasets:[{
                label: 'Grafico de los valores ingresados en X & Y',
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'rgb(0,255,255)',
                data: valoresY
            }]
        }
    });

    // setTimeout(() =>
    // {
    //     destruyeCanvas();

    // },3000)
}

function destruyeCanvas()
{
    chart.destroy();
    document.getElementById('inputX').value = '';
    document.getElementById('inputY').value = '';
}