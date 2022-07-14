import { CSSProperties } from 'react';

export const useStyles = (
  x?: number,
  y?: number,
  applied?: boolean,
): CSSProperties => {
    
  if (!x || !y) {
    return {};
  }
  if (!applied) {
    return {};
  }
  return {
    pointerEvents: 'none',
    position: 'fixed',
    top: `0`,
    left: `0`,
    transform: `translate(${x}px,${y}px)`,
    maxWidth: `500px`,
    maxHeight: `500px`,
    overflow: `hidden`,
    zIndex: `99`,
  };
};
