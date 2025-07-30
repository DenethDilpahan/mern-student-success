import React from "react";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <p>Only admins can see this page.</p>
      {/* You can add admin-specific features here */}
    </div>
  );
}
