type NewsItem = {
  id: number;
  title: string;
  summary: string;
  date: string;
  source: string;
};

interface NewsListProps {
  newsList: NewsItem[];
  onGenerateReport: (news: NewsItem) => void;
}

const NewsList: React.FC<NewsListProps> = ({ newsList, onGenerateReport }) => {
  return (
    <div className="news-list">
      <h2>新聞列表</h2>
      {newsList.map((news) => (
        <div key={news.id} className="news-card">
          <strong>{news.title}</strong>
          <p>{news.summary}</p>
          <small>{news.date} | {news.source}</small>
          <br />
          <button onClick={() => onGenerateReport(news)}>生成報告</button>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
