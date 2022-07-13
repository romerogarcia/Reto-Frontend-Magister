import image from '../images/image6.png';
import { Link } from 'react-router-dom';
function Payment() {
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
              <i class="fa-solid fa-circle fa-lg"></i>¿En qué te quieres
              especializar?
            </p>

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
            <div className="section1__container-task__newcolor">
              <p className="section1__container-task__newcolor">
                <i
                  className="
               fa-regular fa-circle fa-lg "
                ></i>
                Forma de pago
              </p>
            </div>
          </div>

          <section>
            <img alt="imagen persona" className="section1__image" src={image} />
          </section>
        </section>

        <section className="section2-final">
          <nav className="section2__menu">
            <i className=" fa-solid fa-bars fa-4x  "></i>
          </nav>
          <h2 className="section2-final__title">Forma de pago</h2>
          <h3 className="section2__container-alum__title">
            ¿Cómo prefieres abonar tu primer pago?
          </h3>

          <div className="section2-final__container">
            <button className="section2-final__container__box">
              Tarjeta de crédito/cébito (Recomendado)
            </button>
            <button className="section2-final__container__box">
              Transferencia bancaria
            </button>
          </div>

          <p className="section2-final__container-alum__text">
            Detalles sobre forma de pago y proceso post pago
            <i class="fa-solid fa-arrow-right fa-lg"></i>
          </p>

          <h3 className="section2-final__container-alum__title">
            ¿Vienes recomendado por alguien?
          </h3>
          <button className="section2__container-b__button">No</button>
          <button className="section2__container-b__button">Si</button>

          <p className="section2-final__container-alum__text">
            Ver información legal
            <i class="fa-solid fa-arrow-right fa-lg"></i>
          </p>

          {/*RUTA AQUI */}
          <button className="section2__button" onClick={handleClickNext}>
            <Link className="section__button__link" to="/final">
              Enviar
            </Link>
          </button>
          <p className="section__back">
            <Link className="section__back" to="/address">
              Volver atrás
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
export default Payment;
