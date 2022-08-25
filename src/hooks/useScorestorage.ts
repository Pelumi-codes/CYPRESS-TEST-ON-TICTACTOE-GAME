import { useEffect } from 'react';
import { Score } from 'types';

export const useScoreStorage = ({
  score,
  setScore,
}: {
  score: Score;
  setScore: (scores: Score) => void;
}) => {
  useEffect(() => {
    const storage = localStorage.getItem('score');
    if (storage) {
      const storageScore = JSON.parse(storage);
      setScore(storageScore);
    }
  }, [setScore]);

  useEffect(() => {
    if (score.x === 0 && score.tie === 0 && score.o === 0 && score.cpu === 0) {
      return;
    }
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);
};
