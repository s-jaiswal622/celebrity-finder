import React, { useState, useEffect } from "react";
import "./Styles.css";
import Data from "./Data";
import DeleteModal from "./DeleteModal";

const GENDEROPTIONS = [
  "Male",
  "Female",
  "Transgender",
  "Rather not say",
  "Other",
];

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeletePopUp, setOpenDeletePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isEditClick, setIsEditClick] = useState(false);
  const [isDetailsChanged, setIsDetailsChanged] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setUsers(Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const handleEditClick = (id) => {
    const selectedCeleb = users.find((item) => item.id === id);
    const isAdult = calculateAge(selectedCeleb.dob) >= 18;

    if (selectedUser.id === id && isAdult) {
      setIsEditClick(true);
    } else {
      setIsEditClick(false);
      if (!isAdult) {
        alert("You can only edit adult users.");
      }
    }
  };

  const toggleAccordion = (id) => {
    setSelectedUser((prevSelectedUser) => {
      const selectedCeleb = users.find((item) => item.id === id);
      const newSelectedUser = {
        ...selectedCeleb,
        age: calculateAge(selectedCeleb.dob),
      };
      if (prevSelectedUser.id === id) {
        return {};
      }
      return newSelectedUser;
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteUser = () => {
    const updatedUser = users.filter((item) => item.id !== selectedUser.id);
    setUsers(updatedUser);
  };

  const handleConfirmEdit = () => {
    setUsers((prevUsers) =>
      prevUsers.map((item) =>
        item.id === selectedUser.id
          ? { ...item, age: selectedUser.age, ...selectedUser }
          : item
      )
    );
    setIsEditClick(false);
  };

  const handleCancelEdit = () => {
    const details = users.find((item) => item.id === selectedUser.id);
    setSelectedUser({ ...details, age: calculateAge(details.dob) });
    setIsDetailsChanged(false);
  };

  const handleInputChange = (field, value) => {
    if (field === "age" && value === null) {
      setIsDetailsChanged(false);
    }
    if (field === "country") {
      const validCountryInput = /^[a-zA-Z\s\-,.'()]*$/;
      if (!validCountryInput.test(value)) {
        return;
      }
    }
    setSelectedUser((prevSelectedUser) => ({
      ...prevSelectedUser,
      [field]: value,
    }));
    setIsDetailsChanged(true);
  };

  const filteredUsers = users.filter((user) =>
    `${user.first} ${user.last}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const isEdited =
    isDetailsChanged &&
    selectedUser.age !== null &&
    selectedUser.country &&
    selectedUser.description;
  return (
    <div className="App">
      <div className="container">
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search user"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div id="userList">
          {filteredUsers.length ? (
            filteredUsers.map((user) => (
              <div key={user.id} className={`accordion`}>
                <div className="div-container">
                  <div className="user-div">
                    <img
                      src={user.picture}
                      alt={`${user.first} ${user.last}`}
                      width="100"
                      height="100"
                    />
                    <div className="user-name">
                      {" "}
                      {user.first} {user.last}
                    </div>
                  </div>

                  <div
                    onClick={() => toggleAccordion(user.id)}
                    className="accordion-div"
                  >
                    {user.id === selectedUser.id ? "-" : "+"}
                  </div>
                </div>

                {user.id === selectedUser.id && (
                  <div className="panel" key={user.id}>
                    <div className="panel-upper-details">
                      <div>
                        <label>Age</label>
                        {isEditClick ? (
                          <input
                            className="input-div"
                            type="number"
                            value={selectedUser.age}
                            onChange={(e) =>
                              handleInputChange(
                                "age",
                                e.target.value ? parseInt(e.target.value) : null
                              )
                            }
                          />
                        ) : (
                          <div className="details-div">
                            {user.age || calculateAge(user.dob)}
                          </div>
                        )}
                      </div>

                      <div>
                        <label>Gender</label>
                        {isEditClick ? (
                          <select
                            className="input-div"
                            value={selectedUser.gender}
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                          >
                            {GENDEROPTIONS.map((gender) => (
                              <option>{gender}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="details-div">{user.gender}</div>
                        )}
                      </div>

                      <div>
                        <label>Country</label>
                        {isEditClick ? (
                          <input
                            className="input-div"
                            type="text"
                            value={selectedUser.country}
                            onChange={(e) =>
                              handleInputChange("country", e.target.value)
                            }
                          />
                        ) : (
                          <div className="details-div">{user.country}</div>
                        )}
                      </div>
                    </div>

                    <div className="description-div">
                      <label>Description</label>
                      {isEditClick ? (
                        <textarea
                          className="input-div"
                          value={selectedUser.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                        />
                      ) : (
                        <div className="details-div">{user.description}</div>
                      )}
                    </div>
                    {isEditClick ? (
                      <div className="edit-div-container">
                        <button
                          className="delete-div"
                          onClick={handleCancelEdit}
                        >
                          Cancel Edit
                        </button>
                        <button
                          className={`edit-div ${
                            isEdited ? "active" : "inactive"
                          }`}
                          onClick={handleConfirmEdit}
                          disabled={!isEdited}
                        >
                          Confirm Edit
                        </button>
                      </div>
                    ) : (
                      <div className="edit-div-container">
                        <button
                          className="delete-div"
                          onClick={() => setOpenDeletePopup(true)}
                        >
                          Delete
                        </button>
                        {calculateAge(user.dob) >= 18 ? (
                          <button
                            className="edit-div active"
                            onClick={() => handleEditClick(user.id)}
                          >
                            Edit
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-result-div">
              Sorry searched result not found
            </div>
          )}
          {openDeletePopUp && (
            <DeleteModal
              onClose={() => setOpenDeletePopup(false)}
              onDelete={handleDeleteUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
