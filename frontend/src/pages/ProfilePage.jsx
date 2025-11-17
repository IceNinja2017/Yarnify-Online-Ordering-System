// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    profileImage: "",
  });

  useEffect(() => {
    // fetch current user info
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => {
        const userData = res.data.user;
        setUser(userData);
        setFormData({
          username: userData.username,
          email: userData.email,
          street: userData.address?.street || "",
          city: userData.address?.city || "",
          state: userData.address?.state || "",
          postalCode: userData.address?.postalCode || "",
          country: userData.address?.country || "",
          profileImage: userData.profileImage?.url || "",
        });
      })
      .catch(() => toast.error("Failed to load user data"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
        formData,
        { withCredentials: true }
      );
      setUser(res.data.user);
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (!user) return <p className="p-6 text-[#916556]">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-[#fffbff]">
        <div className="w-full max-w-7xl mx-auto px-6 py-6">
            <h1 className="text-3xl font-bold text-[#BD8F80] mb-6">My Profile</h1>

            <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
                <img
                src={formData.profileImage || "https://placehold.co/150x150?text=?"}
                alt="Profile"
                className="w-40 h-40 rounded-full border border-[#d3ab9e] object-cover"
                />
                {editMode && (
                <input
                    type="text"
                    name="profileImage"
                    placeholder="Profile Image URL"
                    value={formData.profileImage}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-lg px-2 py-1"
                />
                )}
            </div>

            {/* Profile Info */}
            <form className="flex-1 w-full space-y-4" onSubmit={handleSubmit}>
                {[
                { label: "Username", name: "username" },
                { label: "Email", name: "email", type: "email" },
                { label: "Street", name: "street" },
                { label: "City", name: "city" },
                { label: "State", name: "state" },
                { label: "Postal Code", name: "postalCode" },
                { label: "Country", name: "country" },
                ].map((field) => (
                <div key={field.name}>
                    <label className="block text-[#916556] font-medium mb-1">{field.label}</label>
                    {editMode ? (
                    <input
                        type={field.type || "text"}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full border border-[#d3ab9e] rounded-lg px-2 py-1"
                    />
                    ) : (
                    <p className="text-[#BD8F80]">{formData[field.name]}</p>
                    )}
                </div>
                ))}

                <div className="flex gap-4 mt-4">
                {editMode ? (
                    <>
                    <button
                        type="submit"
                        className="bg-[#d3ab9e] text-white px-4 py-2 rounded-xl hover:bg-[#BD8F80] transition"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="bg-[#BD8F80] text-white px-4 py-2 rounded-xl hover:bg-[#d3ab9e] transition"
                    >
                        Cancel
                    </button>
                    </>
                ) : (
                    <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="bg-[#d3ab9e] text-white px-4 py-2 rounded-xl hover:bg-[#BD8F80] transition"
                    >
                    Edit Profile
                    </button>
                )}
                </div>
            </form>
            </div>
        </div>
    </div>

  );
};

export default ProfilePage;