import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";
const Card = ({ title, image, desc, link }) => {
  let navigate = useNavigate();
  return (
    <>
      <div className={styles.maincard} onClick={() => navigate("/" + link)}>
        <h1>{title}</h1>

        <div className={styles.imgcon}>
          <img src={image} />
        </div>

        <div className={styles.carddesc}>{desc}</div>
      </div>
    </>
  );
};
export default Card;