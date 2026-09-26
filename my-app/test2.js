const data = {"full_name":"Nahian Alam","email":"email@test.com","phone":"","location":"","linkedin":"","github":"","portfolio":"","summary":"","education":[],"experience":[{"role":"Software Engineer","org":"Google","duration":"2020-2022","bullets":"Developed search algorithms."}],"projects":[],"skills":[{"category":"Programming Languages","skills":"Java, Python"}],"certifications":[],"references":[],"extras":[]};

function findBestResumeObject(obj) {
  if (!obj || typeof obj !== "object") return null;

  let bestObj = null;
  let maxKeys = -1;

  const resumeKeys = ["full_name", "fullName", "email", "summary", "education", "experience", "projects", "skills"];

  function traverse(current) {
    if (!current || typeof current !== "object") return;

    let count = 0;
    if (!Array.isArray(current)) {
      const currentKeys = Object.keys(current).map(k => k.toLowerCase());
      for (const k of resumeKeys) {
        if (currentKeys.includes(k.toLowerCase())) {
          count++;
        }
      }

      if (count > maxKeys) {
        maxKeys = count;
        bestObj = current;
      }
    }

    for (const key of Object.keys(current)) {
      const val = current[key];
      if (typeof val === "object" && val !== null) {
        traverse(val);
      }
    }
  }

  traverse(obj);
  return bestObj || obj;
}

console.log(findBestResumeObject(data));
