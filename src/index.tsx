import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GrNTTCHArt from "./App"; // импортируйте ваш компонент
import { createRoot } from "react-dom/client";

function App() {
  const [minDate, setMinDate] = useState(null); // установите минимальную дату
  const [maxDate, setMaxDate] = useState(null); // установите максимальную дату

  // Проверка наличия minDate и maxDate перед созданием графика
  const isDatesSelected = minDate !== null && maxDate !== null;

  return (
    <div>
      <div>
        <label>Минимальная дата: </label>
        <DatePicker
          selected={minDate}
          onChange={(date) => setMinDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label>Максимальная дата: </label>
        <DatePicker
          selected={maxDate}
          onChange={(date) => setMaxDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      {isDatesSelected ? (
        <GrNTTCHArt minsetDate={minDate} maxsetDate={maxDate} />
      ) : (
        <GrNTTCHArt minsetDate={null} maxsetDate={null} />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);
