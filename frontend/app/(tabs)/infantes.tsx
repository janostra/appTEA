// import ChildHomeScreen from '../../screens/ChildHomeScreen';

// export default ChildHomeScreen;

// export const options = {
//   title: 'Infantes',
// }; 

import React from 'react';
import ChildHomeScreen from '../../screens/ChildHomeScreen';

export default function Infantes() {
  return <ChildHomeScreen infanteID={1} nombre="Mateo" />;
}

export const options = {
  title: 'Rutinas de Mateo',
};
