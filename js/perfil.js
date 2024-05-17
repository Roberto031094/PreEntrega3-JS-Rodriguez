// Class constructora para los perfiles
class ClasePersonaje {
    constructor(clase, fuerza, inteligencia, carisma, agilidad, resistencia, espiritu, suerte, biografia, habilidadP, habilidadS, habilidadE) {
        this.clase = clase;
        this.estadisticas = { fuerza, inteligencia, carisma, agilidad, resistencia, espiritu, suerte };
        this.biografia = biografia;
        this.habilidades = { habilidadP, habilidadS, habilidadE };
    }
}

// Array con personajes creados por la class 
const datosClases = [
    new ClasePersonaje(
        'caballero',
        8, 5, 7, 4, 7, 6, 4,
        "Solía ser un fiero paladín de Bretannia. Formalmente retirado del servicio noviliario, ahora emplea su habilidades como mercenario. Se especializa en ataques a corta distancia.",
        "Tajo Atroz",
        "Bloqueo de Escudo",
        "Carga Heroica"
    ),
    new ClasePersonaje(
        'arquero',
        6, 7, 5, 8, 5, 6, 4,
        "Antes, un respetado guerrero de Aztlán. Ahora, centrado más en la cacería, suele ofrecer sus servicios como rastreador al mejor postor. Se especializa en ataques a larga distancia.",
        "Disparo Preciso",
        "Flecha Venenosa",
        "Flecha Incendiaria"
    ),
    new ClasePersonaje(
        'hechicero',
        4, 8, 6, 5, 6, 8, 4,
        "Residía en los bosques de Ys como un druida más. Harto del ostracismo, dedica su tiempo a recopilar conocimientos de todo el mundo. Se especializa en ataques a media distancia.",
        "Relámpago Elemental",
        "Protección Mágica",
        "Teletransporte"
    )
];
