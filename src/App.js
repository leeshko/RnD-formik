import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import styles from "./App.module.css";

function App() {

  const teams = [
    { value: "", label: "Select a team" },
    { value: "redBull", label: "Red Bull" },
    { value: "ferrari", label: "Ferrari" },
    { value: "mercedes", label: "Mercedes" },
  ];

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const getDriversList = (team) => {
    switch (team) {
      case "redBull":
        return ["Max Verstappen", "Sergio Pérez"];

      case "ferrari":
        return ["Charles Leclerc", "Carlos Sainz Jr."];
      case "mercedes":
        return ["Lewis Hamilton", "George Russell"];
      default:
        return [];
    }
  };

  return (
    <div className={styles.mainWindow}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          isRemember: false,
          fanDuration: "",
          team: "",
          selectedDriver: "",
        }}
        validate={validate}
        onSubmit={(values) => console.log(values)}
      >
        {(formik) => (
          <Form
            className={styles.form}
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
          >
            <label htmlFor="name">Fans Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage
              className={styles.error}
              name="name"
              component={"div"}
            />

            <label htmlFor="email">Fans Email: </label>
            <Field type="email" name="email" />
            <ErrorMessage
              className={styles.error}
              name="email"
              component={"div"}
            />

            <label className={styles.rememberMe} htmlFor="isRemember">
              {" "}
            </label>
            <Field type="checkbox" name="isRemember" />
            <span>Remember me</span>

            <p>
              I am a fan during:
              <label>
                <Field
                  type="radio"
                  name="fanDuration"
                  value="less1"
                  checked={formik.values.fanDuration === "less1"}
                />
                less than 1 year
              </label>
              <label>
                <Field
                  type="radio"
                  name="fanDuration"
                  value="less3"
                  checked={formik.values.fanDuration === "less3"}
                />
                more than 1 and less than 3 years
              </label>
              <label>
                <Field
                  type="radio"
                  name="fanDuration"
                  value="more3"
                  checked={formik.values.fanDuration === "more3"}
                />
                more than 3 years
              </label>
            </p>

            <p>
              Select Team:
              <Field name="team" as="select">
                {teams.map((team) => (
                  <option key={team.value} value={team.value}>
                    {team.label}
                  </option>
                ))}
              </Field>
            </p>
            {formik.values.team.length > 0 && (
              <p>
                Select Driver:
                <Field name="selectedDriver" as="select">
                  {getDriversList(formik.values.team).map((driver, index) => (
                    <option key={index} value={driver}>
                      {driver}
                    </option>
                  ))}
                </Field>
              </p>
            )}

            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
            {
              <div>
                <h2>Submitted Data:</h2>
                <pre>{JSON.stringify(formik.values, null, 2)}</pre>
              </div>
            }
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
