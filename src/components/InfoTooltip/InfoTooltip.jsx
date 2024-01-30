import './InfoTooltip.css';

const InfoTooltip = ({setIsInfoTooltipVisible, isInfoTooltipVisible}) => {
    function handleInfoTooltipClose() {
        setIsInfoTooltipVisible(false);
    }

    return (
        <>
            <div className={`info-tooltip ${isInfoTooltipVisible ? 'info-tooltip_visible' : ''}`}>
                <div className="info-tooltip__container">
                    <p className="info-tooltip__text">Ваши данные успешно сохранены</p>
                    <button onClick={handleInfoTooltipClose} className="info-tooltip__close-button"></button>
                </div>
            </div>
        </>
    )
};

export default InfoTooltip;
