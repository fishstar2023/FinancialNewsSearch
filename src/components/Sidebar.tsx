interface SidebarProps {
  topic: string;
  setTopic: (topic: string) => void;
  country: string;
  setCountry: (country: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  topic,
  setTopic,
  country,
  setCountry
}) => {
  const topics = ["finance", "tech", "energy"];
  const countries = ["SG", "MY", "ID", "TH", "VN"];

  return (
    <div className="sidebar">
      <h3>主題</h3>
      <ul>
        {topics.map((t) => (
          <li
            key={t}
            style={{ fontWeight: t === topic ? "bold" : "normal", cursor: "pointer" }}
            onClick={() => setTopic(t)}
          >
            {t.toUpperCase()}
          </li>
        ))}
      </ul>
      <h3>國家</h3>
      <ul>
        {countries.map((c) => (
          <li
            key={c}
            style={{ fontWeight: c === country ? "bold" : "normal", cursor: "pointer" }}
            onClick={() => setCountry(c)}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
