export default function handleInput(el) {
    const element = el.target;
    const errorElement = document.querySelector(`#error-${el.target.id}`);
    errorElement.textContent = "";
    errorElement.classList.remove('error-visible');
    element.classList.remove('input-invalid');
    if (!element.checkValidity()) {
        errorElement.textContent = el.target.validationMessage;
        errorElement.classList.add('error-visible');
        element.classList.add('input-invalid');
    }
}