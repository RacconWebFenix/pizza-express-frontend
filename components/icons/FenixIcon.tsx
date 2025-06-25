import { Icon, IconProps } from "@chakra-ui/react";

interface FenixIconProps extends Omit<IconProps, "size"> {
  size?: string | number;
}

export const FenixIcon = ({ size = "24px", ...props }: FenixIconProps) => {
  return (
    <Icon width={size} height={size} viewBox="0 0 48 48" {...props}>
      <g>
        <defs>
          <linearGradient
            id="phoenixGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Corpo da Fênix */}
        <path
          d="M24 8C26 8 28 10 28 14C28 16 26 18 24 18C22 18 20 16 20 14C20 10 22 8 24 8Z"
          fill="url(#phoenixGradient)"
        />

        {/* Asa esquerda */}
        <path
          d="M12 20C14 18 18 20 20 24C18 26 14 28 12 26C10 24 10 22 12 20Z"
          fill="url(#phoenixGradient)"
          opacity="0.8"
        />

        {/* Asa direita */}
        <path
          d="M36 20C34 18 30 20 28 24C30 26 34 28 36 26C38 24 38 22 36 20Z"
          fill="url(#phoenixGradient)"
          opacity="0.8"
        />

        {/* Cauda */}
        <path
          d="M24 28C22 30 20 34 22 38C24 40 26 40 28 38C30 34 28 30 24 28Z"
          fill="url(#phoenixGradient)"
          opacity="0.9"
        />

        {/* Detalhes */}
        <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="24" cy="36" r="1.5" fill="currentColor" opacity="0.7" />
      </g>
    </Icon>
  );
};
