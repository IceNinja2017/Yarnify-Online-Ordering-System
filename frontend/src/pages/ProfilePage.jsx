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
    axios
      .get(`${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/me`, { withCredentials: true })
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
      const res = await axios.patch(
        `${import.meta.env.VITE_AUTH_SERVICE_URL}/api/auth/update-profile`,
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
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#BD8F80] mb-6">My Profile</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0 w-full md:w-40 flex flex-col items-center md:items-start">
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
          <div className="flex-1 w-full space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* BASIC INFO */}
              <div>
                <h2 className="text-xl font-bold text-[#BD8F80] mb-3">Basic Information</h2>

                <div className="mb-4">
                  <label className="block text-[#916556] font-medium mb-1">Username</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full border border-[#d3ab9e] rounded-lg px-2 py-1"
                    />
                  ) : (
                    <p className="text-[#BD8F80]">{formData.username}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-[#916556] font-medium mb-1">Email</label>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-[#d3ab9e] rounded-lg px-2 py-1"
                    />
                  ) : (
                    <p className="text-[#BD8F80]">{formData.email}</p>
                  )}
                </div>
              </div>

              {/* ADDRESS SECTION */}
              <div>
                <h2 className="text-xl font-bold text-[#BD8F80] mb-3">Address</h2>

                <div className="mb-4">
                  <label className="block text-[#916556] font-medium mb-1">Street</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className="w-full border border-[#d3ab9e] rounded-lg px-2 py-1"
                    />
                  ) : (
                    <p className="text-[#BD8F80]">{formData.street}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#916556] font-medium mb-1">City</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-[#d3ab9e] rounded-lg px-2 py-1"
                      />
                    ) : (
                      <p className="text-[#BD8F80]">{formData.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#916556] font-medium mb-1">State</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full border border-[#d3ab9e] rounded-lg px-2 py-1"
                      />
                    ) : (
                      <p className="text-[#BD8F80]">{formData.state}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[#916556] font-medium mb-1">Postal Code</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full border border-[#d3ab9e] rounded-lg px-2 py-1"
                      />
                    ) : (
                      <p className="text-[#BD8F80]">{formData.postalCode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[#916556] font-medium mb-1">Country</label>
                    {editMode ? (
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border border-[#d3ab9e] rounded-lg px-2 py-1"
                      />
                    ) : (
                      <p className="text-[#BD8F80]">{formData.country}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              {editMode && (
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
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
                </div>
              )}

              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="mt-4 sm:mt-0 bg-[#d3ab9e] text-white px-4 py-2 rounded-xl hover:bg-[#BD8F80] transition"
                >
                  Edit Profile
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;