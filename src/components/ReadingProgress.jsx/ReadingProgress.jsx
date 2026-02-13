import starImg from "../../img/star.png";
import starImg2x from "../../img/star@2x.png";

import css from "./ReadingProgress.module.css";

const ReadingProgress = () => {
  return (
    <div>
      <h2 className={css.title}>Progress</h2>
      <div className={css.noProgressWrapper}>
        <p className={css.text}>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <div className={css.imgWrapper}>
          <img
            className={css.img}
            src={starImg}
            srcSet={`${starImg} 1x, ${starImg2x} 2x`}
            alt="star"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default ReadingProgress;