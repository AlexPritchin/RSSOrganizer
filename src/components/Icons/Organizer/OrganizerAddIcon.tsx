import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const OrganizerAddIcon: React.FC<SvgProps> = props => {
  return (
    <Svg
      height={18}
      width={18}
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z"
      />
    </Svg>
  );
};

export default OrganizerAddIcon;
