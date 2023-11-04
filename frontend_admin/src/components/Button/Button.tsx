export interface Item {
  text: string;
  background: string;
  hoverBackground: string;
  onclickFunc: () => void;
}

const ButtonWithIcon = ({
  text,
  background,
  hoverBackground,
  onclickFunc,
}: Item) => {
  return (
    <button
      onClick={onclickFunc}
      className={`h-10 rounded-full flex items-center px-6 font-medium text-sm ${background} ${hoverBackground}`}
    >
      {text}
    </button>
  );
};

export default ButtonWithIcon;
