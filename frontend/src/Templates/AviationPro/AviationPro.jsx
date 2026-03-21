export default function AviationPro({ data }) {

  console.log("AviationPro working", data);

  return (
    <div className="resume-a4">
      <h1>Aviation Template Working ✅</h1>
      <p>{data?.name || "No Name"}</p>
    </div>
  );
}