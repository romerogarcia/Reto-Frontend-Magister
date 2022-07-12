import image from '../images/image4.png';
import { Link } from 'react-router-dom';
function Data() {
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

            <p className="section1__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>
              Tarifa
            </p>

            <div className="section1__container-task__newcolor">
              <p className="section1__container-task__newcolor">
                <i className="fa-solid fa-circle fa-lg"></i>Datos personales
              </p>
            </div>
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
          <h2 className="section2__title">Tus datos personales</h2>
          <form>
            <label className="section2__name" for="name">
              Nombre completo
              <input
                className="section2__input"
                type="text"
                name="name"
                placeholder="Ej: May García Sánchez"
                required
              ></input>
            </label>

            <div className="section2__inputs">
              <label className="section2__inputs__label" for="dni">
                DNI - NIE{' '}
                <input
                  className="section2__inputs__label__box"
                  type="text"
                  name="dni"
                  placeholder="Ej: Y5674859P"
                  required
                ></input>
              </label>

              <label className="section2__inputs__label" for="phone">
                Móvil
                <input
                  className="section2__inputs__label__box"
                  type="tel"
                  name="dni"
                  placeholder="Ej: 605 45 32 97"
                  required
                ></input>
              </label>

              <label className="section2__inputs__label" for="email">
                Email
                <input
                  className="section2__inputs__label__box"
                  type="email"
                  name="email"
                  placeholder="Ej: maygarcia@gmail.com"
                  required
                ></input>
              </label>
            </div>
          </form>

          {/*RUTA AQUI */}
          <button className="section2__button" onClick={handleClickNext}>
            <Link className="section__button__link" to="/address">
              Siguiente
            </Link>
          </button>
          <p className="section__back">
            <Link className="section__back" to="/rates">
              Volver atrás
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
export default Data;
