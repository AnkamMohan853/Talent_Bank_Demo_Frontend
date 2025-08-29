import React, { useEffect, useState } from "react";
import axios from "axios";

const Vendor_user = () => {
  const [vendors, setVendors] = useState([
    {
      id: 0,
      full_name: "Mohan",
      mobile_number: "9392294341",
      email: "mohan@example.com",
      city: "Hyderabad",
      district: "Hyderabad",
      state: "Telangana",
      country: "India",
      specialization: "Photography",
      availability: "Full Time",
      is_online: false,
    },
  ]);

  /*useEffect(() => {
    axios
      .get("http://localhost:5000/api/vendors")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setVendors(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);*/

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Vendors</h1>
      {vendors.map((vendor) => (
        <div
          key={vendor.id}
          className="p-4 mb-4 border rounded shadow-sm bg-gray-100"
        >
          <h2 className="text-lg font-semibold">{vendor.full_name}</h2>
          <p>📞 {vendor.mobile_number}</p>
          <p>📧 {vendor.email}</p>
          <p>
            🏙️ {vendor.city}, {vendor.state}, {vendor.country}
          </p>
          <p>🎯 {vendor.specialization}</p>
          <p>💼 {vendor.availability}</p>
          <p className={vendor.is_online ? "text-green-600" : "text-red-600"}>
            {vendor.is_online ? "🟢 Online" : "🔴 Offline"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Vendor_user;
