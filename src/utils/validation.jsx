import { emailRegex } from "./regex";

export default function handleInput(ev) {
    function isEmailValid(value) {
        return emailRegex.test(value);
    }
    const element = ev.target;
    const errorElement = document.querySelector(`#error-${ev.target.id}`);
    errorElement.textContent = "";
    errorElement.classList.remove('error-visible');
    element.classList.remove('input-invalid');
    if (element.id === 'email') {
        if (!isEmailValid(element.value)) {
            errorElement.textContent = "Передан некорректный email";
            errorElement.classList.add('error-visible');
            element.classList.add('input-invalid');
        }
    } else {
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
}