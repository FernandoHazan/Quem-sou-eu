const divDicas = document.querySelector('.dicas')
const divPalavra = document.querySelector('.palavra')
const tentativas = document.querySelector('.tentativas')
const btnDica = document.querySelector('.btn__dica')
const btnLetra = document.querySelector('.btn__letra')
const btnPalpite = document.querySelector('.btn__enviar')

btnDica.addEventListener('click', () => {gerarDicas()})
btnLetra.addEventListener('click', () => {pedirLetra()})
btnPalpite.addEventListener('click', (e) => {
    e.preventDefault()
    verificarPalpite(e)})


let carta;
let numeroDica = -1
let numeroLetra = 0
let numeroTentativas = 3

async function pegarCarta() {
    const res = await fetch("cartas.json");
    const arrayCartas = await res. json();
    const numeroAleatorio = gerarNumeroAleatorio()
    carta = arrayCartas[numeroAleatorio]
}
pegarCarta()

function gerarNumeroAleatorio() {
    const random = Math.floor(Math.random() * (31 - 0) + 0);
    return random
}

function gerarDicas (){
    numeroDica++
    if(numeroDica >= 4){
        btnDica.disabled = true
    }
    divDicas.innerHTML += `<p class="dica"><img src="../img/number-${numeroDica}.png" class="numero">${carta.dicas[numeroDica]}</p>`
}

function pedirLetra(){
    numeroLetra++
    switch(numeroLetra){
        
        case 1:
            const palavras = carta.nome.split(' ')
            console.log(`fora do forecah ${palavras}`)
            
            for(var e = 0; e <= palavras.length - 1; e++) {
                if(!(0 === e)){         
                    divPalavra.innerHTML += `<div class="letras-espaco"></div>`
                }
                for(var i = 0; i <= palavras[e].length - 1; i++){
                    divPalavra.innerHTML += `<div class="letras"><p class="letra"></p></div>`          
                }
            };
            break
            
            case 2:
                const divsLetra = document.querySelectorAll('.letra')
                const primeiraLetra = carta.nome.slice(0, 1)
                console.log(divsLetra[0])
                divsLetra[0].textContent = primeiraLetra
            break
    
        case 3:
                const divsLetraUltimo = document.querySelectorAll('.letra')
                const ultimaLetra = carta.nome.slice(-1)
                console.log(divsLetraUltimo[-1])
                divsLetraUltimo[divsLetraUltimo.length - 1].textContent = ultimaLetra
                btnLetra.disabled = true
            break
        default:
    } 
};

function verificarPalpite() {
    numeroTentativas--
    const palpite = document.querySelector('.palpite').value
    console.log(carta.nome)
    if(palpite.toLowerCase() === carta.nome.toLowerCase()){
        tentativas.textContent = 'você acertou'
    } else if( numeroTentativas >= 1){
        tentativas.textContent = `Tentativas restantes: ${numeroTentativas}`
    } else{
        tentativas.textContent = 'você perdeu'
        btnPalpite.disabled = true
    }
}



    





