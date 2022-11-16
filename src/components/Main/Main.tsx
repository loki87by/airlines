import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Ticket from "../Ticket/Ticket";
import Form from "../Form/Form";
import { Coordinates } from "../../utils/types";
import "./Main.css";

function Main(): React.ReactElement {
  const [inputsData, setInputsData] = useState(["", "", "", ""]);
  const [codes, setCodes] = useState(["", ""]);
  const [coords, setCoords] = useState<Coordinates[]>([
    { lat: NaN, lon: NaN },
    { lat: NaN, lon: NaN },
  ]);

  return (
    <div className="content">
      <Routes>
        <Route
          path="/"
          element={
            <Form
              coords={coords}
              setCoords={setCoords}
              codes={codes}
              setCodes={setCodes}
              inputsData={inputsData}
              setInputsData={setInputsData}
            />
          }
        ></Route>
        <Route
          path="/info"
          element={
            <Ticket coords={coords} codes={codes} inputsData={inputsData} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default Main;
