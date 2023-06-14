import { BeatLoader } from "react-spinners";
const PlzWait = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:'column'
        }}
      >
        <BeatLoader color="#5db16e" />
        <p>Please Wait While we load the page.</p>
      </div>
    </>
  );
};
export default PlzWait;
