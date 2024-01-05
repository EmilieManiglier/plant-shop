import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faEnvelope,
  faExternalLink,
  faLock,
  faPen,
  faPlus,
  faSort,
  faSortDown,
  faSortUp,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAngleDown,
  faAngleUp,
  faAngleLeft,
  faAngleRight,
  faEnvelope,
  faLock,
  faPen,
  faPlus,
  faXmark,
  faExternalLink,
  faGithub,
  faSort,
  faSortUp,
  faSortDown,
  faExternalLink
);
export const faIconsList = library.definitions;
