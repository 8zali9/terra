"use client"

import { useState } from "react";

export default function Home() {
  const [res, setRes] = useState("")
  
  // async function handleRes() {
  //   const response = await fetch("http://localhost:8080/realestate/", {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   })
    
  //   if (response.status === 200) {
  //     const data = await response.json();
  //     setRes(data.message);
  //   } else {
  //     setRes("Error from server");
  //   }
  // }

  return (
    <main>
      <div className="homepage">
        {/* {res} */}
      </div>
      {/* <button color="#333" onClick={handleRes}>Fetch data</button> */}
    </main>
  );
}
