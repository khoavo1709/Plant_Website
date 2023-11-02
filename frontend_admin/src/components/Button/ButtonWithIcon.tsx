export interface Item {
  text: string;
  background: string;
  hoverBackground: string;
  icon: JSX.Element;
}

const ButtonWithIcon = ({ text, background, hoverBackground, icon }: Item) => {
  return (
    <button
      className={`h-10 rounded-full mr-4 flex items-center gap-2 pl-4 pr-6 font-medium text-sm ${background} ${hoverBackground}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default ButtonWithIcon;
