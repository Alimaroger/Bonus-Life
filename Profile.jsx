import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../firebase/firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
import "./Profile.css";

export default function Profile() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState("Free");
  const [joinDate, setJoinDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSubscription(data.subscription || "Free");
        setJoinDate(data.joinDate || "Not available");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h1>👤 Your Profile</h1>
      <div className="profile-card">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Subscription:</strong> {subscription}</p>
        <p><strong>Joined:</strong> {joinDate}</p>
        <button className="edit-button">Update Info (soon)</button>
      </div>
    </div>
  );
}
