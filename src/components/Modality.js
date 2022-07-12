import image from '../images/image2.png';
import { Link } from 'react-router-dom';
function Modality() {
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

            <div className="section1__container-task__newcolor">
              <p className="section1__container-task__newcolor">
                <i className="fa-solid fa-circle fa-lg"></i>Horario y Modalidad
              </p>
            </div>
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
            <img alt="imagen persona" className="section1__image" src={image} />
          </section>
        </section>

        <section className="section2">
          <h2 className="section2__title">
            Elige el horario y modalidad que más te acomode
          </h2>

          <h3 className="section2__subtitle">Modalidad</h3>
          <p className="section2__text">(Selecciona una opción)</p>

          <div className="section2__container-b">
            <button className="section2__container-b__button-big">
              Presencial 2020/2021
            </button>
            <button className="section2__container-b__button-big">
              Semipresencial 2020/2021
            </button>
            <button className="section2__container-b__button-big">
              Videoconferencia en directo 2020/2021
            </button>
            <button className="section2__container-b__button-big">
              Adaptación a la Lomloe
            </button>
          </div>

          <div className="section2__container-selects">
            <div className="section2__container-selects__label">
              <label
                className="container-selects__label__text"
                htmlFor="Status"
              >
                Horario
                <p className="container-selects__label__text">
                  (Selecciona una opción)
                </p>
                <select className="section2__container-selects__label__options">
                  <option value="option1">
                    1 Clase al mes Prácticas y Programación sábados por la
                    mañana. Grupo 1 de 10 a 14 horas
                  </option>
                </select>
                <select className="section2__container-selects__label__options">
                  <option value="option1">
                    1 Clase al mes Prácticas y Programación sábados por la
                    mañana. Grupo 1 de 10 a 14 horas
                  </option>
                </select>
                <select className="section2__container-selects__label__options">
                  <option value="option1">
                    1 Clase al mes Prácticas y Programación sábados por la
                    mañana. Grupo 1 de 10 a 14 horas
                  </option>
                </select>
              </label>
            </div>
          </div>
          {/*RUTA AQUI */}
          <button className="section2__button" onClick={handleClickNext}>
            <Link className="section__button__link" to="/rates">
              Siguiente
            </Link>
          </button>
          <p className="section2__back">Volver atrás</p>
        </section>
      </main>
    </>
  );
}
export default Modality;
