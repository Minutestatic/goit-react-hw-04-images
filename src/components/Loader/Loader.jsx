import { Dna } from 'react-loader-spinner';
import css from './Loader.module.css';
const Loader = props => {
  return (
    <div>
      <Dna
        textAlign="center"
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass={css.loader}
      />
    </div>
  );
};
export default Loader;
