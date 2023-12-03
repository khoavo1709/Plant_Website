import { NavLink, NavLinkProps } from 'react-router-dom';

type Props = NavLinkProps & {
  text: string;
};

const HeaderLink = (props: Props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive ? 'underline text-green-900/70' : ''
        } underline-offset-[6px] hover:underline hover:text-green-900/60`
      }
      {...props}
    >
      {props.text}
    </NavLink>
  );
};

export default HeaderLink;
