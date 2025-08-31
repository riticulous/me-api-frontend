import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");

  const searchProjects = () => {
    if (!searchSkill) return;
    axios
      .get(`${API_URL}/profile/projects?skill=${searchSkill}`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/profile`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1>{profile?.name}</h1>
      <p>Email: {profile?.email}</p>

      <h2>Skills</h2>
      <ul>{profile?.skills?.map((s, i) => <li key={i}>{s}</li>)}</ul>

      <h2>Education</h2>
      <ul>
        {profile?.education?.map((e, i) => <li key={i}>{e}</li>)}
      </ul>

      <h2>Work Experience</h2>
      <ul>
        {profile?.work?.map((w, i) => <li key={i}>{w}</li>)}
      </ul>

      <h2>Search Projects by Skill</h2>
      <input
        type="text"
        value={searchSkill}
        onChange={(e) => setSearchSkill(e.target.value)}
        placeholder="Enter a skill"
      />
      <button onClick={searchProjects}>Search</button>

      <ul>
        {projects.map((p, i) => (
          <li key={i}>
            <strong>{p.title}</strong> - {p.description}
          </li>
        ))}
      </ul>

      <h2>Projects</h2>
      <ul>
        {profile?.projects?.map((p, i) => (
          <li key={i}>
            <strong>{p.title}</strong> - {p.description}
            <br />
            Skills: {p.skills.join(", ")}
            <br />
            {p.links?.map((link, j) => (
              <a key={j} href={link} target="_blank" rel="noreferrer">
                {link}
              </a>
            ))}
          </li>
        ))}
      </ul>

      <h2>Links</h2>
      <ul>
        {profile?.links?.github && (
          <li>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        )}
        {profile?.links?.linkedin && (
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        )}
        {profile?.links?.portfolio && (
          <li>
            <a href={profile.links.portfolio} target="_blank" rel="noreferrer">
              Portfolio
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
