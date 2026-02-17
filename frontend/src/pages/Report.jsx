import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnalysisReport } from "../api/analysis";
import { Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Report() {
  const { jobId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["analysis", jobId],
    queryFn: () => getAnalysisReport(jobId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const aggregation = data?.aggregation;
  const signals = data?.signals || [];
  const job = data?.job;

  const getRiskColor = (band) => {
    if (band === "LOW") return "text-green-600";
    if (band === "MEDIUM") return "text-yellow-600";
    if (band === "HIGH") return "text-red-600";
    return "text-neutral-600";
  };

  const getRiskBg = (band) => {
    if (band === "LOW") return "bg-green-50 border-green-200";
    if (band === "MEDIUM") return "bg-yellow-50 border-yellow-200";
    if (band === "HIGH") return "bg-red-50 border-red-200";
    return "bg-neutral-50 border-neutral-200";
  };

const handleDownloadPDF = () => {
  const pdf = new jsPDF("p", "mm", "a4");

  const DARK = [18, 25, 38];
  const ACCENT = [0, 120, 255];
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;

  // =========================
  // HEADER + FOOTER
  // =========================
  const drawHeaderFooter = () => {
    const pageCount = pdf.internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);

      // Header
      pdf.setFillColor(...DARK);
      pdf.rect(0, 0, pageWidth, 18, "F");

      pdf.setTextColor(255);
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      pdf.text("TrustLens Report", margin, 12);

      // Footer
      pdf.setFillColor(...DARK);
      pdf.rect(0, pageHeight - 15, pageWidth, 15, "F");

      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(255);

      pdf.text(
        `TrustLens`,
        margin,
        pageHeight - 6
      );

      pdf.text(
        `Page ${i}`,
        pageWidth - margin,
        pageHeight - 6,
        { align: "right" }
      );
    }
  };

  // =========================
  // PAGE 1 – SUMMARY
  // =========================

  pdf.setFontSize(16);
  pdf.setTextColor(...ACCENT);
  pdf.text("Executive Summary", margin, 35);

  pdf.setFontSize(12);
  pdf.setTextColor(50);

  pdf.text(
    `Overall Risk Band: ${aggregation?.overallRiskBand}`,
    margin,
    45
  );
  pdf.text(
    `Trust Risk Score: ${aggregation?.overallScore}`,
    margin,
    52
  );

  // Metadata Table
  autoTable(pdf, {
    startY: 65,
    margin: { left: margin, right: margin },
    head: [["Report Metadata", ""]],
    body: [
      ["Generated On", new Date().toLocaleString()],
      ["Status", job?.status],
      ["Word Count", job?.meta?.wordCount],
      ["Language", job?.meta?.language],
      ["Signal Version", signals?.[0]?.signalVersion || "v1"],
    ],
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: ACCENT,
      textColor: 255,
    },
  });

  // Group Breakdown Table
  autoTable(pdf, {
    startY: pdf.lastAutoTable.finalY + 10,
    margin: { left: margin, right: margin },
    head: [["Signal Group", "Score"]],
    body: Object.entries(aggregation?.groupScores || {}).map(
      ([key, value]) => [key.toUpperCase(), value]
    ),
    theme: "striped",
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: ACCENT,
      textColor: 255,
    },
  });

  // =========================
  // PAGE 2 – ANALYZED CONTENT
  // =========================
    pdf.addPage();

    pdf.setFontSize(16);
    pdf.setTextColor(...ACCENT);
    pdf.text("Analyzed Content", margin, 45);

    // Add vertical spacing after title
    const contentStartY = 60;

    autoTable(pdf, {
    startY: contentStartY,
    margin: { left: margin, right: margin },
    body: [[job?.originalInput || "No content available"]],
    theme: "plain",
    styles: {
        fontSize: 10,
        cellPadding: 6, // slightly more internal breathing space
    },
    columnStyles: {
        0: { cellWidth: pageWidth - margin * 2 },
    },
});

  // =========================
  // PAGE 3+ – SIGNAL ANALYSIS
  // =========================
  pdf.addPage();

  pdf.setFontSize(16);
  pdf.setTextColor(...ACCENT);
  pdf.text("Individual Signal Analysis", margin, 35);

  autoTable(pdf, {
    startY: 45,
    margin: { left: margin, right: margin },
    head: [["Signal", "Value", "Confidence", "Explanation"]],
    body: signals.map((s) => [
      s.signalId.replace(/_/g, " "),
      s.value,
      s.confidence,
      s.explanation,
    ]),
    theme: "grid",
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: ACCENT,
      textColor: 255,
    },
    columnStyles: {
      3: { cellWidth: 70 },
    },
  });

  // Draw header/footer on all pages
  drawHeaderFooter();

  pdf.save("TrustLens-Premium-Intelligence-Report.pdf");
};




  return (
    <div className="p-6 md:p-10 bg-neutral-50 min-h-screen">
      <div id="report-content" className="space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-start border-b pb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
              TrustLens Intelligence Report
            </h1>
            <p className="text-sm text-neutral-500 mt-2">
              Generated analytical trust assessment
            </p>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="px-5 py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:opacity-90"
          >
            Download PDF
          </button>
        </div>

        {/* OVERALL SUMMARY */}
        <div className={`border rounded-2xl p-6 ${getRiskBg(aggregation?.overallRiskBand)}`}>
          <h2 className="text-lg font-semibold mb-4">
            Overall Risk Summary
          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-neutral-500">Risk Band</p>
              <p className={`text-3xl font-bold ${getRiskColor(aggregation?.overallRiskBand)}`}>
                {aggregation?.overallRiskBand}
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">Trust Risk Score</p>
              <p className="text-xl font-semibold">
                {aggregation?.overallScore}
              </p>
            </div>
          </div>
        </div>

        {/* GROUP BREAKDOWN */}
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">
            Signal Group Breakdown
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {Object.entries(aggregation?.groupScores || {}).map(
              ([key, value]) => (
                <div key={key} className="bg-neutral-50 rounded-xl p-4 border">
                  <p className="text-xs uppercase text-neutral-400 mb-2">
                    {key}
                  </p>
                  <p className="text-xl font-semibold">
                    {value}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Analyzed Content
          </h2>
          <div className="text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
            {job?.originalInput}
          </div>
        </div>

        {/* SIGNAL DETAILS */}
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">
            Individual Signal Analysis
          </h2>

          <div className="space-y-6">
            {signals.map((signal) => (
              <div
                key={signal._id}
                className="border rounded-xl p-5 bg-neutral-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold capitalize">
                    {signal.signalId.replace(/_/g, " ")}
                  </p>
                  <span className="text-xs px-3 py-1 rounded-full bg-white border">
                    {signal.confidence}
                  </span>
                </div>

                <p className="text-sm text-neutral-700">
                  {signal.explanation}
                </p>

                <div className="text-xs text-neutral-500 mt-3">
                  Value: {signal.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* METADATA */}
        <div className="bg-white border rounded-2xl p-6 text-sm">
          <h2 className="text-lg font-semibold mb-4">
            Report Metadata
          </h2>
          <p>Status: {job?.status}</p>
          <p>Word Count: {job?.meta?.wordCount}</p>
          <p>Language: {job?.meta?.language}</p>
          <p>Signal Version: {signals?.[0]?.signalVersion || "v1"}</p>
        </div>

      </div>
    </div>
  );
}

export default Report;
