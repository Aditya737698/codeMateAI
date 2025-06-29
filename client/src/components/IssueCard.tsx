import React from "react";
import { Link } from "react-router-dom";

type IssueProps = {
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  id?: number;
};

const statusColors = {
  open: "bg-green-200 text-green-800",
  "in-progress": "bg-yellow-200 text-yellow-800",
  closed: "bg-red-200 text-red-800",
};

const IssueCard: React.FC<IssueProps> = ({ title, description, status, id }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md space-y-2 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <span
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${statusColors[status]}`}
      >
        {status}
      </span>
      {typeof id === "number" && (
        <div>
          <Link
            to={`/issue/${id}`}
            className="inline-block mt-2 text-sm text-blue-600 hover:underline"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default IssueCard;