import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";

function App(): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href !== `${window.location.origin}/avia`) {
      if (window.location.href !== `${window.location.origin}/avia/info`) {
        navigate("/avia");
      }
    }
  }, [navigate]);

  return (
    <main className="content">
      <Routes>
        <Route path="/avia/*" element={<Main />} />
      </Routes>
    </main>
  );
}

export default App;
