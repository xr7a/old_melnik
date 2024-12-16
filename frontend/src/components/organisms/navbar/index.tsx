import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo.svg';
import avatar from '../../../assets/images/avatar.svg';
import { Typography } from '../../../utils/typography/Typography';

interface INavBar {
  email: string;
}

const NavBar = ({ email }: INavBar) => {
  return (
    <nav className="flex justify-around bg-white">
      <NavLink to="/" className="pt-7 pb-7">
        <img src={logo} alt="" />
      </NavLink>
      <NavLink to="/" className="pt-5 pb-5 flex items-center gap-3">
        <Typography type="p2">{email}</Typography>
        <img src={avatar} alt="" />
      </NavLink>
    </nav>
  );
};

export default NavBar;
