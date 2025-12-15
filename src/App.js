import React, { useState, useEffect } from "react";

function App() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "", examDate: "", hoursPerDay: "" },
  ]);
  const [timetable, setTimetable] = useState([]);
  const [showTimetable, setShowTimetable] = useState(false);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { id: subjects.length + 1, name: "", examDate: "", hoursPerDay: "" },
    ]);
  };

  const removeSubject = (id) => {
    setSubjects(subjects.filter((subj) => subj.id !== id));
  };

  const handleChange = (id, field, value) => {
    setSubjects(
      subjects.map((subj) =>
        subj.id === id ? { ...subj, [field]: value } : subj
      )
    );
  };

  const generateTimetable = () => {
    const today = new Date();
    let newTable = [];

    subjects.forEach(({ name, examDate, hoursPerDay }) => {
      if (!name || !examDate || !hoursPerDay) return;

      const exam = new Date(examDate);
      const diffTime = exam - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) {
        newTable.push({
          subject: name,
          hours: "Exam Passed or Today!",
        });
      } else {
        const totalHours = diffDays * Number(hoursPerDay);
        const hoursPerSession = (totalHours / diffDays).toFixed(2);
        newTable.push({
          subject: name,
          hours: `${hoursPerSession} hrs/day for ${diffDays} days`,
        });
      }
    });

    setTimetable(newTable);
    setShowTimetable(true);
  };

  useEffect(() => {
    const container = document.getElementById("animation-container");
    for (let i = 0; i < 15; i++) {
      const circle = document.createElement("div");
      circle.className = "floating-circle";
      circle.style.left = Math.random() * 100 + "vw";
      circle.style.animationDuration = 6 + Math.random() * 10 + "s";
      circle.style.width = 15 + Math.random() * 20 + "px";
      circle.style.height = circle.style.width;
      container.appendChild(circle);
    }
  }, []);

  return (
    <>
      <div id="animation-container" style={styles.animationContainer}></div>

      <div style={styles.container} className="fadeIn">
        <h1 style={styles.title}>Smart Study Planner</h1>

        {subjects.map(({ id, name, examDate, hoursPerDay }) => (
          <div key={id} style={styles.subjectRow} className="subject-row">
            <input
              style={styles.input}
              placeholder="Subject Name"
              value={name}
              onChange={(e) => handleChange(id, "name", e.target.value)}
            />
            <input
              style={styles.input}
              type="date"
              value={examDate}
              onChange={(e) => handleChange(id, "examDate", e.target.value)}
            />
            <input
              style={styles.input}
              type="number"
              min="1"
              placeholder="Hours/day"
              value={hoursPerDay}
              onChange={(e) => handleChange(id, "hoursPerDay", e.target.value)}
            />
            {subjects.length > 1 && (
              <button
                onClick={() => removeSubject(id)}
                style={styles.removeButton}
                title="Remove Subject"
              >
                &times;
              </button>
            )}
          </div>
        ))}

        <button onClick={addSubject} style={styles.addButton}>
          + Add Subject
        </button>

        <button onClick={generateTimetable} style={styles.generateButton}>
          Generate Timetable
        </button>

        {showTimetable && timetable.length > 0 && (
          <div style={styles.tableContainer}>
            <h2 style={{ marginBottom: 15 }}>Your Personalized Timetable</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>Study Plan</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((item, index) => (
                  <tr key={index} className="table-row">
                    <td style={styles.td}>{item.subject}</td>
                    <td style={styles.td}>{item.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        /* Animation container & background */
        #animation-container {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 0;
          overflow: hidden;
          background: url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80') no-repeat center center fixed;
          background-size: cover;
          filter: brightness(0.7);
        }
        #animation-container::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(123,47,247,0.3), rgba(32,201,151,0.3), rgba(255,127,80,0.3));
          mix-blend-mode: screen;
          pointer-events: none;
          animation: gradientShift 20s ease infinite;
          z-index: 1;
        }
        @keyframes gradientShift {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }

        /* Floating circles animation */
        .floating-circle {
          position: absolute;
          bottom: -40px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          animation-name: floatUp;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          z-index: 2;
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            opacity: 1;
            transform: translateY(-150px) scale(1.1);
          }
          100% {
            transform: translateY(-300px) scale(1);
            opacity: 0;
          }
        }

        /* Fade in animation */
        .fadeIn {
          animation: fadeInAnim 1.2s ease forwards;
          opacity: 0;
        }
        @keyframes fadeInAnim {
          to {opacity: 1;}
        }

        /* Inputs styling */
        input {
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 0 8px rgba(160, 160, 160, 0.4);
          background-color: rgba(255,255,255,0.1);
          color: #f0f0f0;
          border-radius: 12px;
          border: 1.5px solid #a0a0a0;
          padding: 14px;
          font-size: 16px;
          outline: none;
          flex: 1;
          font-weight: 500;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-width: 0;
        }
        input::placeholder {
          color: #ccc;
        }

        /* Buttons styling */
        button {
          border-radius: 30px;
          padding: 14px 28px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          user-select: none;
          transition: all 0.3s ease;
        }
        button:hover {
          transform: scale(1.05);
        }
        button:focus {
          outline: none;
        }

        .removeButton {
          background: transparent;
          color: #ff4d6d;
          font-size: 26px;
          font-weight: 900;
          line-height: 1;
          padding: 0 8px;
          user-select: none;
          transition: color 0.3s ease;
          cursor: pointer;
          flex-shrink: 0;
        }
        .removeButton:hover {
          color: #ff7f50;
        }

        .addButton {
          background-color: #7b2ff7;
          color: white;
          margin-top: 15px;
          margin-bottom: 20px;
          width: 100%;
        }
        .generateButton {
          background-color: #20c997;
          color: white;
          width: 100%;
          font-weight: 700;
          font-size: 18px;
        }

        /* Table styles */
        .table-row:hover {
          background-color: rgba(255, 255, 255, 0.1);
          cursor: default;
          transition: background-color 0.3s ease;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          color: #e0e0e0;
          font-weight: 500;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        th {
          border-bottom: 2px solid #20c997;
          padding-bottom: 8px;
          text-align: left;
          color: #a0f0d7;
          font-weight: 700;
        }
        td {
          padding: 12px 6px;
          color: #e0e0e0;
          font-weight: 500;
        }

        /* Responsive tweaks */
        @media (max-width: 720px) {
          .subject-row {
            flex-direction: column;
            align-items: stretch;
          }
          input {
            width: 100%;
            margin-bottom: 12px;
          }
          .removeButton {
            align-self: flex-end;
            padding: 4px 10px;
            font-size: 22px;
            margin-bottom: 12px;
          }
          .addButton, .generateButton {
            font-size: 16px;
            padding: 14px;
          }
          h1 {
            font-size: 2.2rem !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
        }

        @media (max-width: 400px) {
          input {
            font-size: 14px;
            padding: 12px;
          }
          button {
            padding: 12px 20px;
          }
          .removeButton {
            font-size: 20px;
            padding: 2px 8px;
          }
        }
      `}</style>
    </>
  );
}

const styles = {
  container: {
    position: "relative",
    zIndex: 10,
    maxWidth: 680,
    margin: "40px auto",
    padding: "40px 30px",
    backgroundColor: "rgba(25, 25, 30, 0.7)",
    borderRadius: 30,
    boxShadow: "0 15px 30px rgba(123,47,247,0.3)",
    color: "#eee",
  },
  animationContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 0,
  },
  title: {
    textAlign: "center",
    fontSize: "2.7rem",
    marginBottom: 30,
    fontWeight: "900",
    color: "white",
    textShadow: "0 0 10px #7b2ff7",
  },
  subjectRow: {
    display: "flex",
    gap: 12,
    marginBottom: 18,
    alignItems: "center",
    flexWrap: "nowrap",
  },
  input: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#7b2ff7",
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 30,
    padding: "14px 28px",
    border: "none",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
  generateButton: {
    backgroundColor: "#20c997",
    width: "100%",
    fontWeight: "700",
    fontSize: 18,
    borderRadius: 30,
    padding: "14px 0",
    border: "none",
    cursor: "pointer",
  },
  removeButton: {
    background: "transparent",
    color: "#ff4d6d",
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 1,
    padding: "0 8px",
    userSelect: "none",
    cursor: "pointer",
    flexShrink: 0,
  },
  tableContainer: {
    marginTop: 25,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 0 30px #20c997aa",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #20c997",
    paddingBottom: 8,
    textAlign: "left",
    color: "#a0f0d7",
    fontWeight: "700",
  },
  td: {
    padding: "12px 6px",
    color: "#e0e0e0",
    fontWeight: "500",
  },
};

export default App;
const generateTimetable = async () => {
  try {
    const response = await fetch("http://localhost:8000/generate-timetable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subjects }),
    });

    const data = await response.json();
    setTimetable(data.timetable);
    setShowTimetable(true);
  } catch (error) {
    console.error("Error generating timetable:", error);
  }
};
