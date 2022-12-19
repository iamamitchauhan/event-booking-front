import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  title?: string;
  backUrl?: string;
}
const Header = ({ title, backUrl }: Props) => {
  return (
    <div>
      <div>
        {backUrl && (
          <div>
            <NavLink to={backUrl}>{`< Back`}</NavLink>
          </div>
        )}
        <div>
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
