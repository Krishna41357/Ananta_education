export default function CollegeCard({ college }) {
  return (
    <div className="college-card">
      <img src={college.image} alt={college.name} />
      <h3>{college.name}</h3>
      <p>{college.about}</p>
      <p><b>Location:</b> {college.location}</p>
    </div>
  );
}
