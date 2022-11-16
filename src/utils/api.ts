const baseUrl = "http://autocomplete.travelpayouts.com/places2?term=";

export default class Api {
  value: string;
  constructor(value: string) {
    this.value = value;
  }

  getCities<T>(): Promise<T | unknown> {
    return fetch(`${baseUrl}${this.value}&locale=ru&types[]=city`, {}).then(
      (res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
      }
    );
  }
}
