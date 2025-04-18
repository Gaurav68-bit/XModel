
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', dob: '', phone: '' });
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const handleSubmit = () => {
    const newErrors = {};
    const { username, email, dob, phone } = formData;

    if (!username) newErrors.username = 'Please fill out the Username field';
    if (!email) newErrors.email = 'Please fill out the Email field';
    else if (!email.includes('@')) alert('Invalid email. Please check your email address.');

    if (!dob) newErrors.dob = 'Please fill out the Date of Birth field';
    else if (new Date(dob) > new Date()) alert('Invalid date of birth, date of birth cannot be in future');

    if (!phone) newErrors.phone = 'Please fill out the Phone field';
    else if (!/^[0-9]{10}$/.test(phone)) alert('Invalid phone number. Please enter a 10-digit phone number.');

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && email.includes('@') && /^[0-9]{10}$/.test(phone) && new Date(dob) <= new Date()) {
      alert('Form submitted successfully!');
      setIsModalOpen(false);
      setFormData({ username: '', email: '', dob: '', phone: '' });
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

//   return (
//     <div className="modal">
//       <div className="modal-content">
//     <div className="main-container">
//       <h1 className="heading">User Details Modal</h1>
//       {!isModalOpen && (
//         <button
//           className="open-btn"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Open Form
//         </button>
//       )}

//       {isModalOpen && (
//         <div className="modal-content fixed bg-white p-6 rounded-lg shadow-lg z-10" ref={modalRef}>
//           <div className="flex flex-col gap-4">
//           {/* <label for="validationDefault01" class="form-label">First name</label>
//           <input type="text" class="form-control" id="validationDefault01" value="Mark" required> */}
//           <label for="validationDefault01" className="form-label">
//               Username:
//               <input
//                 id="username"
//                 type="text"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 className="border border-gray-400 p-2 rounded w-full"
//               />
//               {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
//             </label>

//             <label>
//               Email:
//               <input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="border border-gray-400 p-2 rounded w-full"
//               />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//             </label>

//             <label>
//               Phone Number:
//               <input
//                 id="phone"
//                 type="text"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 className="border border-gray-400 p-2 rounded w-full"
//               />
//               {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//             </label>

//             <label>
//               Date of Birth:
//               <input
//                 id="dob"
//                 type="date"
//                 value={formData.dob}
//                 onChange={handleInputChange}
//                 className="border border-gray-400 p-2 rounded w-full"
//               />
//               {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
//             </label>

            

//             <button className="submit-button " onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//     </div>
//   );
// }

return (
  <div className="main-container">
    <h1 className="heading">User Details Modal</h1>

    {!isModalOpen && (
      <button className="open-btn" onClick={() => setIsModalOpen(true)}>
        Open Form
      </button>
    )}

    {isModalOpen && (
      <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="modal-content bg-white p-6 rounded-lg shadow-lg" ref={modalRef}>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
  <label className="form-label">
    Username:
    <input
      id="username"
      type="text"
      value={formData.username}
      onChange={handleInputChange}
      className="border border-gray-400 p-2 rounded w-full"
    />
    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
  </label>

  <label>
    Email:
    <input
      id="email"
      type="email"
      value={formData.email}
      onChange={handleInputChange}
      className="border border-gray-400 p-2 rounded w-full"
    />
    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
  </label>

  <label>
    Phone Number:
    <input
      id="phone"
      type="text"
      value={formData.phone}
      onChange={handleInputChange}
      className="border border-gray-400 p-2 rounded w-full"
    />
    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
  </label>

  <label>
    Date of Birth:
    <input
      id="dob"
      type="date"
      value={formData.dob}
      onChange={handleInputChange}
      className="border border-gray-400 p-2 rounded w-full"
    />
    {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
  </label>

  <button type="submit" className="submit-button bg-blue-500 text-white p-2 rounded">
    Submit
  </button>
</form>

        </div>
      </div>
    )}
  </div>
)}