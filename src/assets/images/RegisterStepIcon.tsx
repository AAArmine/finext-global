import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  active?: boolean;
}

const RegisterStepIcon: React.FC<Props> = ({ active = false, ...props }) => (
  <svg width={42} height={108} fill="none" {...props}>
    <path
      d="M21.699 74.84c-.633.618-1.699.17-1.699-.716V35.875c0-.885 1.066-1.334 1.699-.715l19.57 19.124a1 1 0 0 1 0 1.43L21.698 74.84Z"
      fill={active ? '#01E285' : '#C6C4D4'}
    />
    <path
      d="M20 108V0c9.212 8.022 16 29.23 16 54.587 0 25.356-6.788 46.565-16 53.413Z"
      fill="url(#a)"
      fillOpacity={0.26}
    />
    <path
      style={{
        mixBlendMode: 'multiply'
      }}
      d="M20 72.5c11.046 0 20-7.163 20-16s-8.954-16-20-16-20 7.163-20 16 8.954 16 20 16Z"
      fill="url(#b)"
    />
    <path d="M1 84.5v-59L31 55 1 84.5Z" fill="#F3FAF9" />
    <defs>
      <radialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 55.1739 -8.17391 0 20 54)"
      >
        <stop stopColor="#003502" />
        <stop offset={1} stopColor="#D9D9D9" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(15.8687 0 0 13.4732 19.32 56.65)"
      >
        <stop offset={0.03} stopColor="#262423" />
        <stop offset={0.07} stopColor="#393837" />
        <stop offset={0.15} stopColor="#676665" />
        <stop offset={0.25} stopColor="#908F8E" />
        <stop offset={0.34} stopColor="#B2B1B1" />
        <stop offset={0.44} stopColor="#CECECD" />
        <stop offset={0.55} stopColor="#E4E3E3" />
        <stop offset={0.67} stopColor="#F3F3F3" />
        <stop offset={0.8} stopColor="#FCFCFC" />
        <stop offset={1} stopColor="#fff" />
      </radialGradient>
    </defs>
  </svg>
);

export default RegisterStepIcon;
