import { useCallback } from "react";

const useLocalStorage = () => {
  const setData = useCallback((key: string, data) => {
    window.localStorage.setItem(key, JSON.stringify(data));
  }, []);

  const getData = useCallback((key: string) => {
    const data = window.localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }, []);

  return { setData, getData };
};

export default useLocalStorage;
