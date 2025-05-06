// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// const Premium = () => {
//   //buyClick function
//   const handleBuyClick = async (type) => {
//     const order = await axios.post(
//       BASE_URL + "/payment/create",
//       {
//         membershipType: type,
//       },
//       { withCredentials: true }
//     );

//     const {amount, keyId, currency,notes, orderId} = order.data

//     const options = {
//       key: keyId, // Replace with your Razorpay key_id
//       amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       currency,
//       name:"DevTinder",
//       description: "Connect to other Developers",
//       order_id:orderId, // This is the order_id created in the backend
//       callback_url: "http://localhost:3000/payment-success", // Your success URL
//       prefill: {
//         name: notes.firstName + " " + notes.lastName,
//         email: notes.emailId,
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#F37254",
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };


//   return (
//     <div className="flex w-full my-40">
//       <div className="card bg-base-300 rounded-box grid h-80  grow place-items-center">
//         <h1 className="font-bold">Silver Membership</h1>
//         <ul>
//           <li>-chat with others</li>
//           <li>-100 connections request per day</li>
//           <li>-blue tick</li>
//         </ul>
//         <button onClick={()=>handleBuyClick("silver")} className="btn btn-secondary">
//           Buy Silver
//         </button>
//       </div>
//       <div className="divider divider-horizontal">OR</div>
//       <div className="card bg-base-300 rounded-box h-80 grid grow place-items-center">
//         <h1 className="font-bold">Gold Membership</h1>
//         <ul>
//           <li>-chat with others</li>
//           <li>-100 connections request per day</li>
//           <li>-blue tick</li>
//           <li>- 6 months tick</li>
//         </ul>
//         <button onClick={()=>handleBuyClick("gold")} className="btn btn-primary">
//           Buy Gold
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Premium;









import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "DevTinder",
      description: "Connect to other Developers",
      order_id: orderId,
      callback_url: "http://localhost:3000/payment-success",
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex mt-24 flex-col md:flex-row justify-center items-center gap-10 px-4 py-16">
      {/* Silver Card */}
      <div className="card bg-base-300 rounded-xl shadow-lg w-full max-w-sm p-6 text-center">
        <h1 className="text-xl font-bold mb-4">Silver Membership</h1>
        <ul className="mb-4 text-sm space-y-1">
          <li>• Chat with others</li>
          <li>• 100 connection requests per day</li>
          <li>• Blue tick</li>
        </ul>
        <button
          onClick={() => handleBuyClick("silver")}
          className="btn btn-secondary w-full"
        >
          Buy Silver
        </button>
      </div>

      {/* OR Divider for large screens */}
      <div className="hidden md:block  text-xl font-bold">OR</div>

      {/* Gold Card */}
      <div className="card bg-base-300 rounded-xl shadow-lg w-full max-w-sm p-6 text-center">
        <h1 className="text-xl font-bold mb-4">Gold Membership</h1>
        <ul className="mb-4 text-sm space-y-1">
          <li>• Chat with others</li>
          <li>• 100 connection requests per day</li>
          <li>• Blue tick</li>
          <li>• 6 months premium badge</li>
        </ul>
        <button
          onClick={() => handleBuyClick("gold")}
          className="btn btn-primary w-full"
        >
          Buy Gold
        </button>
      </div>
    </div>
  );
};

export default Premium;
