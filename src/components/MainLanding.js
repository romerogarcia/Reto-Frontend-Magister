import { Link } from 'react-router-dom';
function MainLanding() {
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
          <p className="section__subtitle">¡Comencemos con tu matrícula!</p>
          <p className="section__text">
            Para comenzar a especializarte, vamos a realizar unas preguntas para
            darte el mejor servicio
          </p>

          <button className="section__button" onClick={handleClickStart}>
            <Link className="section__button__link" to="/card">
              Comenzar
            </Link>
          </button>
          <p className="section__back">Volver atrás</p>
        </section>
      </main>
    </>
  );
}
export default MainLanding;
