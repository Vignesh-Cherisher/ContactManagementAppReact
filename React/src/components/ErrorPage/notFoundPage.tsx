import { NavLink } from "react-router-dom";

const NotFoundPage: React.FC = () => {

  return (
    <>
      <div className="not-found-text">
        <h1>404</h1>
        <h2>Uh, Ohh</h2>
        <h3>
          Sorry we cant find what you are looking for 'cuz its so dark in here
        </h3>
      </div>
      <div className="torch"></div>
      <NavLink to="/" replace={true}>Go Back To Home</NavLink>
    </>
  );
};

export default NotFoundPage;
