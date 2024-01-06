import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faEnvelope,
  faExternalLink,
  faHandshake,
  faLock,
  faPen,
  faPlus,
  faSort,
  faSortDown,
  faSortUp,
  faTruckFast,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faEnvelope,
  faHandshake,
  faLock,
  faPen,
  faPlus,
  faXmark,
  faExternalLink,
  faGithub,
  faSort,
  faSortUp,
  faSortDown,
  faTruckFast,
  faExternalLink
);
export const faIconsList = library.definitions;
