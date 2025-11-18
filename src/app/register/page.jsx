// "use client";

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser, setLoading, setError } from "@/redux/feature/userSlice";
// import { Toaster, toast } from "sonner";

// export default function Page() {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.user);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     bio: "",
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [profileImageFile, setProfileImageFile] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//       setProfileImageFile(file);
//     }
//   };

// //  const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   dispatch(setLoading());

// //   try {
// //     const form = new FormData();
// //     form.append("name", formData.name);
// //     form.append("email", formData.email);
// //     form.append("password", formData.password);
// //     form.append("bio", formData.bio);
// //     if (profileImageFile) form.append("profile_image", profileImageFile);

// //     const response = await fetch("/api/users", {
// //       method: "POST",
// //       body: form,
// //     });

// //     const data = await response.json();
// //     console.log('token',data.token)

// //     if (!response.ok) {
// //       const message = data.message || data.error || "Registration failed";
// //       dispatch(setError(message));
// //       toast.error(message);
// //       return;
// //     }

// //     // ✅ Store full user data with ID
// //     dispatch(
// //       setUser({
// //         user_id: data.user?.user_id,
// //         name: data.user?.username || formData.name,
// //         email: data.user?.email || formData.email,
// //         password: formData.password,
// //         bio: data.user?.bio || formData.bio,
// //         profile_images: data.user?.profile_images || profileImage,
// //       })
// //     );

// //     toast.success("User registered successfully!");
// //   } catch (err) {
// //     dispatch(setError(err.message));
// //     toast.error(err.message);
// //   }
// // };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   dispatch(setLoading());

//   try {
//     let base64Image = null;

//     //  Convert image file to Base64 if selected
//     if (profileImageFile) {
//       const reader = new FileReader();
//       reader.readAsDataURL(profileImageFile);
//       base64Image = await new Promise((resolve) => {
//         reader.onloadend = () => resolve(reader.result);
//       });
//     }

//     //  Send JSON data to backend (not FormData)
//     const response = await fetch("/api/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         bio: formData.bio,
//         profile_images: base64Image, // base64 string
//       }),
//     });

//     const data = await response.json();
//     console.log("Token:", data.token);

//     if (!response.ok) {
//       const message = data.message || data.error || "Registration failed";
//       dispatch(setError(message));
//       toast.error(message);
//       return;
//     }

//     //  Store user in Redux
//     dispatch(
//       setUser({
//         user_id: data.user?.user_id,
//         name: data.user?.username || formData.name,
//         email: data.user?.email || formData.email,
//         bio: data.user?.bio || formData.bio,
//         profile_images: data.user?.profile_images || profileImage,
//       })
//     );

//     toast.success("User registered successfully!");
//   } catch (err) {
//     dispatch(setError(err.message));
//     toast.error(err.message);
//   }
// };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 font-sans min-h-screen flex items-center justify-center p-4">
//       <Toaster position="top-right" richColors />
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
//           Create Account
//         </h2>
//         <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
//           Join InnovateU and start learning today.
//         </p>

//         {/* Profile Image */}
//         <div className="flex flex-col items-center mb-6">
//           <div className="relative">
//             <img
//               src={
//                 profileImage ||
//                 "https://cdn-icons-png.flaticon.com/512/847/847969.png"
//               }
//               alt="Profile Preview"
//               className="w-24 h-24 rounded-full border-4 border-primary shadow-md object-cover"
//             />
//             <label
//               htmlFor="profileImage"
//               className="absolute bottom-0 right-0 bg-primary text-white text-xs p-1.5 rounded-full cursor-pointer hover:bg-primary/90 transition"
//             >
//               <span className="material-symbols-outlined text-base">edit</span>
//             </label>
//             <input
//               id="profileImage"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//             Upload Profile Picture
//           </p>
//         </div>

//         {/* Form */}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             name="name"
//             type="text"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className={`w-full px-4 py-3 rounded-lg border ${
//               error?.toLowerCase().includes("email") ? "border-red-500" : "border-gray-300"
//             } dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition`}
//           />
//           {/* {error?.toLowerCase().includes("email") && (
//             <p className="text-red-500 text-sm">⚠️ {error}</p>
//           )} */}

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
//           />
//           <textarea
//             name="bio"
//             rows="3"
//             placeholder="Tell us about yourself..."
//             value={formData.bio}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
//           ></textarea>

//           <button
//             type="submit"
//             className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
//             disabled={status === "loading"}
//           >
//             {status === "loading" ? "Registering..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// "use client";

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser, setLoading, setError } from "@/redux/feature/userSlice";
// import { Toaster, toast } from "sonner";

// export default function Page() {
//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.user);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     bio: "",
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [profileImageFile, setProfileImageFile] = useState(null);

