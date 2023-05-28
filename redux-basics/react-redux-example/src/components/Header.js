import { useSelector, useDispatch } from "react-redux";

import classes from "components/Header.module.css";

import { authActions } from "store/auth";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const listItem = (
    <ul>
      <li>
        <a href="/">My Products</a>
      </li>
      <li>
        <a href="/">My Sales</a>
      </li>
      <li>
        <button onClick={logoutHandler}>Logout</button>
      </li>
    </ul>
  );

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>{isAuth && listItem}</nav>
    </header>
  );
};

export default Header;
