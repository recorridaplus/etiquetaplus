const STORAGE_KEY = "etiqueta_plus_history";

export const saveScan = (data) => {
  if (!data) return;
  
  const history = getHistory();
  const newScan = {
    ...data,
    id: Date.now(),
    date: new Date().toISOString()
  };
  
  // Guardar solo los últimos 20 escaneos para no saturar el localStorage
  const updatedHistory = [newScan, ...history].slice(0, 20);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  return newScan;
};

export const getHistory = () => {
  if (typeof window === "undefined") return [];
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
