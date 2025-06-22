import type { ChildrenIconProps } from "../../../Icon/Icon";

export const CloseIcon: React.FC<ChildrenIconProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M6.66675 25.3333L16.0001 16M16.0001 16L25.3334 6.66663M16.0001 16L6.66675 6.66663M16.0001 16L25.3334 25.3333"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
