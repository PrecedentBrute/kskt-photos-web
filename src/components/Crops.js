import React, { useEffect, useState } from "react";
import { storage } from "../firebase";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

const Crops = () => {
    const [urls, setUrls] = useState([]);
    const [data, setData] = useState([]);
 // List All Files
 const listItem = () => {
    storage.ref().child('processed_images/').listAll()
      .then(res => {
        setData(res);
        console.log("DATA", res);
        res.items.map((imageRef) => {
            imageRef.getDownloadURL().then((url) => {
                console.log(url);
                setUrls(arr => [...arr, url]);
            })
        })
      })
      .catch(err => {
        alert(err.message);
      })
  }

  return <div className="Crop bg-green-300 w-screen min-h-screen">
    
    <br /><br />
    <div className="text-center flex justify-center"><button onClick={listItem} className="m-2 p-2 bg-white rounded-md">Show Crops</button></div>
    <br /><br />
    {
      urls.map((val, i) => (
        <div className="my-2">
        <div className="font-semibold text-xl text-center">{capitalizeFirstLetter(data.items[i].location.path_.split('/')[1].split('_')[0])}</div>
        <img src={val} alt="img" className="block px-2"/>
        </div>
      ))
    }
</div>;
};

export default Crops;
