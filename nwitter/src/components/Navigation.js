import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav className="nav">
    <ul>
      <li>
        <Link to="/" className="link__home">
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
      <li>
        <Link to="/profile" className="link__profile">
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span>
            {userObj.displayName ? `${userObj.displayName}의 프로필` : "프로필"}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
