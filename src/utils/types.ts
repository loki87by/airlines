import { Dispatch, SetStateAction } from "react";

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface TranslitTable {
  [key: string]: string;
}

export interface ApiObject {
  [key: string]: string | number | Coordinates;
}

export interface InputsData {
  inputsData: string[];
  codes: string[];
  coords: Coordinates[];
}

export interface FormProps extends InputsData {
  setInputsData: Dispatch<SetStateAction<string[]>>;
  setCodes: Dispatch<SetStateAction<string[]>>;
  setCoords: Dispatch<SetStateAction<Coordinates[]>>;
}
