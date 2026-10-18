import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="hero">
      <div className="container">
        <h1>Find events you will love</h1>
        <p>Browse concerts, sports, theatre and more. Register in one click and manage everything in one place.</p>
        <Link to="/events" className="btn hero-btn">Explore Events</Link>
      </div>
    </div>
  );
}

export default Home;