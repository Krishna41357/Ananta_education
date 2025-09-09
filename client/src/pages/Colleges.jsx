import { useEffect, useState } from "react";
import API from "../services/api";
import CollegeCard from "../components/CollegeCard";

export default function Colleges() {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    API.get("/colleges").then(res => setColleges(res.data));
  }, []);

  return (
    <div>
      <h2>Colleges</h2>
      {colleges.map(clg => <CollegeCard key={clg._id} college={clg} />)}
    </div>
  );
}
