import image from '../images/image1.png';
import { Link } from 'react-router-dom';
function Specialized() {
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
            <div className="section1__container-task__newcolor">
              <p className="section1__container-task__newcolor">
                <i class="fa-regular fa-circle fa-lg"></i>¿En qué te quieres
                especializar?
              </p>
            </div>

            <p className="section1__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>Horario y Modalidad
            </p>

            <p className="section1__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>
              Tarifa
            </p>

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
          <h2 className="section2__title">¿En qué te quieres especializar?</h2>

          <div className="section2__container-selects">
            <div className="section2__container-selects__label">
              <label
                className="container-selects__label__text"
                htmlFor="Status"
              >
                Rama
                <p>(Selecciona una opción)</p>
                <select className="section2__container-selects__label__choices">
                  <option disabled selected>
                    Ej: Maestros - Audición y lenguajes
                  </option>
                  <option value="all">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>

            <div className="section2__container-selects__label">
              <label
                className="section2__container-selects__label__text"
                htmlFor="Status"
              >
                Provincia <p>(Selecciona una opción)</p>
                <select className="section2__container-selects__label__choices">
                  <option disabled selected>
                    Ej: Madrid
                  </option>
                  <option value="all">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
            </div>
          </div>

          <div className="section2__container-alum">
            <h3 className="section2__container-alum__title">
              ¿Has sido alumn@ de Magister?
            </h3>
            <p className="section2__container-alum__text">
              Consulta Condiciones <i class="fa-solid fa-arrow-right fa-lg"></i>
            </p>

            <div className="section2__container-b">
              <button className="section2__container-b__button">No</button>
              <button className="section2__container-b__button">Si</button>
              <button className="section2__container-b__button-b">
                Sí, después de 2017
              </button>
            </div>

            <div className="section2__container-material">
              <h3 className="section2__container-material__title">
                Entrega de material
              </h3>
              <p className="section2__container-material__text">
                Consulta Condiciones{' '}
                <i class="fa-solid fa-arrow-right fa-lg"></i>
              </p>
              <button className="section2__container-material__button">
                Material mes a mes
              </button>
            </div>

            <button className="section2__button" onClick={handleClickNext}>
              <Link className="section__button__link" to="/modality">
                Siguiente
              </Link>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
export default Specialized;
