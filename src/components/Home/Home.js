import Card from "../UI/Card";
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <Card>
      <h1 className="mb-0">Welcome to react-base-app</h1>
      <p>Please Login or Register to access the protected site.</p>
      <NavLink to="/auth"><button className="btn btn-white" type="button">Go to Login / Register</button></NavLink>
    </Card>
  );
};

export default Home;