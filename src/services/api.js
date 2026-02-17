const API_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export const getCandidateByEmail = async (email) => {
  const response = await fetch(`${API_URL}/api/candidate/get-by-email?email=${email}`);
  return response.json();
};

export const getJobs = async () => {
  const response = await fetch(`${API_URL}/api/jobs/get-list`);
  return response.json();
};

export const applyToJob = async (body) => {
  const response = await fetch(`${API_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
};
