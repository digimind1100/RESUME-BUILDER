export default function AviationPro({ data }) {

  return (
    <div className="resume-a4">

      <h1>{data?.name || "Your Name"}</h1>
      <p>{data?.jobTitle || "Job Title"}</p>

    </div>
  );
}