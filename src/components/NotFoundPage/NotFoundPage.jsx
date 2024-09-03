import "./NotFoundPage.css";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <main className="not-found-page">
      <div className="not-found-page__title-group">
        <h1 className="not-found-page__title">404</h1>
        <p className="not-found-page__text">Страница не найдена</p>
      </div>
      <button type="button" onClick={goBack} className="not-found-page__button">
        Назад
      </button>
    </main>
  );
}
