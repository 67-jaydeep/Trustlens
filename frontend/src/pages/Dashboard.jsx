import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAnalysis, getAnalysisReport } from "../api/analysis";
import { getDashboardSummary } from "../api/dashboard";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [content, setContent] = useState("");
  const [jobId, setJobId] = useState(null);
  const [formError, setFormError] = useState(null);

  /* ===============================
     DASHBOARD SUMMARY
  =============================== */

  const {
    data: summaryData,
    refetch: refetchSummary,
  } = useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: getDashboardSummary,
    refetchInterval: 10000, // auto refresh every 10s
  });

  /* ===============================
     CREATE ANALYSIS JOB
  =============================== */

  const mutation = useMutation({
    mutationFn: createAnalysis,
    onSuccess: (data) => {
      setFormError(null);
      setJobId(data.jobId);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.error?.message ||
        "Something went wrong.";
      setFormError(message);
    },
  });

  /* ===============================
     POLL ANALYSIS REPORT
  =============================== */

  const { data: reportData } = useQuery({
    queryKey: ["analysis", jobId],
    queryFn: () => getAnalysisReport(jobId),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 3000;
      if (
        data.job?.status === "COMPLETED" ||
        data.job?.status === "FAILED"
      ) {
        return false;
      }
      return 3000;
    },
  });

  /* ===============================
     REFRESH SUMMARY WHEN JOB DONE
  =============================== */

  useEffect(() => {
    if (reportData?.job?.status === "COMPLETED") {
      refetchSummary();
    }
  }, [reportData, refetchSummary]);

  /* ===============================
     FORM SUBMIT
  =============================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setFormError("Content is required.");
      return;
    }

    if (content.trim().length < 20) {
      setFormError("Content must be at least 20 characters.");
      return;
    }

    setFormError(null);
    setJobId(null);

    mutation.mutate({
      inputType: "text",
      content,
    });
  };

  const aggregation = reportData?.aggregation;

  const getRiskColor = (band) => {
    if (band === "LOW") return "text-green-600";
    if (band === "MEDIUM") return "text-yellow-600";
    if (band === "HIGH") return "text-red-600";
    return "text-neutral-400";
  };

  return (
    <div className="w-full min-h-full flex flex-col gap-8 p-6 md:p-8">

      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">
          TrustLens Dashboard
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Transparent trust & misinformation intelligence
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

        <div className="min-w-0 bg-white border rounded-xl p-4 md:p-6">
          <p className="text-xs text-neutral-400">Total Analyses</p>
          <p className="text-lg md:text-2xl font-semibold">
            {summaryData?.totalAnalyses ?? "—"}
          </p>
        </div>

        <div className="min-w-0 bg-white border rounded-xl p-4 md:p-6">
          <p className="text-xs text-neutral-400">High Risk</p>
          <p className="text-lg md:text-2xl font-semibold text-red-600">
            {summaryData?.highRiskCount ?? "—"}
          </p>
        </div>

        <div className="min-w-0 bg-white border rounded-xl p-4 md:p-6">
          <p className="text-xs text-neutral-400">Avg Risk</p>
          <p className="text-lg md:text-2xl font-semibold">
            {summaryData?.avgRiskScore ?? "—"}
          </p>
        </div>

        <div className="min-w-0 bg-white border rounded-xl p-4 md:p-6">
          <p className="text-xs text-neutral-400">Last Status</p>
          <p className="text-lg md:text-2xl font-semibold break-words">
            {summaryData?.lastJobStatus ?? "—"}
          </p>
        </div>

      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

        {/* ================= WORKSPACE ================= */}

        <div className="bg-white border rounded-2xl p-6 md:p-8 flex flex-col gap-6">

          <h2 className="text-lg font-semibold">
            Content Analysis Workspace
          </h2>
          {formError && (
            <div className="
              bg-red-50
              border
              border-red-200
              text-red-600
              text-sm
              px-4
              py-3
              rounded-xl
            ">
              {formError}
            </div>
          )}
            
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste article or content here..."
              className="
                w-full
                min-h-[300px]
                md:min-h-[500px]
                rounded-xl
                border
                bg-gray-100
                px-4
                py-4
                text-sm
                resize-none
                focus:ring-2
                focus:ring-neutral-900
                outline-none
                overflow-y-auto
                no-scrollbar
              "
            />



            <button
              type="submit"
              className="
                w-fit
                px-6
                py-3
                rounded-xl
                bg-neutral-900
                text-white
                text-sm
                font-medium
                hover:opacity-90
              "
            >
              {mutation.isLoading
                ? "Creating Job..."
                : "Run Trust Analysis"}
            </button>

          </form>
        </div>

        {/* ================= INTELLIGENCE ================= */}

        <div className="bg-white border rounded-2xl p-6 md:p-8 flex flex-col gap-6">

          <h2 className="text-lg font-semibold">
            Trust Signal Engine
          </h2>

          <div className="space-y-6">

            {/* STATUS */}
            <div>
              <p className="text-xs text-neutral-400">Job Status</p>
              <div className="flex items-center gap-2 mt-1">
                {!jobId && (
                  <span className="text-sm text-neutral-400">Idle</span>
                )}

                {jobId && !reportData && (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">QUEUED</span>
                  </>
                )}

                {reportData && (
                  <span className="text-sm font-medium">
                    {reportData.job?.status}
                  </span>
                )}
              </div>
            </div>

            {/* OVERALL RISK */}
            <div>
              <p className="text-xs text-neutral-400">Overall Risk Band</p>
              <p className={`text-2xl font-semibold ${
                aggregation
                  ? getRiskColor(aggregation.overallRiskBand)
                  : "text-neutral-300"
              }`}>
                {aggregation?.overallRiskBand ?? "—"}
              </p>
            </div>

            {/* SCORE */}
            <div>
              <p className="text-xs text-neutral-400">Trust Risk Score</p>
              <p className="text-lg font-semibold">
                {aggregation?.overallScore ?? "—"}
              </p>
            </div>

            {/* SIGNAL BREAKDOWN */}
            <div className="border-t pt-4 space-y-2">
              <p className="text-xs text-neutral-400">Signal Breakdown</p>

              <div className="flex justify-between text-sm">
                <span>Framing Risk</span>
                <span>{aggregation?.groupScores?.framing ?? "—"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Evidence Strength</span>
                <span>{aggregation?.groupScores?.evidence ?? "—"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Production Quality</span>
                <span>{aggregation?.groupScores?.production ?? "—"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Persuasion Index</span>
                <span>{aggregation?.groupScores?.persuasion ?? "—"}</span>
              </div>
            </div>

            {/* SIGNAL COUNT */}
            <div className="border-t pt-4 space-y-2">
              <p className="text-xs text-neutral-400">Signal Execution</p>

              <div className="flex justify-between text-sm">
                <span>Total Signals</span>
                <span>{reportData?.signals?.length ?? "—"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span>
                  {reportData?.signals?.filter(s => s.status === "COMPLETED").length ?? "—"}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Failed</span>
                <span>
                  {reportData?.signals?.filter(s => s.status === "FAILED").length ?? "—"}
                </span>
              </div>
            </div>

            {/* CONTENT META */}
            <div className="border-t pt-4 space-y-2">
              <p className="text-xs text-neutral-400">Content Meta</p>

              <div className="flex justify-between text-sm">
                <span>Word Count</span>
                <span>{reportData?.job?.meta?.wordCount ?? "—"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Language</span>
                <span>{reportData?.job?.meta?.language ?? "—"}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Signal Version</span>
                <span>{reportData?.signals?.[0]?.signalVersion ?? "v1"}</span>
              </div>
            </div>

            {/* REPORT LINK */}
            {jobId && aggregation && (
              <Link
                to={`/report/${jobId}`}
                className="text-sm font-medium hover:underline"
              >
                View Full Trust Report →
              </Link>
            )}

          </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
  