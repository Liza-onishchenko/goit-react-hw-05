import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import css from "./SearchForm.module.css";

const SearchForm = ({ query, onSearch }) => {
  const [inputValue, setInputValue] = useState(query);

  //обробник події інпуту
  const handleChange = (evt) => {
    setInputValue(evt.target.value); //оновлення стану відповідно до відповіді
  };

  //Обробник сабміту форм
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (inputValue.trim() === "") {
      //перевірка на порожній або нал
      toast.error("Please enter a search query");
      return;
    }
    onSearch(inputValue); //виклик ф-ї передану через пропс
    setInputValue(""); //очищаю поле
  };

  return (
    <div className={css.containerForma}>
      <form onSubmit={handleSubmit} className={css.formaSubmit}>
        <input
          type="text"
          name="query"
          value={inputValue} //привязка значення до стану
          onChange={handleChange} //обробнк події зміни
          placeholder="Enter movie title..."
          className={css.inputField}
        />
        <button type="submit" className={css.buttomForma}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
