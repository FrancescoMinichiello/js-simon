/*

Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente
deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri
da indovinare sono stati individuati.
NOTA: non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne
indovini il più possibile.
BONUS 1:
Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose
diverse da numeri lo blocchiamo in qualche modo.
BONUS 2:
Generiamo gli input da JS, invece di scriverli nel codice


Consigli del giorno:
* Pensate prima in italiano.
* Dividete in piccoli problemi la consegna.
* Individuate gli elementi di cui avete bisogno per realizzare il programma.
* Immaginate la logica come fosse uno snack: "Dati 2 array di numeri, indica
quali e quanti numeri ci sono in comune tra i due array"

*/

// Funzione per generare un numero casuale tra un minimo e un massimo
function getNumeroCasuale(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generare e mostrare 5 numeri casuali
const numeri = [];
for (let i = 0; i < 5; i++) {
    numeri.push(getNumeroCasuale(1, 100));
}

document.getElementById("numeri-casuali").textContent = numeri.join(" ");

// Timer di 10 secondi che si vede e scorre all'indietro
let tempoRimanente = 10;
const timer = document.getElementById("timer");

const intervallo = setInterval(function () {
    tempoRimanente--;
    timer.textContent = tempoRimanente;

    if (tempoRimanente <= 0) {
        clearInterval(intervallo);
        document.getElementById("numeri-casuali").textContent = "";
        mostraInput();
    }
}, 1000);

// Funzione per mostrare gli input e verificare i numeri inseriti
function mostraInput() {
    const container = document.getElementById("input-container");

    for (let i = 0; i < 5; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.className = "numero-input";
        container.appendChild(input);
    }

    document.getElementById("verifica").style.display = "block";
}

// Funzione per verificare i numeri inseriti
document.getElementById("verifica").addEventListener("click", function () {
    const inputs = document.getElementsByClassName("numero-input");
    const numeriInseriti = [];
    let duplicati = false;

    for (let i = 0; i < inputs.length; i++) {
        const valore = parseInt(inputs[i].value);

        if (isNaN(valore) || numeriInseriti.includes(valore)) {
            duplicati = true;
            break;
        }

        numeriInseriti.push(valore);
    }

    if (duplicati) {
        alert("Hai inserito numeri duplicati o non validi! Riprova.");
    } else {
        verificaNumeri(numeriInseriti);
    }
});

// Funzione per verificare quanti numeri sono corretti
function verificaNumeri(numeriInseriti) {
    const numeriCorretti = numeri.filter(numero => numeriInseriti.includes(numero));
    document.getElementById("risultato").textContent = `Hai indovinato ${numeriCorretti.length} numeri: ${numeriCorretti.join(" ")}`;
}