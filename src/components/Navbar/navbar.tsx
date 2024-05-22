import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="navbar">
        <Avatar className="logo" src="/Logo.jpeg" sx={{cursor: "pointer"}} onClick = {() => {navigate("/")}} />
        <div className="brand-container">
          <div className="brand-name">Tring</div>
          <div className="brand-slogan">Stay Connected! Stay Organized!</div>
        </div>
        <div className="profile">
          <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600" alt="User Profile Image" />
          <div className="profile-detail">
            <p>John Doe</p>
            <p>jd.user@tmail.co</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
