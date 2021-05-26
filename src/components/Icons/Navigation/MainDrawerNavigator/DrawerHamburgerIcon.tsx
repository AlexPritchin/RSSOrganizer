import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const DrawerHamburgerIcon: React.FC<SvgProps> = props => {
  return (
    <Svg height={23} width={23} x="0px" y="0px" viewBox="0 0 24 24"  {...props}>
      <Path fill="currentColor" d="M21.5 24h-19A2.503 2.503 0 010 21.5v-19C0 1.122 1.121 0 2.5 0h19C22.879 0 24 1.122 24 2.5v19c0 1.378-1.121 2.5-2.5 2.5zM2.5 1C1.673 1 1 1.673 1 2.5v19c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5v-19c0-.827-.673-1.5-1.5-1.5z" />
      <Path fill="currentColor" d="M16.5 8h-9a.5.5 0 010-1h9a.5.5 0 010 1zM16.5 12.5h-9a.5.5 0 010-1h9a.5.5 0 010 1zM16.5 17h-9a.5.5 0 010-1h9a.5.5 0 010 1z" />
    </Svg>
  );
};

export default DrawerHamburgerIcon;