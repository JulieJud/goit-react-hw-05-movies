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
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="searchMovie"
          autoComplete="off"
          autoFocus
          placeholder="Search Movies"
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
