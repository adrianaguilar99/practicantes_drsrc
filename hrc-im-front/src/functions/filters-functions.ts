type SearchOptions = {
    caseSensitive?: boolean;
    keys?: string[];
  };
  
  export function search<T extends Record<string, unknown>>(
    data: T[],
    query: string,
    options?: SearchOptions
  ): T[] {
    const { caseSensitive = false, keys = [] } = options || {};
  
    const normalizedQuery = caseSensitive ? query : query.toLowerCase();
  
    return data.filter((item) => {
      return keys.length > 0 
        ? keys.some((key) => {
            const value = String(item[key as keyof T]); 
            const normalizedValue = caseSensitive ? value : value.toLowerCase();
            return normalizedValue.includes(normalizedQuery);
          })
        : Object.values(item).some((value) => {
            const normalizedValue = caseSensitive ? String(value) : String(value).toLowerCase();
            return normalizedValue.includes(normalizedQuery);
          });
    });
  }
  

  