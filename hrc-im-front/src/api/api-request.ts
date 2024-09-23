

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

// Definir la interfaz
interface InternRegister {
  name: string;
  email: string;
  type: string;
  university?: string;
  program?: string;
  universityId?: string;
  universityphone?: string;
  oldDepartment?: string;
  phone: string;
  supervisor: string;
  department: string;
  beginDate: string;
  endDate: string;
  checkin: string;
  checkout: string;
  totalTime: string;
}

// Función que recibe un objeto del tipo InternRegister
export function TestEnvio({
 name,
  email,
  type,
  university,
  program,
  universityId,
  universityphone,
  oldDepartment,
  phone,
  supervisor,
  department,
  beginDate,
  endDate,
  checkin,
  checkout,
  totalTime,
}: InternRegister) {
  console.log(
    'nombre: ',name,
    'email: ',email,
    'type: ',type,
    'university: ',university,
    'program: ',program,
    'universityId: ',universityId,
    'universityphone: ',universityphone,
    'oldDepartment: ',oldDepartment,
    'phone: ',phone,
    'supervisor: ',supervisor,
    'department: ',department,
    'beginDate: ',beginDate,
    'endDate: ',endDate,
    'checkin: ',checkin,
    'checkout: ',checkout,
    'totalTime: ',totalTime
    
  );
}
