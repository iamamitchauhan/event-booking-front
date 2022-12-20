import { NavLink } from "react-router-dom";
import BackIcon from "../assets/icons/left-arrow.svg";

interface Props {
  title?: string;
  backUrl?: string;
}
const Header = ({ title, backUrl }: Props) => {
  return (
    <div>
      <div className="flex items-center pb-3 mb-7 border-b border-[#e6e6e69c]">
        {backUrl && (
          <div className="text-sm text-[#1F75FE] hover:text-[#0161FA] transition-all duration-200">
            <NavLink to={backUrl}>
              <img src={BackIcon} alt="back-icon" />
            </NavLink>
          </div>
        )}
        <div className="w-full text-center">
          <h1 className="text-xl text-center">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
