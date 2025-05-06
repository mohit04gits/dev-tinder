// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnection } from "../utils/connectionSlice";


// const Connections = () => {
//   const connections = useSelector((store) => store.connections);
//   const dispatch = useDispatch();

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connections", {
//         withCredentials: true,
//       });
//       dispatch(addConnection(res.data.data));
//     } catch (err) {
//       // Handle Error Case
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return;

//   if (connections.length === 0)
//     return (
//       <div className="my-24 p-2 flex flex-col gap-20 justify-center items-center">
//         <h1>No connection found</h1>
//         <img src="https://cdn-icons-png.freepik.com/256/16321/16321862.png?semt=ais_hybrid" />
//       </div>
//     );

//   return (
//     <div className="text-center my-20">
//       <h1 className="text-bold text-white text-3xl">Connections</h1>

//       {connections.map((connection) => {
//         const { _id, firstName, lastName, photoUrl, age, gender, about } =
//           connection;

//         return (
//           <div
//             key={_id}
//             className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
//           >
//             <div className="flex">
//               <div>
//                 <img
//                   alt="photo"
//                   className="w-20 h-20 rounded-full object-cover"
//                   src={photoUrl}
//                 />
//               </div>
//               <div className="text-left mx-4 ">
//                 <h2 className="font-bold text-xl">
//                   {firstName + " " + lastName}
//                 </h2>
//                 {age && gender && <p>{age + ", " + gender}</p>}
//                 <p>{about}</p>
//               </div>
//             </div>
//             <div className="items-center flex items-center">
//               {/* <Link to={"/chat/" + _id}>
//                 <button className="btn btn-primary">Chat</button>
//               </Link> */}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default Connections;
//...............................................

// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnection } from "../utils/connectionSlice";
// import { Link } from "react-router-dom";
// //import { Link } from "react-router-dom"; // ✅ Added Link for navigation

// const Connections = () => {
//   const connections = useSelector((store) => store.connections);
//   const dispatch = useDispatch();

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connections", {
//         withCredentials: true,
//       });
//       dispatch(addConnection(res.data.data));
//     } catch (err) {
//       console.error("Error fetching connections:", err);
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return <div>Loading connections...</div>; // ✅ Fixed undefined return case

//   if (connections.length === 0)
//     return (
//       <div className="my-24 p-2 flex flex-col gap-20 justify-center items-center">
//         <h1>No connection found</h1>
//         <img src="https://cdn-icons-png.freepik.com/256/16321/16321862.png?semt=ais_hybrid" />
//       </div>
//     );

//   return (
//     <div className="text-center my-20">
//       <h1 className="text-bold text-white text-3xl">Connections</h1>

//       {connections.map((connection) => {
//         const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

//         return (
//           <div
//             key={_id}
//             className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
//           >
//             <div className="flex">
//               <div>
//                 <img alt="photo" className="w-20 h-20 rounded-full object-cover" src={photoUrl} />
//               </div>
//               <div className="text-left mx-4">
//                 <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
//                 {age && gender && <p>{age + ", " + gender}</p>}
//                 <p>{about}</p>
//               </div>
//             </div>
//             <div className="items-center flex items-center">
//               <Link to={"/chat/"+ _id} className="btn btn-primary">Chat</Link>
//               {console.log(_id)}
              
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Connections;


import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <div className="text-center text-xl text-gray-600">Loading connections...</div>;

  if (connections.length === 0)
    return (
      <div className="my-24 p-4 flex flex-col gap-6 justify-center items-center">
        <h1 className="text-2xl font-semibold text-gray-700">No connections found</h1>
        <img src="https://cdn-icons-png.freepik.com/256/16321/16321862.png?semt=ais_hybrid" alt="No connections" className="w-20 h-20 object-contain" />
      </div>
    );

  return (
    <div className="my-20 px-4">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Connections</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

          return (
            <div
              key={_id}
              className="flex flex-col justify-between  p-6 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-col items-center">
                <img
                  alt="photo"
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white mb-4"
                  src={photoUrl}
                />
                <h2 className="font-bold text-xl text-white">{firstName + " " + lastName}</h2>
                {age && gender && <p className="text-sm text-gray-200">{age + ", " + gender}</p>}
                <p className="text-gray-100 text-sm mt-2">{about}</p>
              </div>
              <div className="mt-4 text-center">
                <Link
                  to={`/chat/${_id}`}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  Chat
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
