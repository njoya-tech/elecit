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
import Casque from "./icons/CASQUE.svg"

//==========IMAGES==================

import IMG1  from "./images/image_1.JPG"
import IMG2  from "./images/image_2.JPG"
import IMG3  from "./images/image_3.JPG"

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
};

export const IMAGES = {
    IMG1:IMG1,
    IMG2:IMG2,
    IMG3:IMG3
}

// Global default export
export default {
  HERO,
  ICONS,
  IMAGES
};
