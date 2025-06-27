import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { db } from "../firebase/firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
import Navigation from "../components/Navigation.jsx";


export default function Profile() {
  const { currentUser } = useAuth();
  const [subscription, setSubscription] = useState("Free");
  const [joinDate, setJoinDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSubscription(data.subscription || "Free");
        setJoinDate(data.joinDate || "Not available");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <>
      <Navigation />
      <div className="profile-container">
        <h1>👤 Your Profile</h1>
        <div className="profile-card">
          <p><strong>Email:</strong> {currentUser?.email}</p>
          <p><strong>Subscription:</strong> {subscription}</p>
          <p><strong>Joined:</strong> {joinDate}</p>
          <button className="edit-button">Update Info (soon)</button>
        </div>
      </div>
    </>
  );
}
