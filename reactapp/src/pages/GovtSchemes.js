// import UserNavbar from "../inc/UserNavbar";

// function GovtSchemes() {
//   return (
//     <div>
//       <UserNavbar />
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-green-700">Government Schemes</h2>
//         <ul className="list-disc list-inside mt-4 text-gray-800">
//           <li>PM-KISAN Samman Nidhi</li>
//           <li>Soil Health Card Scheme</li>
//           <li>Pradhan Mantri Fasal Bima Yojana</li>
//           <li>Kisan Credit Card</li>
//           {/* Add more schemes here */}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default GovtSchemes;

import { useEffect, useState } from "react";
import UserNavbar from "../inc/UserNavbar";

function SchemeList() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/scheme/all")
      .then((res) => res.json())
      .then((data) => setSchemes(data));
  }, []);

  return (
    <div className="container">
      <UserNavbar />
      <h3>Available Schemes</h3>
      {schemes.map((s, idx) => (
        <div className="card mb-2" key={idx}>
          <div className="card-body">
            <h5>{s.title}</h5>
            <p>{s.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SchemeList;

