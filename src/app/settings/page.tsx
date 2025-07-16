"use client";
import React from "react";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Select from "../components/atoms/Select";

const Settings = () => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 mt-8 border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-4">
        <Input label="Username" value="dummyuser" disabled />
        <Input label="Email" type="email" value="dummy@email.com" disabled />
        <Select label="Notifications" value="enabled" disabled>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </Select>
        <Button className="mt-4 w-full cursor-not-allowed" disabled>Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings; 