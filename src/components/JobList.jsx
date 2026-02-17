import { useEffect, useState } from "react";
import { getJobs, applyToJob } from "../services/api";

export default function JobList({ candidate }) {
  const [jobs, setJobs] = useState([]);
  const [repoUrls, setRepoUrls] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError("Error cargando posiciones");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSubmit = async (jobId) => {
    try {
      const body = {
        uuid: candidate.uuid,
        jobId,
        candidateId: candidate.candidateId,
        repoUrl: repoUrls[jobId],
      };

      const res = await applyToJob(body);
      alert("Aplicación enviada!");
    } catch (err) {
      alert("Error al enviar");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <input
            placeholder="GitHub repo"
            onChange={(e) =>
              setRepoUrls({ ...repoUrls, [job.id]: e.target.value })
            }
          />
          <button onClick={() => handleSubmit(job.id)}>Submit</button>
        </div>
      ))}
    </div>
  );
}
