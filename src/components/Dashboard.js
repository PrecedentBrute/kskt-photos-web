import React, { useEffect, useState } from "react";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [statistics, setStatistics] = useState({
    accuracy: 0.97,
    precision: 0.878,
    recall: 0.837,
    f1: 0.857,
    fpr: 0.014
  });

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const [version, setVersion] = useState("V1");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `localhost:6969/predict?version=${version.substring(1)}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        
      })
      .catch((error) => console.log(error));
  }, [version]);

  useEffect(() => {
    setTimeout(() => {
      if (version === "V1") {
        setStatistics({
          accuracy: 0.97,
          precision: 0.878,
          recall: 0.837,
          f1: 0.857,
          fpr: 0.014,
        });
      } else if (version === "V2") {
        setStatistics({
          accuracy: 0.978,
          precision: 0.925,
          recall: 0.86,
          f1: 0.892,
          fpr: 0.008,
        });
      }
    }, 1000);
    
  }, [version]);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
    <div>
      {/* <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card> */}
      <div
        className="mb-4 text-lg font-semibold cursor-pointer"
        onClick={() => history.push("/")}
      >
        Back to home
      </div>
    
      <Card>
        <Card.Body>
          <h4 className="text-center mb-4">Statistics</h4>
          <div className="text-lg flex justify-between px-4">
            <div className="font-semibold">Farms</div>
            <div className="font-semibold">2</div>
          </div>
          <div className="text-lg flex justify-between px-4">
            <div className="font-semibold">Crop-Potato</div>
            <div className="font-semibold">500kg</div>
          </div>
          <div className="text-lg flex justify-between px-4">
            <div className="font-semibold">Crop-Carrots</div>
            <div className="font-semibold">1000kg</div>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div></div></Container>
  );
}
