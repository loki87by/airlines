import { translit } from "./consts";

const baseUrl = "http://autocomplete.travelpayouts.com/places2?term=";

export default class Api {
  value: string;
  constructor(value: string) {
    this.value = value;
  }

  getCities<T>(): Promise<T | unknown> {
    return fetch(`${baseUrl}${this.value}&locale=ru&types[]=city`, {})
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          const data = [
            {
              code: translit(this.value).slice(0, 3).toUpperCase(),
              name: this.value,
              coordinates: { lat: Math.random() * 20, lon: Math.random() * 20 },
            },
          ];
          return data;
        }
      })
      .catch(() => {
        const data = [
          {
            code: translit(this.value).slice(0, 3).toUpperCase(),
            name: this.value,
            coordinates: { lat: Math.random() * 20, lon: Math.random() * 20 },
          },
        ];
        return data;
      });
  }
}
