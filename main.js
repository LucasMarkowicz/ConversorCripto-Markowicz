//eventos de botón
let boton = document.getElementById("boton")
boton.addEventListener("click", evitarDobleClick)
boton.addEventListener("click", getValueInput)

//jquery para aplicar click en enter
$(document).keypress(function (x) {
    var key = x.which;
    if(key == 13) 
     {
       $('#boton').click();
       return false;  
     }
   }); 

// función que evita doble click
function evitarDobleClick() {
    document.getElementById("boton").disabled = true;
    setTimeout(function() {
        document.getElementById("boton").disabled = false;
    }, 500);
}


function getValueInput() {
    document.getElementById("resultado").innerHTML = ""
    document.getElementById("enunciado").innerHTML = ""
    document.getElementById("hora").innerHTML = ""

    let x = document.getElementById("criptoElegida");
    let moneda = x.options[x.selectedIndex].text;

    y = document.getElementById("ingreseValor");
    let valor = y.value

    // obtener la fecha y la hora
    const today = new Date();
    const now = today.toLocaleString();


    // api de binance
    let endpoint = 'https://api.binance.com/api/v3/ticker/price'
    fetch(endpoint)
        .then(respuesta => respuesta.json())
        .then(data => mostrarData(data))
        .catch(e => console.log(e))
    

    let mostrarData = (data) => {
        class Criptomonedas {
            constructor(nombreCorto, nombre, valorCripto, imagenCripto) {
                this.short = nombreCorto
                this.name = nombre;
                this.valueC = valorCripto;
                this.img = imagenCripto
            }
        }

        const ETH = new Criptomonedas("ETH", "Ethereum", data[632].price, `<img src="media/ETH.png" alt="" >`)
        const BTC = new Criptomonedas("BTC", "Bitcoin", data[614].price, `<img src="media/BTC.png" alt="" >`)
        const BNB = new Criptomonedas("BNB", "Binance Coin", data[613].price, `<img src="media/BNB.png" alt="" >`)
        const ADA = new Criptomonedas("ADA", "Cardano", data[655].price, `<img src="media/ADA.png" alt="" >`)
        const SOL = new Criptomonedas("SOL", "Solana", data[780].price, `<img src="media/SOL.png" alt="" >`)
        const XRP = new Criptomonedas("XRP", "Ripple", data[631].price, `<img src="media/XRP.png" alt="" >`)
        const BUSD = new Criptomonedas("BUSD", "Binance USD", 1, `<img src="media/BUSD.png" alt="" >`)


        listaCripto = [ETH, BTC, BNB, ADA, SOL, XRP, BUSD];

        //funcion conversion y muestra
        function calculo(monto) {
            let a = (parseFloat(valor) * monto / listaCripto[j].valueC);
            document.getElementById("resultado").innerHTML += `Tu valor en ${listaCripto[j].img} ${listaCripto[j].name} (${listaCripto[j].short}) es ${a.toFixed(3)} <br><br>`
        }
    

        let monedaElegida = listaCripto.find(element => moneda.includes(element.name));

        if (valor == "") {
            document.getElementById("resultado").innerHTML = "Por favor ingrese un valor númerico"
            document.getElementById("enunciado").innerHTML = " "
            document.getElementById("hora").innerHTML = " "
        }
        else {
            for (j = 0; j < listaCripto.length; j++) {
                if (j == listaCripto.indexOf(monedaElegida)) {

                }
                else {
                    document.getElementById("enunciado").innerHTML = `<b>Elegiste convertir ${valor} ${monedaElegida.name} (${monedaElegida.short}) ${monedaElegida.img}</b> <br><br>`;
                    document.getElementById("hora").innerHTML = `<b>Fecha y hora local:</b> ${now}`
                    calculo(monedaElegida.valueC);
                }
            }
        }
    }

}




