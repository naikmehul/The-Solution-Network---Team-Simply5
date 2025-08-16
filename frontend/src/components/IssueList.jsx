import { useEffect, useState } from "react";
import { getIssues } from "../services/api";
import IssueCard from "./IssueCard";

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getIssues().then(setIssues).catch(console.error);
  }, []);

  return (
    <div className="issues-grid container">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
