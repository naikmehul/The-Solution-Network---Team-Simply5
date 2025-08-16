const Issues = ({ issues }) => {
  if (!issues.length) return <p>No issues found.</p>;

  return (
    <div>
      <h2>All Issues</h2>
      {issues.map((issue) => (
        <div key={issue.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '4px' }}>
          <h3>{issue.title}</h3>
          <p><strong>Status:</strong> {issue.status}</p>
          <p><strong>Category:</strong> {issue.category}</p>
          <p><strong>Priority:</strong> {issue.priority}</p>
          <p><strong>Location:</strong> {issue.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Issues;
