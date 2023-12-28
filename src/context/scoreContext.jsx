// ResultContext.js

import { createContext, useContext, useState } from 'react';

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  return (
    <ResultContext.Provider value={{ score, updateScore }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => {
  return useContext(ResultContext);
};
