import css from './Button.module.css';
const Button = ({ loadMoreImages }) => {
  return (
    <button className={css.Button} onClick={loadMoreImages}>
      Load more
    </button>
  );
};

export default Button;
