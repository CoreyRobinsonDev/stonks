import { TickerNews as TickerNewsType } from "../util/types";

type Props = {
  news: TickerNewsType | undefined
}

const TickerNews: React.FC<Props> = ({ news }) => {
  const result = news?.results;
  console.log(news)
  return <section>
    {result ?
      result?.map((story) => <article>
        <header>
          <h2>{story.title}</h2>
          <p>{story.published_utc.slice(0, 10)}</p>
          <p>{story.author}</p>
          <small>{story.keywords?.map((word) => <span>#{word} </span>)}</small>
        </header>
        <main>
          <img src={story.image_url} alt="" />
          <p>{story.description}</p>
        </main>
        <footer>
          <ul>
            <li>Link to article: <a href={story.article_url} target="_blank" rel="noreferrer">{story.article_url}</a></li>
            <li>Publisher: <p>{story.publisher.name}</p> <a href={story.publisher.homepage_url} target="_blank" rel="noreferrer">{story.publisher.homepage_url}</a></li>
          </ul>
        </footer>
      </article>)
  : ""}
  </section>
}

export default TickerNews;