import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import axios from "axios";
let token = Cookies.get("token");
const Bsform = () => {
  useEffect(() => {
    axios
      .get("http://164.92.193.40:3002/v1/users/me", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>all good</h1>
    </>
  );
};

export default Bsform;
