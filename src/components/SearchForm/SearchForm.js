
import "./SearchForm.css";

function SearchForm() {
    
  
    return (
      <form className="search" name="search" >
        <div className="search__container search__container_type_query">
          <input
            name="text"
            className="search__text"
            type="text"
            placeholder="Фильм"
            required/>
          <button
            className="search__btn"
            type="submit">
    
          </button>
        </div>
        <div className="search__container search__container_type_filter">
        <label className="search__label">Короткометражки</label>
          <label>
            <input
              name="short"
              type="checkbox"
              className="search__filter"
            />
            <span className="search__visible-filter"/>
          </label>
          
        </div>
      </form>
    );
}

export default SearchForm;
