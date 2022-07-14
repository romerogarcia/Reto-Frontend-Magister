import { Link } from 'react-router-dom';
function Final() {
  const handleClickStart = () => {};
  return (
    <>
      <main className="landing">
        <nav className="menu-burguer">
          <i className=" fa-solid fa-bars fa-4x  "></i>
        </nav>
        <section className="section">
          <div className="section__elements">
            <i className="fa-solid fa-landmark fa-4x "></i>
            <h1 className="section__elements__title">Magister</h1>
          </div>
          <p className="section__subtitle">¡Gracias!</p>
          <p className="section__subtitle">Tu reserva esta en proceso</p>
          <p className="section__text">
            La matrícula solo será efectiva una vez se haya recibido el Pago por
            Tarjeta o Transferencia
          </p>

          <button className="section__button" onClick={handleClickStart}>
            <Link className="section__button__link" to="/">
              Vuelve a Home
            </Link>
          </button>
          <p className="section__back">
            <Link className="section__back" to="/payment">
              Volver atrás
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
export default Final;
