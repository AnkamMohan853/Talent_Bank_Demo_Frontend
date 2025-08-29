import React from "react";
import Vendor_user from "./Vendor_user"; // import the Vendor_user component

const ArtDirector_To_Vendor = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Art Director Vendor Page</h1>
      <p>Navigation works! You reached this page by clicking a card.</p>

      {/* Include Vendor_user component */}
      <Vendor_user />
      <Vendor_user />
      <Vendor_user />
      <Vendor_user />
      <Vendor_user />
      <Vendor_user />
      <Vendor_user />
    </div>
  );
};

export default ArtDirector_To_Vendor;
