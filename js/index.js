const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const puntos = 0
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 20

swal('Informacion', `El juego consiste en repetir la secuencia de colores, cada nivel se aumentara un color mas, son 20 niveles. \n ¿ Crees poder lograrlo ?`, 'info')

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toogleBtnEmpezar()
    this.nivel = 1
    this.puntos = 0
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
    
  }

  toogleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero) {
    switch(numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color) {
    switch(color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia(color) {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }

  iluminarColor(color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), 250)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
    if(numeroColor === this.secuencia[this.subnivel]) {
      this.subnivel++
      this.puntos += 20
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.puntos += 50
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          // Gano !
          this.ganoElJuego()
        }else {
          swal("Excelente !!", `Tu puntuacion actual: ${this.puntos} puntos \n Siguiente Nivel: ${this.nivel}`, "success")
            .then(() => setTimeout(this.siguienteNivel, 700))
        }
      }
    }else {
      //Perdio
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    swal('Ganaste !!','Felicitaciones, sabia que lo lograrias.', 'success')
      .then(this.inicializar)
  }

  perdioElJuego() {
    swal('Oh, perdiste! :(',`Continua intentandolo, Tu puntaje fue de: ${this.puntos} puntos`, 'error')
      .then(()=> {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }

}

function empezarJuego() {
  window.juego = new Juego()
}