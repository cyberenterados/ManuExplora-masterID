// Función que aplica estilo a la opción seleccionada del menú
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links a');
    opciones.forEach(op => op.classList.remove("seleccionando"));
    link.classList.add("seleccionando");
    
    // Ocultar menú en móviles al hacer click
    var nav = document.getElementById("nav");
    if(window.innerWidth <= 800) {
        nav.className = "";
    }
}

// Función que muestra/oculta el menú responsive
function responsiveMenu() {
    var nav = document.getElementById("nav");
    if (nav.className === "") {
        nav.className = "responsive";
    } else {
        nav.className = "";
    }
}

// Detectar scrolling para animar barras de habilidades
window.onscroll = function() { efectoHabilidades() };

// ==========================================
// BARRAS DE HABILIDADES DINÁMICAS
// ==========================================
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    if(skills) {
        // Distancia para activar la animación al hacer scroll
        var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
        
        if (distancia_skills >= 300) {
            // Seleccionamos todas las barras
            let barras = document.querySelectorAll('.barra-progreso');
            
            // Recorremos cada barra para leer su atributo HTML y aplicarlo al CSS
            barras.forEach(barra => {
                let porcentajeDeseado = barra.getAttribute('data-percentage');
                // Al asignarle el width en %, la transición de CSS hace el efecto de llenado
                barra.style.width = porcentajeDeseado + '%';
            });
        }
    }
}

// ==========================================
// EFECTO CUÁNTICO (PARTÍCULAS) - SOLO PARA PORTAFOLIO
// ==========================================
const canvas = document.getElementById('quantumCanvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const portafolioSection = document.getElementById('portafolio');

    // Ajustar tamaño del canvas a la sección
    canvas.width = portafolioSection.offsetWidth;
    canvas.height = portafolioSection.offsetHeight;

    window.addEventListener('resize', () => {
        canvas.width = portafolioSection.offsetWidth;
        canvas.height = portafolioSection.offsetHeight;
        init(); // Reiniciar partículas
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            // Rebotar en los bordes
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            // Mover partícula
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        // Densidad de partículas adaptativa
        let numberOfParticles = (canvas.width * canvas.height) / 8000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            
            let directionX = (Math.random() * 1.5) - 0.75;
            let directionY = (Math.random() * 1.5) - 0.75;
            let color = 'rgba(103, 100, 164, 0.9)'; 

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) 
                             + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                // Conectar si están cerca
                if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                    opacityValue = 1 - (distance / 15000);
                    ctx.strokeStyle = 'rgba(103, 100, 164,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Iniciar
    init();
    animate();
}

// ==========================================
// EFECTO MÁQUINA DE ESCRIBIR (CONSOLA IA)
// ==========================================
const palabrasIA = ["Periodista Audiovisual", "Full Stack Designer", "Creador de Contenido", "IA Prompt Engineer"];
let indicePalabra = 0;
let timerTypewriter;

function escribirTexto() {
    let palabra = palabrasIA[indicePalabra].split("");
    let loopEscribir = function() {
        if (palabra.length > 0) {
            document.getElementById('typewriter').innerHTML += palabra.shift();
        } else {
            setTimeout(borrarTexto, 2500); // Pausa antes de borrar
            return false;
        }
        timerTypewriter = setTimeout(loopEscribir, 80); // Velocidad de escritura
    };
    loopEscribir();
}

function borrarTexto() {
    let palabra = palabrasIA[indicePalabra].split("");
    let loopBorrar = function() {
        if (palabra.length > 0) {
            palabra.pop();
            document.getElementById('typewriter').innerHTML = palabra.join("");
        } else {
            if (palabrasIA.length > (indicePalabra + 1)) {
                indicePalabra++;
            } else {
                indicePalabra = 0;
            }
            escribirTexto();
            return false;
        }
        timerTypewriter = setTimeout(loopBorrar, 40); // Velocidad de borrado
    };
    loopBorrar();
}

// Iniciar el efecto si el elemento existe en el HTML
if(document.getElementById('typewriter')) {
    setTimeout(escribirTexto, 1000); // Retardo inicial de 1 segundo
}