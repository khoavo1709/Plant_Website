import { NavLink, NavLinkProps } from 'react-router-dom';

type Props = NavLinkProps & {
  text: string;
};

const HeaderLink = (props: Props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? 'underline underline-offset-2' : ''
      }
      {...props}
    >
      {props.text}
    </NavLink>
  );
};

export default HeaderLink;
