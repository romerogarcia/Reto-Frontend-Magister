import image from '../images/image5.png';
import { Link } from 'react-router-dom';
function Address() {
  const handleClickNext = () => {};
  return (
    <>
      <main>
        <section className="section1-address">
          <div className="section1-address__elements">
            <i className="fa-solid fa-landmark fa-4x "></i>
            <h1 className="section1-address__elements__title">Magister</h1>
          </div>

          <div className="section1-address__container-task">
            <p className="section1-address__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>¿En qué te quieres
              especializar?
            </p>

            <p className="section1-address__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>Horario y Modalidad
            </p>

            <p className="section1-address__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>
              Tarifa
            </p>

            <p className="section1-address__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>Datos personales
            </p>

            <div className="section1-address__container-task__newcolor">
              <p className="section1-address__container-task__newcolor">
                <i className="fa-regular fa-circle fa-lg  "></i>Dirección
              </p>
            </div>
            <p className="section1-address__container-task__list">
              <i className="fa-solid fa-circle fa-lg"></i>Forma de pago
            </p>
          </div>

          <section>
            <img
              alt="Imagen de una persona"
              className="section1-address__image"
              src={image}
            />
          </section>
        </section>

        <section className="section2">
          <nav className="section2__menu">
            <i className=" fa-solid fa-bars fa-4x  "></i>
          </nav>
          <h2 className="section2__title">Tu dirección</h2>
          <form>
            <label className="section2__label" htmlFor="Status">
              <strong>Comunidad de Exámen</strong>
              <p className="section2__label__text">(Selecciona una opción)</p>
              <select
                defaultValue={'DEFAULT'}
                className="section2__label__option"
              >
                <option value={'DEFAULT'} disabled selected>
                  Ej: Madrid
                </option>
                <option value="option">Madrid</option>
              </select>
            </label>

            <label className="section2__label" htmlFor="address">
              <strong>Dirección</strong>
              <input
                className="section2__label__option"
                type="text"
                name="address"
                placeholder="Ej: Calle Ramiro de Maxtu, 10, 4D"
                required
              ></input>
            </label>

            <div className="section2__inputs">
              <label className="section2__inputs__label" htmlFor="locality">
                Localidad
                <input
                  className="section2__inputs__label__box"
                  type="text"
                  name="locality"
                  placeholder="Ej: Madrid"
                  required
                ></input>
              </label>

              <label className="section2__inputs__label" htmlFor="province">
                Provincia
                <input
                  className="section2__inputs__label__box"
                  type="text"
                  name="province"
                  placeholder="Ej: Madrid"
                  required
                ></input>
              </label>

              <label className="section2__inputs__label" htmlFor="cp">
                Código Postal
                <input
                  className="section2__inputs__label__box"
                  type="text"
                  name="cp"
                  placeholder="Ej: 28405"
                  required
                ></input>
              </label>
            </div>

            <div className="section2__checkbox">
              <label className="section2__checkbox__label">
                <input
                  type="checkbox"
                  id="cbox1"
                  value="first_checkbox"
                  className="section2__checkbox__label__input"
                />
                Acepto la <span> información legal</span>
              </label>
              <input
                type="checkbox"
                id="cbox2"
                value="second_checkbox"
                className="section2__checkbox__input2"
              />
              <label htmlFor="cbox2" className="section2__checkbox__label">
                Acepto la<span>protección de datos</span>
              </label>
            </div>
          </form>

          {/*RUTA AQUI */}
          <button className="section2__button" onClick={handleClickNext}>
            <Link className="section__button__link" to="/payment">
              Siguiente
            </Link>
          </button>
          <p className="section__back">
            <Link className="section__back" to="/data">
              Volver atrás
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
export default Address;
