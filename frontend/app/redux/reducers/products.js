import * as C from '../constants/ProductConstants'

const initialState = [{
  name: 'Eksteriør',
  short: 'eksterior',
  sub: [{
    name: 'Markiser',
    short: 'markiser',
    desc: 'Markiser kommer i mange former og fasonger. Vi fører alt fra større terrassemarkiser, til enkle vindusmarkiser.'
  }, {
    name: 'Persienner',
    short: 'persienner',
    desc: 'Utvendige persienner er både smidige og robuste.'
  }, {
    name: 'Screen',
    short: 'screen',
    desc: 'Utvendig rullegardig - et stiltrent alternativt til persienne. Lett å holde rent, og tar minimalt med plass.'
  }, {
    name: 'Varme og belysnins',
    short: 'varme_belysning',
    desc: 'Forleng den trivelige utesesongen med en varmelampe. Våre varmelamper er kortbølgede, og når maksimal varme på kun få sekunder.'
  },]
}, {
  name: 'Interiør',
  short: 'interior',
  sub: [{
    name: 'Rullegardiner',
    short: 'rullegardiner',
    desc: ''
  }, {
    name: 'Persienner',
    short: 'persienner',
    desc: ''
  }, {
    name: 'Lamellgardiner',
    short: 'lamellgardiner',
    desc: ''
  }, {
    name: 'Plissé',
    short: 'plisse',
    desc: 'Et elegant og eksklusivt alternativ til den tradisjonelle rullegardinen.'
  }, {
    name: 'Duetter',
    short: 'duetter',
    desc: ''
  },]
}, {
  name: 'Diverse',
  short: 'div',
  sub: [{
    name: 'Automatikk',
    short: 'automatikk',
    desc: ''
  }, {
    name: 'Garasjeporter',
    short: 'garasjeporter',
    desc: ''
  }, {
    name: 'Sprosser',
    short: 'sprosser',
    desc: 'Sett et personlig preg på vinduene.'
  }, {
    name: 'Vindusfilm',
    short: 'vindusfilm',
    desc: 'En solskjermingsløsning som både holder solen og varmen utenfor. Vår smidigste solskjermingsløsning.'
  },]
}, {
  name: 'Tjenester',
  short: 'tjenester',
  sub: [{
    name: 'Prosjektering',
    short: 'prosjektering',
    desc: ''
  }, {
    name: 'Service-arbeid',
    short: 'service-arbeid',
    desc: 'I tillegg til å montere nye produkter tar vi også vare på de gamle. Enten det er en røket snor, eller renovering av gamle anleggsbygg, stiller vi ekspertise over hele planet.'
  }]
}]

export default function product(state = initialState, action) {
  switch (action.type) {

    case C.SELECT_CATEGORIES:
      return state

    default:
      return state
  }
}
