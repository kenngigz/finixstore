import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Finix Casino Bar!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>Customers service is our priority.</p>
        <address className="public__addr">
          Finix Casino
          <br />
          Harlingham
          <br />
          Nyaku House
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Kenneth Ngige</p>
      </main>
      <footer>
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
