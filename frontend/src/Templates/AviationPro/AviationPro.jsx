export default function AviationPro({ data }) {

  return (
    <div className="resume-a4">

      <h1>{data?.name || "Your Name"}</h1>
      <p>{data?.jobTitle || "Job Title"}</p>

      <h2>Experience</h2>
      {data?.experience?.length ? (
        data.experience.map((exp, i) => (
          <div key={i}>
            <strong>{exp.title}</strong>
            <p>{exp.company}</p>
          </div>
        ))
      ) : (
        <p>No experience added</p>
      )}

    </div>
  );
}