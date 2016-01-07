import * as C from '../constants/productConstants'

const initialState = [{
  name: 'Eksteriør',
  short: 'eksterior',
  sub: [{
    name: 'Markiser',
    short: 'markiser',
    desc: 'Markiser kommer i mange former og fasonger. Vi fører alt fra større terrassemarkiser, til enkle vindusmarkiser.',
    src: '/image/p_markiser.jpg'
  }, {
    name: 'Persienner',
    short: 'persienner',
    desc: 'Utvendige persienner er både smidige og robuste.',
    src: '/image/p_persienner_eks.jpg'
  }, {
    name: 'Screen',
    short: 'screen',
    desc: 'Utvendig rullegardig - et stiltrent alternativt til persienne. Lett å holde rent, og tar minimalt med plass.',
    src: '/image/p_screen.jpg'
  }, {
    name: 'Varme og belysnins',
    short: 'varme_belysning',
    desc: 'Forleng den trivelige utesesongen med en varmelampe. Våre varmelamper er kortbølgede, og når maksimal varme på kun få sekunder.',
    src: '/image/p_varme-belysning.jpg'
  },]
}, {
  name: 'Interiør',
  short: 'interior',
  sub: [{
    name: 'Rullegardiner',
    short: 'rullegardiner',
    desc: '',
    src: '/image/p_rullegardiner.jpg'
  }, {
    name: 'Persienner',
    short: 'persienner',
    desc: '',
    src: '/image/p_persienner.jpg'
  }, {
    name: 'Lamellgardiner',
    short: 'lamellgardiner',
    desc: '',
    src: '/image/p_lamellgardiner.jpg'
  }, {
    name: 'Plissé',
    short: 'plisse',
    desc: 'Et elegant og eksklusivt alternativ til den tradisjonelle rullegardinen.',
    src: '/image/p_plisse.jpg'
  }, {
    name: 'Duetter',
    short: 'duetter',
    desc: '',
    src: '/image/p_duetter.jpg'
  },]
}, {
  name: 'Diverse',
  short: 'div',
  sub: [{
    name: 'Automatikk',
    short: 'automatikk',
    desc: '',
    src: '/image/p_automatikk.jpg'
  }, {
    name: 'Garasjeporter',
    short: 'garasjeporter',
    desc: '',
    src: '/image/p_garasjeporter.jpg'
  }, {
    name: 'Sprosser',
    short: 'sprosser',
    desc: 'Sett et personlig preg på vinduene.',
    src: '/image/p_sprosser.jpg'
  }, {
    name: 'Vindusfilm',
    short: 'vindusfilm',
    desc: 'En solskjermingsløsning som både holder solen og varmen utenfor. Vår smidigste solskjermingsløsning.',
    src: '/image/p_vindusflm.jpg'
  },]
}, {
  name: 'Tjenester',
  short: 'tjenester',
  sub: [{
    name: 'Prosjektering',
    short: 'prosjektering',
    desc: '',
    src: '/image/p_prosjektering.jpg'
  }, {
    name: 'Service-arbeid',
    short: 'service-arbeid',
    desc: 'I tillegg til å montere nye produkter tar vi også vare på de gamle. Enten det er en røket snor, eller renovering av gamle anleggsbygg, stiller vi ekspertise over hele planet.',
    src: '/image/p_service-arbeid.jpg'
  }]
}]

export default function product(state = initialState, action) {
  switch (action.type) {

    case C.SELECT_CATEGORIES:
      return state

    case C.SELECT_PRODUCT:
      return {... state, product: action.product, category: action.category}

    case C.SELECT_CATEGORY:
      return {... state, category: action.category}

    default:
      return state
  }
}
