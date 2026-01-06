// src/asset/assets.js

// ===== HERO IMAGES =====
import heroBlog from "./hero/blog-hero.JPG";
import heroBureauEtude from "./hero/bureauetude-hero.jpg";
import heroContact from "./hero/contact-hero.JPG";
import heroDataProcessing from "./hero/dataprocessing-hero.jpg";
import heroEntreprise from "./hero/entreprise-hero.JPG";
import heroSav from "./hero/sav-hero.jpg";
import heroSecurity from "./hero/security-hero.JPG";

// ===== ICONS =====
import formTech from "./icons/form_tech.svg"; // ✅ path is correct
import Casque from "./icons/CASQUE.svg";
import Engrenage_plan from "./icons/engrenage_plan.svg";
import innovation from "./icons/innovation.svg";
import transformation from "./icons/transformation.svg";
import excellence from "./icons/excellence.svg";
import cercle from "./icons/cercle.svg";
import formePlan from "./icons/form_plan.svg";
import badge from "./icons/badge.svg";
import laptop from "./icons/laptop_mobile.svg";
import stockage from "./icons/stockage.svg";
import business_icon from "./icons/business_inteligence.svg";
import faibilite_icon from "./icons/faibilite.svg";
import securite_icon from "./icons/securite_renforcee.svg";
import optimisation_icon from "./icons/optimisation_des_couts.svg";
import gain_temps_icon from "./icons/gain_de_temps.svg";
import flexibilite_icon from "./icons/flexibilite_et_evolution.svg";
import conformite_icon from "./icons/conformite_reglementaire.svg";
import decision_icon from "./icons/decision_plus_intelligentes.svg";
import flech_icon from "./icons/flèche incurvé.svg";

//==========IMAGES==================

import IMG1 from "./images/image_1.JPG";
import IMG2 from "./images/image_2.JPG";
import IMG3 from "./images/image_3.JPG";
import IMG4 from "./images/image_4.JPG";
import IMG5 from "./images/image_5.jpg";
import IMG6 from "./images/image_6.jpg";
import IMG7 from "./images/image_7.jpg";
import IMG8 from "./images/image_8.JPG";
import IMG9 from "./images/image_9.JPG";
import IMG10 from "./images/image_10.jpg";
import IMG11 from "./images/image_11.JPG";
import IMG12 from "./images/soudeur.JPG";
import IMG13 from "./images/image_13.JPG";
import IMG14 from "./images/image_14.jpg";
import IMG15 from "./images/image_15.JPG";
import IMG16 from "./images/image_16.jpg";
import IMG17 from "./images/engineer_phone.jpg";
import IMG18 from "./images/engineer.jpg";
import IMG19 from "./images/Tablet.jpg";
import IMG20 from "./images/gestionaire.jpg";
import IMG21 from "./images/domotricien.jpg";
import IMG22 from "./images/infomatique.jpg";
import IMG23 from "./images/fabrication.jpg";
import IMG24 from "./images/courant_faible.jpg";

//========== PARTNERS IMAGES ==========

import partner1 from "./images/partner_1.png";
import partner2 from "./images/partner_2.png";
import partner3 from "./images/partner_3.png";
import partner4 from "./images/partner_4.png";
import partner5 from "./images/partner_5.png";
import partner6 from "./images/partner_6.png";
import partner7 from "./images/partner_7.png";
import partner8 from "./images/partner_8.png";
import partner9 from "./images/partner_9.png";

// ============  OBJECTS ====================

import obj_1 from "./images/obj_1.png";
import obj_2 from "./images/obj_2.png";
import obj_3 from "./images/obj_3.png";
import obj_4 from "./images/obj_4.png";
import obj_5 from "./images/obj_5.png";
import obj_6 from "./images/obj_6.png";

// Export organized assets
export const HERO = {
  blog: heroBlog,
  bureauEtude: heroBureauEtude,
  contact: heroContact,
  dataProcessing: heroDataProcessing,
  entreprise: heroEntreprise,
  sav: heroSav,
  security: heroSecurity,
};

export const ICONS = {
  formTech: formTech, // must match import name
  Casque: Casque,
  Engrenage_plan: Engrenage_plan,
  innovation: innovation,
  transformation: transformation,
  excellence: excellence,
  cercle: cercle,
  formePlan: formePlan,
  badge: badge,
  laptop: laptop,
  business_icon: business_icon,
  stockage: stockage,
  faibilite_icon: faibilite_icon,
  securite_icon: securite_icon,
  optimisation_icon: optimisation_icon,
  gain_temps_icon: gain_temps_icon,
  flexibilite_icon: flexibilite_icon,
  conformite_icon: conformite_icon,
  decision_icon: decision_icon,
  flech_icon: flech_icon,
};

export const IMAGES = {
  IMG1: IMG1,
  IMG2: IMG2,
  IMG3: IMG3,
  IMG4: IMG4,
  IMG5: IMG5,
  IMG6: IMG6,
  IMG7: IMG7,
  IMG8: IMG8,
  IMG9: IMG9,
  IMG10: IMG10,
  IMG11: IMG11,
  IMG12: IMG12,
  IMG13: IMG13,
  IMG14: IMG14,
  IMG15: IMG15,
  IMG16: IMG16,
  IMG17: IMG17,
  IMG18: IMG18,
  IMG19: IMG19,
  IMG20: IMG20,
  IMG21: IMG21,
  IMG22: IMG22,
  IMG23: IMG23,
};

export const PARTNERS = {
  partner1: partner1,
  partner2: partner2,
  partner3: partner3,
  partner4: partner4,
  partner5: partner5,
  partner6: partner6,
  partner7: partner7,
  partner8: partner8,
  partner9: partner9,
};
// =========== OBJECTS =============

export const OBJECTS = {
  obj_1: obj_1,
  obj_2: obj_2,
  obj_3: obj_3,
  obj_4: obj_4,
  obj_5: obj_5,
  obj_6: obj_6,
};

// Global default export
export default {
  HERO,
  ICONS,
  IMAGES,
  PARTNERS,
};
