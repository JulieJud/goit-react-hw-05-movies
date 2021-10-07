import s from "./SearchBar.module.css";

export default function SearchBarPage({ onSubmit }) {
  const handleSearch = (e) => {
    e.preventDefault();
    const target = e.target.elements.searchMovie.value.toLowerCase();
    if (target.trim() === "") {
      return "The search field is empty!";
    }
    onSubmit(target);
    e.target.reset();
  };

  return (
    <div className={s.div}>
      <form onSubmit={handleSearch} className={s.form}>
        <input
          type="text"
          name="searchMovie"
          autoComplete="off"
          autoFocus
          placeholder="Search Movies"
          className={s.input}
        />
        <button type="submit" className={s.button}>
          <span className={s.span}>Search</span>
        </button>
      </form>
    </div>
  );
}
