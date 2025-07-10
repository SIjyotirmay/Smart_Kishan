import Footer from "../../inc/Footer";
import Sidebar from "../../inc/Sidebar";
import Top from "../../inc/Top";
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await fetch("http://localhost:2000/user/stats");
        const data = await res.json();
        setTotalUsers(data.total);
        setActiveUsers(data.active);
        setInactiveUsers(data.inactive);
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="flex-column">
          <div id="content">
            <Top />
            <div className="dashboard-container">
              <h1 className="dashboard-heading">Dashboard</h1>

              <div className="row">
                <div className="col">
                  <div className="card border-primary">
                    <div className="card-body">
                      <h5 className="card-title">Total Users</h5>
                      <p className="card-text count">{totalUsers}</p>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card border-success">
                    <div className="card-body">
                      <h5 className="card-title">Active Users</h5>
                      <p className="card-text count">{activeUsers}</p>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card border-danger">
                    <div className="card-body">
                      <h5 className="card-title">Inactive Users</h5>
                      <p className="card-text count">{inactiveUsers}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
