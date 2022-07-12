import image from '../images/image3.png';
import { Link } from 'react-router-dom';
function Rates() {
  const handleClickNext = () => {};
  return (
    <>
      <main>
        <section className="section1">
          <div className="section1__elements">
            <i className="fa-solid fa-landmark fa-4x "></i>
            <h1 className="section1__elements__title">Magister</h1>
          </div>

          <div className="section1__container-task">
            <p className="section1__container-task__list">
              <i class="fa-regular fa-circle fa-lg"></i>¿En qué te quieres
              especializar?
            </p>

            <p className="section1__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>Horario y Modalidad
            </p>

            <div className="section1__container-task__newcolor">
              <p className="section1__container-task__newcolor">
                <i className="fa-solid fa-circle fa-lg"></i>
                Tarifa
              </p>
            </div>
            <p className="section1__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>Datos personales
            </p>

            <p className="section1__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>Dirección
            </p>

            <p className="section1__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>Forma de pago
            </p>
          </div>

          <section>
            <img alt="imagen persona" className="person-image" src={image} />
          </section>
        </section>

        <section className="section2">
          <h2 className="section2__title">Selecciona tú Tarifa</h2>

          <h3 className="section2__subtitle">Tarifas</h3>
          <p className="section2__text">(Selecciona una opción)</p>

          <div className="section2__container-rates-list">
            <button className="section2__container-rates-list__button-1">
              Inicio febrero 2021. Nuevo alumno SEMIPRESENCIAL - Material mes a
              mes - <strong>Matrícula 101.00 euros</strong>
            </button>
            <button className="section2__container-rates-list__button-2">
              Inicio febrero 2021. Nuevo alumno SOLO MENSUALIDAD - Material mes
              a mes - <strong>Matrícula 115.00 euros</strong>
            </button>
            <button className="section2__container-rates-list__button-3">
              Inicio febrero 2021. Nuevo alumno SEMIPRESENCIAL - Material mes a
              mes + MATRÍCULA - <strong>Matrícula 216.00 euros</strong>
            </button>
          </div>

          {/*RUTA AQUI */}
          <button className="section2__button" onClick={handleClickNext}>
            <Link className="section__button__link" to="/data">
              Siguiente
            </Link>
          </button>
          <p className="section__back">
            <Link className="section__back" to="/modality">
              Volver atrás
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
export default Rates;
