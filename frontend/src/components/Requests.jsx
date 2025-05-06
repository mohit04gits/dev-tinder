// // import axios from "axios";
// // import { BASE_URL } from "../utils/constants";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addRequests } from "../utils/requestSlice";
// // import { useEffect } from "react";

// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addRequests, removeRequest } from "../utils/requestSlice";

// const Requests = () => {
//   const dispatch = useDispatch();
//   const requests = useSelector((store) => store.request);

//   //reviewRequests
//   const reviewRequest = async (status, _id) => {
//     try {
//       axios.post(
//         BASE_URL + "/request/review/" + status + "/" + _id,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeRequest(_id));
//     } catch (err) {}
//   };

//   const fetchReq = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/requests/recieved", {
//         withCredentials: true,
//       });
//       console.log(res.data);

//       dispatch(addRequests(res.data.data));
//     } catch (err) {
//       console.log("ERROR:" + err.message);
//     }
//   };

//   useEffect(() => {
//     fetchReq();
//   }, []);

//   if (!requests) return;

//   if (requests.length === 0)
//     return (
//       <div className="flex flex-col justify-center items-center ">
//         <h1 className="flex justify-center my-20"> No Requests Found</h1>
//         <img className="w-96" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWUFAIaDZNcehsy7_NOHs1Wd27dQkXVxK0JQ&s"/>
//       </div>
//     );

//   return (
//     <div className="text-center">
//       <h1 className="text-bold text-white my-20 text-3xl">Requests</h1>

//       {requests.map((request) => {
//         const { _id, firstName, lastName, photoUrl, age, gender, about } =
//           request.fromUserId;

//         return (
//           <div
//             key={_id}
//             className="flex justify-between m-2 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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
//             <div className="flex flex-col gap-2">
//               <button
//                 className="btn btn-primary mx-2"
//                 onClick={() => reviewRequest("rejected", request._id)}
//               >
//                 Reject
//               </button>
//               <button
//                 className="btn btn-secondary mx-2"
//                 onClick={() => reviewRequest("accepted", request._id)}
//               >
//                 Accept
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Requests;




import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message)
    }
  };

  const fetchReq = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log("ERROR:" + err.message);
    }
  };

  useEffect(() => {
    fetchReq();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="flex flex-col justify-center items-center px-4">
        <h1 className="text-xl md:text-2xl font-semibold text-white my-10">
          No Requests Found
        </h1>
        <img
          className="w-72 md:w-96"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWUFAIaDZNcehsy7_NOHs1Wd27dQkXVxK0JQ&s"
          alt="No Requests"
        />
      </div>
    );

  return (
    <div className="text-center mt-24 px-4">
      <h1 className="font-bold text-white my-10 text-3xl">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row justify-between items-center gap-4 m-2 p-4 rounded-lg bg-base-300 w-full sm:w-10/12 lg:w-2/3 xl:w-1/2 mx-auto shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-center text-left gap-4">
              <img
                alt="user"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
              <div>
                <h2 className="font-bold text-xl text-white">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-300">{age + ", " + gender}</p>
                )}
                <p className="text-gray-400">{about}</p>
              </div>
            </div>

            <div className="flex gap-2 flex-col sm:flex-row">
              <button
                className="btn btn-error text-white"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-success text-white"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
