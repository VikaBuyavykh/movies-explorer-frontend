export default function handleInput(ev) {
    const element = ev.target;
    const errorElement = document.querySelector(`#error-${ev.target.id}`);
    errorElement.textContent = "";
    errorElement.classList.remove('error-visible');
    element.classList.remove('input-invalid');
    if (!element.checkValidity()) {
        if (ev.target.validationMessage === "Используйте требуемый формат.") {
            errorElement.textContent = "Имя может содержать только латиницу, кириллицу, пробел или дефис";
        } else {
            errorElement.textContent = ev.target.validationMessage;
        }
        errorElement.classList.add('error-visible');
        element.classList.add('input-invalid');
    }
}