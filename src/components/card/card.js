import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";
import { FadeLoader } from "react-spinners";
const Card = ({ title, image, desc, link }) => {
  let navigate = useNavigate();
  return (
    <>
      <div className={styles.maincard} onClick={() => navigate("/" + link)}>
        <h1>{title}</h1>

        <div className={styles.imgcon}>
          <Suspense fallback={<FadeLoader color="black" size="50" />}>
            <img src={image} />
          </Suspense>
        </div>

        <div className={styles.carddesc}>{desc}</div>
      </div>
    </>
  );
};
export default Card;
