"use client";

import { useState } from "react";

export default function SpecialistLogin() {
  const [phone, setPhone] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    alert("Mock OTP: " + data.otp);
    setOtpRequested(true);
  };

  const verify = async () => {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, otp }),
    });

    const data = await res.json();
    if (data.success) window.location.href = "/specialist/dashboard";
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="bg-white/60 backdrop-blur-xl shadow-xl w-full max-w-md p-8 rounded-2xl">

        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Specialist Login
        </h2>

        <input
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {otpRequested && (
          <input
            placeholder="Enter OTP"
            className="w-full border p-3 rounded-lg mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        {!otpRequested ? (
          <button
            onClick={sendOtp}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-2"
          >
            Send OTP
          </button>
        ) : (
          <button
            onClick={verify}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-2"
          >
            Verify & Login
          </button>
        )}
      </div>
    </div>
  );
}
