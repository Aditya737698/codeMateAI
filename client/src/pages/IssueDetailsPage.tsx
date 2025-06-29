// src/pages/IssueDetailsPage.tsx
import { useParams } from "react-router-dom";

const IssueDetailsPage = () => {
  const { id } = useParams();
  return <div className="p-4">Details for Issue #{id}</div>;
};

export default IssueDetailsPage;