import { Link } from "react-router-dom";

export default function IssueCard({ issue }) {
  return (
    <div className="issue-card">
      <h3 className="issue-title">{issue.title}</h3>
      <p className="issue-desc">{issue.description}</p>
      <Link to={`/issues/${issue.id}`}>View Details</Link>
    </div>
  );
}
