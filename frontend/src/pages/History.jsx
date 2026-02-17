import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getHistory } from "../api/history";

const riskColors = {
  LOW: "bg-emerald-100 text-emerald-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-red-100 text-red-700",
};

const statusColors = {
  QUEUED: "bg-gray-100 text-gray-600",
  PROCESSING: "bg-blue-100 text-blue-600 animate-pulse",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  FAILED: "bg-red-100 text-red-600",
};

function History() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["history", page],
    queryFn: () => getHistory(page, 10),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Loading intelligence timeline...
      </div>
    );
  }

  const jobs = data?.results || [];

  return (
    <div className="h-full overflow-y-auto pb-28 px-4 md:px-8 scrollbar-hide">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Intelligence Timeline
        </h1>

        {jobs.length === 0 && (
          <div className="text-center text-gray-400">
            No analysis history yet.
          </div>
        )}

        <div className="relative border-l border-gray-200 pl-6 space-y-10">
          {jobs.map((job) => {
            const riskBand = job?.aggregation?.overallRiskBand;
            const score = job?.aggregation?.overallScore;

            return (
              <div key={job.id} className="relative">
                <div className="absolute -left-[34px] top-2 w-4 h-4 rounded-full bg-indigo-500"></div>

                <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 hover:shadow-md transition">

                  {/* Top Row */}
                  <div className="flex flex-wrap items-center justify-between gap-4">

                    <div className="flex items-center gap-3">
                      {riskBand && (
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${riskColors[riskBand]}`}
                        >
                          {riskBand} RISK
                        </span>
                      )}

                      {score !== undefined && (
                        <span className="text-sm text-gray-500">
                          Score: {score}
                        </span>
                      )}
                    </div>

                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="mt-4 text-sm text-gray-500 flex flex-wrap gap-6">
                    <span>Words: {job?.meta?.wordCount || 0}</span>
                    <span>Type: {job.inputType}</span>
                    <span>
                      {new Date(job.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-6 text-sm">

                    {job.status === "COMPLETED" && (
                      <Link
                        to={`/report/${job.id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                      >
                        View Full Report →
                      </Link>
                    )}

                    {job.status === "PROCESSING" && (
                      <span className="text-blue-600">
                        Processing intelligence...
                      </span>
                    )}

                    {job.status === "FAILED" && (
                      <span className="text-red-600">
                        Analysis failed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {data?.totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-4">

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 text-sm border rounded-md disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-sm text-gray-500">
              Page {data.page} of {data.totalPages}
            </span>

            <button
              disabled={page === data.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 text-sm border rounded-md disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

export default History;
