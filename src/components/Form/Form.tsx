import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ApiObject, FormProps, Coordinates } from "../../utils/types";
import Api from "../../utils/api";
import * as consts from "../../utils/consts";
import "./Form.css";

function Form(props: FormProps): React.ReactElement {
  const [isFormDataValid, setFormDataValid] = useState(false);
  const [countries, setCountries] = useState([""]);
  const [variants, setVariants] = useState(NaN);
  const [errorsText, setErrorsText] = useState(["", ""]);
  const [errors, setErrors] = useState([false, false, false]);
  const [inputsValidationData, setInputsValidationData] = useState([
    false,
    false,
    false,
    false,
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const array = inputsValidationData.slice(0, 3);

    if (array.every((i) => i === true)) {
      setFormDataValid(true);
    } else {
      setFormDataValid(false);
    }
  }, [inputsValidationData]);

  function submitForm(e: SyntheticEvent) {
    e.preventDefault();
    navigate("/avia/info");
  }

  function dateErrorsHandler(arg: boolean) {
    const isErrors = errors.slice();
    isErrors.splice(2, 1, arg);
    setErrors(isErrors);
    let error = "";

    if (arg) {
      error = consts.DATE_ERROR;
    }
    const errorText = errorsText.slice();
    errorText.splice(1, 1, error);
    setErrorsText(errorText);
  }

  function adressErrorsHandler(index: number, arg: boolean) {
    const isErrors = errors.slice();
    isErrors.splice(index, 1, arg);
    setErrors(isErrors);
    const errorText = errorsText.slice();
    const error = consts.ADRESS_ERROR;

    if (isErrors.every((el) => el === true)) {
      errorText.splice(0, 1, "");
    } else {
      errorText.splice(0, 1, error);
    }
    setErrorsText(errorText);
  }

  function updInputsDataHandler(value: string, index: number) {
    const array = props.inputsData.slice();
    array.splice(index, 1, value);
    props.setInputsData(array);
  }

  function inputsValidayionHandler(index: number, arg: boolean) {
    const arrayValidation = inputsValidationData.slice();
    arrayValidation.splice(index, 1, arg);
    setInputsValidationData(arrayValidation);
  }

  function airportCodesHandler(index: number, text: string) {
    const arrCodes = props.codes.slice();
    arrCodes.splice(index, 1, text);
    props.setCodes(arrCodes);
  }

  function coordinatesHandler(index: number, data: Coordinates) {
    const coords = props.coords.slice();
    coords.splice(index, 1, data);
    props.setCoords(coords);
  }

  function setCity(value: string, index: number) {
    updInputsDataHandler(value, index);
    setVariants(NaN);
    inputsValidayionHandler(index, true);
    const api = new Api(value);
    api.getCities().then((res) => {
      if (res) {
        (res as ApiObject[]).forEach((element) => {
          if ((element.name as string).toLowerCase() === value.toLowerCase()) {
            airportCodesHandler(index, element.code as string);
            coordinatesHandler(index, element.coordinates as Coordinates);
          }
        });
      }
    });
  }

  function validateText(value: string, index: number) {
    inputsValidayionHandler(index, false);
    airportCodesHandler(index, "");
    coordinatesHandler(index, { lat: NaN, lon: NaN });

    if (value.length > 2) {
      const api = new Api(value);
      api.getCities().then((res) => {
        if (res) {
          const names = (res as ApiObject[]).map((i) => i.name);
          const array = (names as string[]).filter((i) =>
            i.toLowerCase().includes(value.toLowerCase())
          );
          setCountries(array);

          if (array.length > 0) {
            setVariants(index);
            adressErrorsHandler(index, false);

            if (
              array.length === 1 &&
              array[0].toLowerCase() === value.toLowerCase()
            ) {
              setVariants(NaN);
              setCity(array[0], index);
            }
          } else {
            setVariants(NaN);
            adressErrorsHandler(index, true);
          }
        }
      });
    }
  }

  function validateDate(value: string, index: number) {
    const date = new Date();
    const currentDate = new Date(value);
    const localeDate = date.toLocaleDateString("en-US");
    const localeCurrentDate = currentDate.toLocaleDateString("en-US");
    const array = inputsValidationData.slice();

    if (Date.parse(localeCurrentDate) - Date.parse(localeDate) >= 0) {
      array.splice(index, 1, true);

      if (index === 2) {
        dateErrorsHandler(false);
      }
    } else {
      array.splice(index, 1, false);

      if (index === 2) {
        dateErrorsHandler(false);
      }
    }
    setInputsValidationData(array);
  }

  function changeData(e: ChangeEvent, index: number) {
    const value = (e.target as HTMLInputElement).value;
    updInputsDataHandler(value, index);

    if (index < 2) {
      validateText(value, index);
    } else {
      validateDate(value, index);
    }
  }

  return (
    <form onSubmit={submitForm}>
      <fieldset className="inputs">
        <div className="input">
          <input
            style={errors[0] === true ? { borderColor: "red" } : {}}
            type="text"
            id="from"
            name="from"
            placeholder="Город вылета"
            value={props.inputsData[0]}
            onChange={(e) => {
              changeData(e, 0);
            }}
          />
          <label htmlFor="from">Откуда</label>
          {variants === 0 ? (
            <div className="variants">
              {countries.map((it, ind) => (
                <p onClick={() => setCity(it, 0)} key={ind}>
                  {it}
                </p>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="input">
          <input
            style={errors[1] ? { borderColor: "red" } : {}}
            type="text"
            id="to"
            name="to"
            placeholder="Город прилета"
            value={props.inputsData[1]}
            onChange={(e) => {
              changeData(e, 1);
            }}
          />
          <label htmlFor="to">Куда</label>
          {variants === 1 ? (
            <div className="variants">
              {countries.map((it, ind) => (
                <p key={ind} onClick={() => setCity(it, 1)}>
                  {it}
                </p>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="input">
          <input
            style={errors[2] ? { borderColor: "red" } : {}}
            type="date"
            id="thither"
            name="thither"
            value={props.inputsData[2]}
            onChange={(e) => {
              changeData(e, 2);
            }}
          />
          <label htmlFor="thither">Туда</label>
        </div>
        <div className="input">
          <input
            type="date"
            id="backward"
            name="backward"
            value={props.inputsData[3]}
            onChange={(e) => {
              changeData(e, 3);
            }}
          />
          <label htmlFor="backward">Обратно</label>
        </div>
      </fieldset>
      <fieldset className="confirm">
        <button
          type="submit"
          disabled={!isFormDataValid}
          className={`submit ${!isFormDataValid && "submit_disabled"}`}
        >
          Найти билеты
        </button>
      </fieldset>
      {errors.some((el) => el === true)
        ? errorsText
            .filter((el) => el !== "")
            .map((it, ind) => (
              <span key={ind} className="error">
                *{it}
              </span>
            ))
        : ""}
    </form>
  );
}

export default Form;
