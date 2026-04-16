import { useEffect, useState } from "react";
import { CatalogueService } from '../services/catalogue/catalogue'

const useCatalogue = () => {
  const [catalogue, setCatalogue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await CatalogueService.getCatalogue();
        if (!cancelled) setCatalogue(data[0] ?? null);
      } catch (err) {
        if (!cancelled) setError("Impossible de charger le catalogue.");
        console.error(err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  return { catalogue, isLoading, error };
};

export { useCatalogue };