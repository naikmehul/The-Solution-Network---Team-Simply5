import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIssueById } from "../services/api";

export default function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    getIssueById(id).then(setIssue).catch(console.error);
  }, [id]);

  if (!issue) return <p className="container">Loading issue...</p>;

  return (
    <div className="container">
      <h2 className="issue-title">{issue.title}</h2>
      <p>{issue.description}</p>
    </div>
  );
}
