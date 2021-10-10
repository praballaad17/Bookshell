import { useState } from 'react';
import PropTypes from 'prop-types';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Image({ files, caption }) {
  const [counter, setCounter] = useState(0)
  const increase = () => {
    if (counter == files.length - 1) return null
    setCounter(counter + 1)
  }
  const decrease = () => {
    if (counter == 0) return null
    setCounter(counter - 1)
  }

  return (
    <div className="image-slider">
      <div className="image-slider__box">
        <img src={files[counter]} alt={caption} />
        <>
          {counter < (files.length - 1) &&
            (
              <button className="image-slider__btn image-slider__btn-inc" onClick={increase}>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            )
          }</>
        {counter !== 0 && <button className="image-slider__btn image-slider__btn-dec" onClick={decrease}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>}
      </div>

    </div>
  );
}

Image.propTypes = {
  files: PropTypes.array.isRequired,
  caption: PropTypes.string.isRequired
};
