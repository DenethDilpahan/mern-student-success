import React, { useState, useEffect } from "react";
import '../styles/ResourceLibrary.css';

export default function ResourceLibrary() {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11"];
  const subjects = ["Math", "Science", "English", "History", "Sinhala", "Buddhism", "B.Sub 1", "B.Sub 2", "B.Sub 3"];

  useEffect(() => {
    if (grade && subject) {
      setLoading(true);
      fetch(`http://localhost:5000/api/resources?grade=${grade}&subject=${subject}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched resources:", data);
          setResources(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load resources:", err);
          setLoading(false);
        });
    } else {
      setResources([]);
    }
  }, [grade, subject]);

  return (
    <div className="page-container">
      <div className="resource-library-container">
        <h2 className="library-heading">📚 Resource Library</h2>

        <div className="filters">
          <label>Grade: </label>
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">Select Grade</option>
            {grades.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <label className="subject-label">Subject: </label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading resources...</p>
        ) : resources.length === 0 && grade && subject ? (
          <p>No resources found for {grade} - {subject}</p>
        ) : (
          <ul className="resource-list">
            {resources.map((resource) => (
              <li key={resource._id} className="resource-card">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>

                {resource.type === "PDF" && (
                  <iframe
                    src={resource.link}
                    className="pdf-frame"
                    title={resource.title}
                  />
                )}

                {resource.type === "Video" && (
                  <iframe
                    className="video-frame"
                    src={resource.link}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={resource.title}
                  />
                )}

                {resource.type === "Article" && (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-link"
                  >
                    Read Article
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