//   // =======================
//   // Handle Input Changes
//   // =======================
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // =======================
//   // Handle Image Upload
//   // =======================
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//       setProfileImageFile(file);
//     }
//   };

//   // =======================
//   // Handle Form Submit
//   // =======================
//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   dispatch(setLoading());

//   try {
//     let base64Image = null;

//     if (profileImageFile) {
//       base64Image = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(profileImageFile);
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//       });
//     }

//     const response = await fetch("/api/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         bio: formData.bio,
//         profile_images: base64Image,
//       }),
//     });

//     const data = await response.json();
//     console.log("Token:", data.token);

//     if (!response.ok) {
//       const message = data.message || data.error || "Registration failed";
//       dispatch(setError(message));
//       toast.error(message);
//       return;
//     }
//     // hello New code

//     //  Save token to localStorage
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//     }

//     // Store user data in Redux                                        
    
    
    
//     dispatch(
//       setUser({
//         user_id: data.user?.user_id,
//         name: data.user?.username || formData.name,
//         email: data.user?.email || formData.email,
//         bio: data.user?.bio || formData.bio,
//         profile_images: data.user?.profile_images || base64Image,
//       })
//     );

//     toast.success("User registered successfully!");
//   } catch (err) {
//     dispatch(setError(err.message));
//     toast.error(err.message);
//   }
// };








//   // =======================
//   // Render UI
//   // =======================
//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 font-sans min-h-screen flex items-center justify-center p-4">
//       <Toaster position="top-right" richColors />
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
//           Create Account
//         </h2>
//         <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
//           Join InnovateU and start learning today.
//         </p>

//         {/* Profile Image */}
//         <div className="flex flex-col items-center mb-6">
//           <div className="relative">
//             <img
//               src={
//                 profileImage ||
//                 "https://cdn-icons-png.flaticon.com/512/847/847969.png"
//               }
//               alt="Profile Preview"
//               className="w-24 h-24 rounded-full border-4 border-primary shadow-md object-cover"
//             />
//             <label
//               htmlFor="profileImage"
//               className="absolute bottom-0 right-0 bg-primary text-white text-xs p-1.5 rounded-full cursor-pointer hover:bg-primary/90 transition"
//             >
//               <span className="material-symbols-outlined text-base">edit</span>
//             </label>
//             <input
//               id="profileImage"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />
//           </div>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//             Upload Profile Picture
//           </p>
//         </div>

//         {/* Form */}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             name="name"
//             type="text"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
//           />
//           <input
//             name="email"
//             type="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className={`w-full px-4 py-3 rounded-lg border ${
//               error?.toLowerCase?.().includes("email")
//                 ? "border-red-500"
//                 : "border-gray-300"
//             } dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition`}
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
//           />
//           {/* <textarea
//             name="bio"
//             rows="3"
//             placeholder="Tell us about yourself..."
//             value={formData.bio}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
//           ></textarea> */}

//           <button
//             type="submit"
//             className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
//             disabled={status === "loading"}
//           >
//             {status === "loading" ? "Registering..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading, setError } from "@/redux/feature/userSlice";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";   // ✅ Import router

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ Initialize router
  const { status, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  // =======================
  // Handle Input Changes
  // =======================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =======================
  // Handle Image Upload
  // =======================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  // =======================
  // Handle Form Submit
  // =======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      let base64Image = null;

      if (profileImageFile) {
        base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(profileImageFile);
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
        });
      }

      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          bio: formData.bio,
          profile_images: base64Image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.message || data.error || "Registration failed";
        dispatch(setError(message));
        toast.error(message);
        return;
      }

      //  Save token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      //  Save user data to Redux
      dispatch(
        setUser({
          user_id: data.user?.user_id,
          name: data.user?.username || formData.name,
          email: data.user?.email || formData.email,
          bio: data.user?.bio || formData.bio,
          profile_images: data.user?.profile_images || base64Image,
        })
      );

      toast.success("User registered successfully!");

      //  REDIRECT TO HOME PAGE AFTER SUCCESS
      setTimeout(() => {
        router.push("/"); // Change "/home" to your actual home page route
      }, 1000); // Little delay for smooth UX

    } catch (err) {
      dispatch(setError(err.message));
      toast.error(err.message);
    }
  };

  // =======================
  // Render UI
  // =======================
  return (
    <div className="bg-gray-100 dark:bg-gray-900 font-sans min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-right" richColors />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Create Account
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Join InnovateU and start learning today.
        </p>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={
                profileImage ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border-4 border-primary shadow-md object-cover"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-primary text-white text-xs p-1.5 rounded-full cursor-pointer hover:bg-primary/90 transition"
            >
              <span className="material-symbols-outlined text-base">edit</span>
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Upload Profile Picture
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg border ${
              error?.toLowerCase?.().includes("email")
                ? "border-red-500"
                : "border-gray-300"
            } dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition`}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
