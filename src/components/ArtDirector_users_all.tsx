import React from "react";
import { useNavigate } from "react-router-dom";

const ArtDirector_users_all = () => {
  const navigate = useNavigate();

  const directors = [
    { id: 1, full_name: "Suresh Kumar", mobile_number: "9876543210", email: "suresh@example.com", city: "Hyderabad", state: "Telangana" },
    { id: 2, full_name: "Anjali Sharma", mobile_number: "9876543211", email: "anjali@example.com", city: "Hyderabad", state: "Telangana" },
    { id: 3, full_name: "Ramesh Rao", mobile_number: "9876543212", email: "ramesh@example.com", city: "Hyderabad", state: "Telangana" },
  ];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">All Art Directors</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {directors.map((director) => (
          <div
            key={director.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate("/ArtDirector_To_vendor")}
          >
            <p><span className="font-semibold">ID:</span> {director.id}</p>
            <p><span className="font-semibold">Full Name:</span> {director.full_name}</p>
            <p><span className="font-semibold">Mobile:</span> {director.mobile_number}</p>
            <p><span className="font-semibold">Email:</span> {director.email}</p>
            <p><span className="font-semibold">City:</span> {director.city}</p>
            <p><span className="font-semibold">State:</span> {director.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtDirector_users_all;
