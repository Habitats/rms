import { library, config } from '@fortawesome/fontawesome-svg-core';
import { 
  faPhone,
  faEnvelope,
  faSpinner,
  faUser,
  faChevronRight,
  faChevronLeft,
  faCogs,
  faHeart,
  faStar
} from '@fortawesome/free-solid-svg-icons';

// Prevent Font Awesome from dynamically adding its CSS
config.autoAddCss = false;

// Add only the icons we use
library.add(
  faPhone,
  faEnvelope,
  faSpinner,
  faUser,
  faChevronRight,
  faChevronLeft,
  faCogs,
  faHeart,
  faStar
); 