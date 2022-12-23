import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./MainForm.css";
import Tilt from "react-parallax-tilt";
import Backdrop from "../assets/kskt_logo.png";
import "./MainForm.css";

export default function MainForm() {
  const history = useHistory();

  const handleSubmit = () => {
    if (userQuery.length === 0) {
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: `${userQuery}` }),
    };
    fetch(`localhost:6969/predict?version=${version.substring(1)}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let labels = [];
        data.predictions.forEach((prediction) => {
          if (prediction[1] > 0.5) {
            labels.push(prediction[0]);
          }else if(prediction[0] === "Non toxic"){
            labels.push(prediction[0]);
          }
        });
        setLabel(labels);
      
      })
      .catch((error) => console.log(error));
  };

  const [userQuery, setUserQuery] = useState("");
  const [label, setLabel] = useState("");
  const [version, setVersion] = useState("V1");

  return (
    <div className="App bg-green-600 h-screen w-screen absolute top-0 left-0 overflow-hidden flex justify-center items-center">
      <div className="main-cont p-8 rounded-2xl">
        <div className="h-full flex flex-col justify-evenly items-center">
          <div className="text-white font-poppins font-semibold text-2xl tracking-wider">
            WELCOME TO KSKT WEB-PORTAL
          </div>

          <div className="flex flex-col justify-center items-center">
            <img className="block my-4" src={Backdrop}></img>
          </div>
          <div className="flex flex-wrap">
            {label.length > 0 &&
              label.map((label) => (
                <div className="text-white rounded-xl m-2 text-center font-poppins font-bold border block border-white p-2">
                  {label}
                </div>
              ))}
          </div>
          <div className="flex items-center justify-center flex-col">
            <button
              onClick={() => {
                history.push("/dashboard");
              }}
              className="cursor-pointer border block border-white py-1 mx-4 px-4 my-1 text-white font-semibold rounded-xl"
            >
              DASHBOARD
            </button>
            <button
              onClick={() => {
                history.push("/crops");
              }}
              className="cursor-pointer border block border-white py-1 mx-4 px-4 my-1 text-white font-semibold rounded-xl"
            >
              CROP MANAGEMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
