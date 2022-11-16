import React, { useState } from "react";
import { InputsData } from "../../utils/types";
import * as consts from "../../utils/consts";
import logo from "../../assets/logo.svg";
import bags from "../../assets/bags.svg";
import "./Ticket.css";

function Ticket(props: InputsData): React.ReactElement {
  const [currentTime, setCurrentTime] = useState(0);

  const a = props.coords[0].lat - props.coords[1].lat;
  const b = props.coords[0].lon - props.coords[1].lon;
  const lineLength = Math.sqrt(a * a + b * b);
  const time = Math.round(lineLength * consts.TIME_STEP);
  const money = Math.round(lineLength * consts.MONEY_STEP);

  function changeTime(ind: number) {
    setCurrentTime(ind);
  }

  return (
    <section className="Ticket">
      <div className="Tickets__container">
        <div className="Ticket__content">
          <div className="Ticket__logo">
            <h5 className="Ticket__title">Невозвратный</h5>
            <img src={logo} alt="logo" className="Ticket__img" />
            <h3>S7 Airlines</h3>
          </div>
          <div className="Ticket__info">
            <div className="Ticket__data">
              <div className="Ticket__inform">
                <h2>{consts.TIMES[currentTime]}</h2>
                <h4>{props.inputsData[0]}</h4>
                <h4>{props.inputsData[2]}</h4>
              </div>
              <div className="Ticket__path">
                <div className="Ticket__path-line">
                  <h4 className="Ticket__path-text Ticket__path-input">
                    {props.codes[0]}
                  </h4>
                  <h4 className="Ticket__path-text Ticket__path-output">
                    {props.codes[1]}
                  </h4>
                </div>
                <h3 className="Ticket__path-text Ticket__path-time">
                  В пути {consts.MINS_TO_HOURS(time, true)}
                </h3>
              </div>
              <div className="Ticket__inform">
                <h2>{consts.GET_END_TIME(consts.TIMES[currentTime], time)}</h2>
                <h4>{props.inputsData[1]}</h4>
                <h4>{props.inputsData[2]}</h4>
              </div>
              <img
                src={bags}
                alt="bags"
                className="Ticket__bags"
                style={{ marginTop: "-36px" }}
              />
            </div>
            {props.inputsData[3] === "" ? (
              <div className="Ticket__buttons">
                {consts.TIMES.map((el, ind) => (
                  <button
                    key={ind}
                    className={`Ticket__button ${
                      ind === currentTime && "Ticket__button_active"
                    }`}
                    onClick={() => {
                      changeTime(ind);
                    }}
                  >{`${el} - ${consts.GET_END_TIME(
                    consts.TIMES[ind],
                    time
                  )}`}</button>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {props.inputsData[3] !== "" && (
          <div className="Ticket__content">
            <div className="Ticket__logo">
              <h5 className="Ticket__title">Невозвратный</h5>
              <img src={logo} alt="logo" className="Ticket__img" />
              <h3>S7 Airlines</h3>
            </div>
            <div className="Ticket__info">
              <div className="Ticket__data">
                <div className="Ticket__inform">
                  <h2>{consts.TIMES[currentTime]}</h2>
                  <h4>{props.inputsData[1]}</h4>
                  <h4>{props.inputsData[3]}</h4>
                </div>
                <div className="Ticket__path">
                  <div className="Ticket__path-line">
                    <span className="Ticket__path-text Ticket__path-input">
                      {props.codes[1]}
                    </span>
                    <span className="Ticket__path-text Ticket__path-output">
                      {props.codes[0]}
                    </span>
                  </div>
                  <h3 className="Ticket__path-text Ticket__path-time">
                    В пути {consts.MINS_TO_HOURS(time, true)}
                  </h3>
                </div>
                <div className="Ticket__inform">
                  <h2>
                    {consts.GET_END_TIME(consts.TIMES[currentTime], time)}
                  </h2>
                  <h4>{props.inputsData[0]}</h4>
                  <h4>{props.inputsData[3]}</h4>
                </div>
                <img
                  src={bags}
                  alt="bags"
                  className="Ticket__bags"
                  style={{ marginTop: "-36px" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <h1>
        {props.inputsData[3] !== ""
          ? consts.SET_SPACES(money * 2)
          : consts.SET_SPACES(money)}{" "}
        ₽
      </h1>
    </section>
  );
}

export default Ticket;
