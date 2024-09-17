

export const fetchPokemon = async (query: string) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      console.log("Se ejecuta la petición");
      
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };