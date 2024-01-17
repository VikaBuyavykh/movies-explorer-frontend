import Form from '../Form/Form';
import { useForm } from '../../utils/useFormHook';
import handleInput from '../../utils/validation';

export default function Register() {
    const {values, handleChange, setValues} = useForm({ name: 'Виталий' });

    return (
        <Form 
            name="register"
            titleText="Добро пожаловать!"
            buttonText="Зарегистрироваться"
            questionText="Уже зарегистрированы?"
            linkText="Войти"
            linkTo="/signin"
        >
            <div className="form__input-group">
                <label htmlFor="name" className="form__label">Имя</label>
                <input className="form__input" id="name" name="name" placeholder="Ваше имя" value={values.name || ''} type="text" onChange={handleChange} onInput={handleInput} required minLength="2" maxLength="30" />
                <span id="error-name" className="form__error"></span>
            </div>
        </Form>
    );
}