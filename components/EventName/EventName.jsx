"use client";
import React, { useState } from "react";

const EventName = () => {
  const [userId, setUserId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState();

  const handleSubmit = async () => {
    try {
      // Fetch user data
      const userResponse = await fetch(
        `https://bonusnumber1.com/api/user/read_one.php?id=${userId}`
      );
      const userData = await userResponse.json();
      setUser(userResponse);

      if (!userData.customer) {
        alert("User data does not contain customer information.");
        return;
      }

      const customerId = userData.customer;

      // Send data to PHP script
      const response = await fetch("https://bonusnumber1.com/api/sent_email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          customerId,
          subject,
          body,
        }),
      });

      if (response.ok) {
        alert("Data sent successfully");
      } else {
        alert("Failed to send data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the request.");
    }
  };

  return (
    <div className="brands flex flex-col overflow-y-scroll relative">
      <div className="brand flex mb-3 filters mt-5">
        <input
          type="text"
          placeholder="USER ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="py-2 px-3 w-64"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="py-2 px-3 w-64"
        />
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="py-2 px-3 w-64"
        />
        <button onClick={handleSubmit} className="btn btn-search">
          Submit
        </button>
      </div>
    </div>
  );
};

export default EventName;
