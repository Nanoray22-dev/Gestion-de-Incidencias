import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Loader.css";
const EditUserForm = ({ userId, closeModal, onUserUpdated }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) {
          return;
        }
        const response = await axios.get(`https://backoasis-production.up.railway.app/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]); // userId como dependencia para que se vuelva a cargar cuando cambie

  const notifySuccess = () => toast.success("User data updated successfully");
  const notifyError = () => toast.error("Error updating user data");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`https://backoasis-production.up.railway.app/users/${userId}`, user);
      setUser(response.data);
      notifySuccess();
      onUserUpdated(response.data);
      closeModal();
    } catch (error) {
      console.error("Error updating user:", error);
      notifyError();
    }
  };

  if (!user) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="max-w-xl mx-auto bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6">
          <div className="">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username || ""}
              onChange={(event) =>
                setUser({ ...user, username: event.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md form-control"
            />
          </div>
          <div className="">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email || ""}
              onChange={(event) =>
                setUser({ ...user, email: event.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md form-control"
            />
          </div>
          <div className="mt-12">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address || ""}
              onChange={(event) =>
                setUser({ ...user, address: event.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md form-control"
            />
          </div>
          <div className="mt-12">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone || ""}
              onChange={(event) =>
                setUser({ ...user, phone: event.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md form-control"
            />
          </div>
          <div className="mt-12">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={user.age || ""}
              onChange={(event) =>
                setUser({ ...user, age: event.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md form-control"
            />
          </div>
          <div className="mt-12">
            <label
              htmlFor="residenceType"
              className="block text-sm font-medium text-gray-700"
            >
              Residence Type:
            </label>
            <select
              id="residenceType"
              name="residenceType"
              value={user.residenceType || ""}
              onChange={(event) =>
                setUser({ ...user, residenceType: event.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md form-control"
            >
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="duplex">Duplex</option>
              <option value="no residente">No Residente</option>
            </select>
          </div>
          <div className="mt-12">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role:
            </label>
            <select
              id="role"
              name="role"
              value={user.role || ""}
              onChange={(event) =>
                setUser({ ...user, role: event.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md form-control"
            >
              <option value="admin">Admin</option>
              <option value="usuario">Usuario</option>{" "}
            </select>
          </div>

          <button
            type="submit"
            className="col-span-2 mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUserForm;
