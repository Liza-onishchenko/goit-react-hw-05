import css from "./ErrorMessage.module.css";
const ErrorMessage = ({ message }) => {
  return (
    <div className={css.errorContainer}>
      <p>
        Opps, some error occured &quot;{message}&quot;...Please, try again
        later.
      </p>
    </div>
  );
};

export default ErrorMessage;
