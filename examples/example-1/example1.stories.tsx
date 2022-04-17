import React from 'react';
import App from '.';
import './index.css';

export default {
  title: 'EXAMLE 1 | Sipmle DND',
  parameters: {
    info: { inline: true },
  },
};
// export const TypingStory = () => {
//   return (
//     <div>
//       <Typing tag="h1">Test typing in packages</Typing>
//       <Local tag="h1">Test typing in packages local remastered</Local>
//     </div>
//   );
// };
export const Test = () => {
  return <App />;
};
