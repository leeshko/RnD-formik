import React, { useState } from "react";
import styles from "./App.module.css";
import { SubmitHandler, useForm } from "react-hook-form";

const App: React.FC<{}> = () => {
  type Inputs = {
    name: string;
    email: string;
    isRemember: boolean;
    fanDuration: string;
    team: string;
    teamOptions: string[];
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setSubmittedData(data);
  };

  const [submittedData, setSubmittedData] = useState<any>(null);

  const teams = [
    { value: "", label: "Select a team" },
    { value: "redBull", label: "Red Bull" },
    { value: "ferrari", label: "Ferrari" },
    { value: "mercedes", label: "Mercedes" },
  ];

  const driversOption = {
    redBull: ["Max Verstappen", "Sergio Pérez"],
    ferrari: ["Charles Leclerc", "Carlos Sainz Jr."],
    mercedes: ["Lewis Hamilton", "George Russell"],
  };

  return (
    <div className={styles.mainWindow}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Fans Name:
          <input type="text" {...register("name", { required: true })} />
          {errors.name && (
            <span className={styles.error}>This field is required</span>
          )}
        </label>
        <label>
          Fans Email:
          <input type="email" {...register("email")} />
        </label>
        <label className={styles.rememberMe}>
          <input type="checkbox" {...register("isRemember")} />
          <span>Remember me</span>
        </label>

        <p>
          I am a fan during:
          <label>
            <input
              type="radio"
              value="less1"
              checked={watch("fanDuration") === "less1"}
              {...register("fanDuration")}
            />
            less than 1 year
          </label>
          <label>
            <input
              type="radio"
              value="less3"
              checked={watch("fanDuration") === "less3"}
              {...register("fanDuration")}
            />
            more than 1 and less than 3 years
          </label>
          <label>
            <input
              type="radio"
              value="more3"
              checked={watch("fanDuration") === "more3"}
              {...register("fanDuration")}
            />
            more than 3 years
          </label>
        </p>

        <p>
          Select Team:
          <select {...register("team")}>
            {teams.map((team) => (
              <option key={team.value} value={team.value}>
                {team.label}
              </option>
            ))}
          </select>
        </p>

        {driversOption[watch("team")]?.length > 0 && (
          <p>
            Select Driver:
            <select {...register("teamOptions")}>
              {driversOption[watch("team")]?.map((driver, index) => (
                <option key={index} value={driver}>
                  {driver}
                </option>
              ))}
            </select>
          </p>
        )}

        <button type="submit">Submit</button>
        <button type="reset" onClick={() => reset()}>
          Reset
        </button>
        {submittedData && (
          <div>
            <h2>Submitted Data:</h2>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
