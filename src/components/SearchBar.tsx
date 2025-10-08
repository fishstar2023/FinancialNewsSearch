interface SearchBarProps {
  keyword: string;
  setKeyword: (kw: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword, setKeyword, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={keyword}
        placeholder="輸入關鍵字..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={onSearch}>搜尋新聞</button>
    </div>
  );
};

export default SearchBar;
