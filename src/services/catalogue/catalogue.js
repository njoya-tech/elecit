import { directus } from "../api/directus";
import { readFiles } from "@directus/sdk";

const BASE_URL = import.meta.env.VITE_DIRECTUS_URL;
const CATALOGUE_FOLDER_ID = "7f90dedf-5397-4b5c-8a37-5893beaff916"; // ← ton UUID

export const CatalogueService = {
  async getCatalogue() {
    try {
      const files = await directus.request(
        readFiles({
          filter: {
            folder: { _eq: CATALOGUE_FOLDER_ID },
          },
          fields: ["id", "title", "filename_download", "type"],
        })
      );

      return files.map((file) => ({
        id: file.id,
        title: file.title || file.filename_download,
        fileUrl: `${BASE_URL}/assets/${file.id}`,
      }));
    } catch (error) {
      console.error("Erreur catalogue:", error);
      throw error;
    }
  },

  // keyword ex: "EN" pour le fichier anglais
  async getCatalogueByLang(keyword) {
    const files = await this.getCatalogue();
    if (!keyword) return files;
    const lower = keyword.toLowerCase();
    return files.filter((f) => f.title.toLowerCase().includes(lower));
  },

  // le fichier FR = celui qui ne contient PAS "en" dans le titre
  async getCatalogueExcluding(keyword) {
    const files = await this.getCatalogue();
    if (!keyword) return files;
    const lower = keyword.toLowerCase();
    return files.filter((f) => !f.title.toLowerCase().includes(lower));
  },
};