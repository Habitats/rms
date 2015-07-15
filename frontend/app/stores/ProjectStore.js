import Marty from 'marty';
import UserConstants from './../constants/ProjectConstants.js';

class ProjectStore extends Marty.Store {
  constructor(props) {
    super(props);
    this.imgRoot = 'http://www.romerike-markise.no/images/';
    this.state = {
      projects: [{
        id: '1',
        title: 'Nannestad VGS',
        description: 'Hos Nannestad VGS har vi stått for levering av utvendige persienner, og masse annet rart. Stort prosjekt!',
        img: [this.imgRoot + 'ref_nannestad.vgs_1.jpg',
              this.imgRoot + 'ref_nannestad.vgs_2.jpg',
              this.imgRoot + 'ref_nannestad.vgs_3.jpg',
              this.imgRoot + 'ref_nannestad.vgs_4.jpg']
      }, {
        id: '2',
        title: 'Nannestad Kommunehus',
        description: 'Nannestad er et ganske fett sted, da! Nannestad er et ganske fett sted, da! Nannestad er et ganske fett sted, da! Nannestad er et ganske fett sted, da! Nannestad er et ganske fett sted, da! Nannestad er et ganske fett sted, da! Nannestad er et ganske fett sted, da! Nannestad er et ganske fett sted, da!',
        img: [this.imgRoot + 'ref_nannestad.kommunehus_1.jpg',
              this.imgRoot + 'ref_nannestad.kommunehus_2.jpg',
              this.imgRoot + 'ref_nannestad.kommunehus_3.jpg',
              this.imgRoot + 'ref_nannestad.kommunehus_4.jpg']
      }, {
        id: '3',
        title: 'Manesjen Kommunehus',
        description: 'Manesjen er et ganske fett sted, da! Manesjen er et ganske fett sted, da! Manesjen er et ganske fett sted, da! Manesjen er et ganske fett sted, da! Manesjen er et ganske fett sted, da! Manesjen er et ganske fett sted, da! Manesjen er et ganske fett sted, da! Manesjen er et ganske fett sted, da!',
        img: [this.imgRoot + 'ref_manesjen_1.jpg',
              this.imgRoot + 'ref_manesjen_2.jpg',
              this.imgRoot + 'ref_manesjen_3.jpg',
              this.imgRoot + 'ref_manesjen_4.jpg']
      }, {
        id: '4',
        title: 'Ullensaker Kulturhus',
        description: 'Ullensaker Kulturhuser et ganske fett sted, da! Ullensaker Kulturhuser et ganske fett sted, da! Ullensaker Kulturhuser et ganske fett sted, da! Ullensaker Kulturhuser et ganske fett sted, da! Ullensaker Kulturhuser et ganske fett sted, da! Ullensaker Kulturhuser et ganske fett sted, da! Ullensaker Kulturhuser et ganske fett sted, da! Ullensaker Kulturhuser et ganske fett sted, da!',
        img: [this.imgRoot + 'ref_ullensaker.kulturhus_1.jpg',
              this.imgRoot + 'ref_ullensaker.kulturhus_2.jpg',
              this.imgRoot + 'ref_ullensaker.kulturhus_3.jpg',
              this.imgRoot + 'ref_ullensaker.kulturhus_4.jpg']
      }
      ]
    };
    this.handlers = {
      updateProject: UserConstants.UPDATE_PROJECT
    };
  }

  updateProject(msg) {
    console.log('FLUX > updating ProjectStore > ' + msg);
  }

  getProjects() {
    return this.state.projects;
  }
}

export default ProjectStore;
