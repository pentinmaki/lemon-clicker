import { useEffect, useState } from "react";

const readStoredValue = (key, defaultState, migrate) => {
  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) return defaultState;

    return migrate(JSON.parse(rawValue));
  } catch {
    // Rikkinäinen tai vanhentunut tallennus ei saa estää pelin käynnistymistä.
    return defaultState;
  }
};

const useLocalStorage = (key, defaultState, migrate = (value) => value) => {

  const [value, setValue] = useState(() =>
    readStoredValue(key, defaultState, migrate)
  );

  // Tallennetaan tilamuuttuja localStorageen aina,
  // kun arvo muuttuu.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Esimerkiksi yksityinen selaustila voi estää tallennuksen.
      // Peli toimii silti avoinna olevassa selainistunnossa.
    }
  }, [key, value]);

  // Alkuarvojen palautusfunktio.
  const resetValue = () => {
    setValue(defaultState);
  }

  return [value, setValue, resetValue];
}

export default useLocalStorage;
