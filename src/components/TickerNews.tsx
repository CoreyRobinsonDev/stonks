import { TickerNews as TickerNewsType } from "../util/types";
import TickerNewsCSS from "../modules/TickerNews.module.css";

type Props = {
  news: TickerNewsType | undefined
}

const TickerNews: React.FC<Props> = ({ news }) => {
  const result = news?.results;

  if (result) return <section className={TickerNewsCSS.container}>
    {result?.map((story) => <article className={TickerNewsCSS.article__container}>
      <div>
        <header className={TickerNewsCSS.header__container}>
          <h2 className={TickerNewsCSS.header__title}>{story.title}</h2>
          <p>{story.published_utc.slice(0, 10)}</p>
          <p>by {story.author}</p>
          <small className={TickerNewsCSS.header__tag_container}>{story.keywords?.map((word) => <span className={TickerNewsCSS.header__tag}>{word}</span>)}</small>
        </header>
        <main>
          <img className={TickerNewsCSS.main__img} src={story.image_url} alt="" />
          <p className={TickerNewsCSS.main__description}>{story.description}</p>
        </main>
      </div>
        <footer>
          <ul className={TickerNewsCSS.footer__list}>
            <li>Link to article: <a href={story.article_url} target="_blank" rel="noreferrer">{story.article_url}</a></li>
            <li>Publisher: <em>{story.publisher.name},</em> <a href={story.publisher.homepage_url} target="_blank" rel="noreferrer">{story.publisher.homepage_url}</a></li>
          </ul>
        </footer>
    </article>)
    }
  </section>
  return <></>;
}

export default TickerNews;