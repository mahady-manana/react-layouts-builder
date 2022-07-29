import React, { SyntheticEvent } from 'react';

export default function DragIcon({
  width = 25,
  height = 25,
  addClass,
  addStyle,
  onClick,
}: {
  width?: number;
  height?: number;
  addClass?: string;
  addStyle?: React.CSSProperties;
  onClick?: (e: SyntheticEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      style={{ ...addStyle, cursor: 'grabbing' }}
      className={addClass}
      onClick={onClick}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 25 20`}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12.8333 10.5002C13.2936 10.5002 13.6667 10.1271 13.6667 9.66683C13.6667 9.20659 13.2936 8.8335 12.8333 8.8335C12.3731 8.8335 12 9.20659 12 9.66683C12 10.1271 12.3731 10.5002 12.8333 10.5002Z'
          stroke='#C4C4C4'
          strokeWidth='1.66667'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.8333 4.66667C13.2936 4.66667 13.6667 4.29357 13.6667 3.83333C13.6667 3.3731 13.2936 3 12.8333 3C12.3731 3 12 3.3731 12 3.83333C12 4.29357 12.3731 4.66667 12.8333 4.66667Z'
          stroke='#C4C4C4'
          strokeWidth='1.66667'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12.8333 16.3334C13.2936 16.3334 13.6667 15.9603 13.6667 15.5001C13.6667 15.0398 13.2936 14.6667 12.8333 14.6667C12.3731 14.6667 12 15.0398 12 15.5001C12 15.9603 12.3731 16.3334 12.8333 16.3334Z'
          stroke='#C4C4C4'
          strokeWidth='1.66667'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.83333 10.5002C8.29357 10.5002 8.66667 10.1271 8.66667 9.66683C8.66667 9.20659 8.29357 8.8335 7.83333 8.8335C7.3731 8.8335 7 9.20659 7 9.66683C7 10.1271 7.3731 10.5002 7.83333 10.5002Z'
          stroke='#C4C4C4'
          strokeWidth='1.66667'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.83333 4.66667C8.29357 4.66667 8.66667 4.29357 8.66667 3.83333C8.66667 3.3731 8.29357 3 7.83333 3C7.3731 3 7 3.3731 7 3.83333C7 4.29357 7.3731 4.66667 7.83333 4.66667Z'
          stroke='#C4C4C4'
          strokeWidth='1.66667'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M7.83333 16.3334C8.29357 16.3334 8.66667 15.9603 8.66667 15.5001C8.66667 15.0398 8.29357 14.6667 7.83333 14.6667C7.3731 14.6667 7 15.0398 7 15.5001C7 15.9603 7.3731 16.3334 7.83333 16.3334Z'
          stroke='#C4C4C4'
          strokeWidth='1.66667'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  );
}
