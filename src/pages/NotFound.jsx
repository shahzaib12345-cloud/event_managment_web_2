import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="container page center-text">
      <h1>404</h1>
      <p>Sorry, this page does not exist.</p>
      <Link to="/" className="btn" style={{ marginTop: 15 }}>Go Home</Link>
    </div>
  );
}

export default NotFound;