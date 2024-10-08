# Проект "Movies-Explorer"

Это репозиторий моей дипломной работы в Яндекс.Практикуме, за которую я получила 293/300 балла. Здесь находится лишь фронтенд-часть приложения, сейчас она подключена к Mokky - сервису создания тестовых API. Бекэнд-часть, написанная на Express, отключена от ВМ, но ее код доступен [по ссылке](https://github.com/VikaBuyavykh/movies-explorer-api).

"Movies-Explorer" – это одностраничное приложение по поиску фильмов. На стартовой странице представлена сжатая информация о нем, сам же проект доступен после авторизации. В нем осуществлены:

- регистрация и авторизация пользователя
- редактирование профиля
- поиск фильмов по названию
- их фильтрация по продолжительности
- добавление (/удаление) в "сохраненные"

## Tools

Страница адаптивная, в ней используется семантическая Desctop First верстка. Код написан на Create React App, "под капотом" взаимодействующий с Webpack и Babel. Реализованы следующие инструменты:

- Create React App, JSX
- компонентный подход
- работа с реактивностью, хуками useState, useEffect, useMemo
- кастомные хуки
- работа с формами и асинхронным кодом (fetch)
- хранение данных в localStorage
- передача "глобальных" данных при помощи Context
- маршрутизация с React Router и Protected Routes

## Стек технологий

- React
- Webpack
- React Router
- AJAX с Fetch API
- БЭМ
- CSS
- Figma
- Perfect Pixel

## Ссылки на проект

[Ссылка на макет](https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/%D0%94%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC%D0%BD%D1%8B%D0%B9-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82?type=design&node-id=1-8436&mode=dev)

[Деплой](https://movies-explorer-diploma.vercel.app/)
