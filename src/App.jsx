import { useEffect, useState } from "react";
import { getCandidateByEmail } from "./services/api";
import JobList from "./components/JobList";

function App() {
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      const data = await getCandidateByEmail("milenasivitdev@gmail.com");
      setCandidate(data);
      // console.log(data)
    };
    fetchCandidate();
  }, []);

  if (!candidate) return <p>Cargando...</p>;

  return <JobList candidate={candidate} />;
}

export default App;
