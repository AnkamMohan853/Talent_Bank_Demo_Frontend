import { useEffect, useState } from 'react';

interface ArtDirector {
  id: number;
  name: string;
  // Add more fields as needed
}

export const useFetchArtDirectors = () => {
  const [data, setData] = useState<ArtDirector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [] = useState <string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/artDirector/getAllArtDirectors')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

