import React, { useState } from "react";
import styles from "./App.module.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [fanDuration, setFanDuration] = useState("");
  const [team, setTeam] = useState("");
  const [teamOptions, setTeamOptions] = useState<string[]>([]);

  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    setSubmittedData(data);
    console.log(data);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setIsRemember(false);
    setFanDuration("");
    setTeam("");
    setTeamOptions([]);
  };

  const teams = [
    { value: "", label: "Select a team" },
    { value: "redBull", label: "Red Bull" },
    { value: "ferrari", label: "Ferrari" },
    { value: "mercedes", label: "Mercedes" },
  ];

  const handleMainSelectChange = (e) => {
    const selectedTeam = e.target.value;
    setTeam(selectedTeam);

    switch (selectedTeam) {
      case "redBull":
        setTeamOptions(["Max Verstappen", "Sergio Pérez"]);
        break;
      case "ferrari":
        setTeamOptions(["Charles Leclerc", "Carlos Sainz Jr."]);
        break;
      case "mercedes":
        setTeamOptions(["Lewis Hamilton", "George Russell"]);
        break;
      default:
        setTeamOptions([]);
        break;
    }
  };

  return (
    <div className={styles.mainWindow}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <label>
          Fans Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Fans Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.rememberMe}>
          <input
            type="checkbox"
            name="isRemember"
            checked={isRemember}
            onChange={(e) => setIsRemember(e.target.checked)}
          />
          <span>Remember me</span>
        </label>

        <p>
          I am a fan during:
          <label>
            <input
              type="radio"
              name="fanDuration"
              value="less1"
              checked={fanDuration === "less1"}
              onChange={() => setFanDuration("less1")}
            />
            less than 1 year
          </label>
          <label>
            <input
              type="radio"
              name="fanDuration"
              value="less3"
              checked={fanDuration === "less3"}
              onChange={() => setFanDuration("less3")}
            />
            more than 1 and less than 3 years
          </label>
          <label>
            <input
              type="radio"
              name="fanDuration"
              value="more3"
              checked={fanDuration === "more3"}
              onChange={() => setFanDuration("more3")}
            />
            more than 3 years
          </label>
        </p>

        <p>
          Select Team:
          <select
            name="teamSelect"
            onChange={handleMainSelectChange}
            value={team}
          >
            {teams.map((team) => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </select>
        </p>

        {teamOptions.length > 0 && (
          <p>
            Select Driver:
            <select name="driverSelect">
              {teamOptions.map((driver, index) => (
                <option key={index} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </p>
        )}

        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
        {submittedData && (
          <div>
            <h2>Submitted Data:</h2>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
