"use client";

import ApprovedIcon from "@/assets/icons/approved";
import ConfessionIcon from "@/assets/icons/confessions";
import FlagIcon from "@/assets/icons/flag";
import PendingIcon from "@/assets/icons/pending";
import { withAuth } from "@/components/auth/protected-route";
import { cn } from "@/lib/utils";
import {
  getConfessions,
  getConfessionStats,
  updateConfessionStatus,
  type Confession,
} from "@/services/confessions";
import {
  CheckCircle,
  Eye,
  Search,
  XCircle
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AdminStatsCard } from "./components/AdminStatsCard";
import ConfessionModal from "./components/ConfessionModal";

interface Stats {
  total: number;
  pending: number;
  approved: number;
  flagged: number;
}

function AdminDashboardComponent() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
    flagged: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedConfession, setSelectedConfession] =
    useState<Confession | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [fetchedConfessions, fetchedStats] = await Promise.all([
        getConfessions(selectedStatus),
        getConfessionStats(),
      ]);

      setConfessions(fetchedConfessions);
      setStats(fetchedStats);
      setError(null);
    } catch (err) {
      console.log(err)
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedStatus]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusUpdate = async (
    confessionId: string,
    newStatus: "pending" | "approved" | "flagged"
  ) => {
    try {
      await updateConfessionStatus(confessionId, newStatus);
      await fetchData();
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.log(error)
    }
  };

  const filteredConfessions = confessions.filter((confession) =>
    confession.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewConfession = (confession: Confession) => {
    setSelectedConfession(confession);
  };

  const handleCloseModal = () => {
    setSelectedConfession(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <AdminStatsCard title="Total Confessions" value={stats.total} icon={<ConfessionIcon/>} />
          <AdminStatsCard title="Pending Review" value={stats.pending} icon={<PendingIcon/>} />
          <AdminStatsCard title="Approved Today" value={stats.approved} icon={<ApprovedIcon/>} />
          <AdminStatsCard title="Flagged Content" value={stats.flagged} icon={<FlagIcon />} />
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative flex-grow md:flex-grow-0">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search confessions..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {["All", "Pending", "Approved", "Flagged"].map((status) => (
              <button
                key={status}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm",
                  selectedStatus === status.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "bg-white border hover:bg-gray-50"
                )}
                onClick={() => setSelectedStatus(status.toLowerCase())}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Confessions Table */}
        <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Loading...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Confession
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredConfessions.map((confession) => (
                    <tr key={confession.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {confession.id.slice(0, 6)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {confession.content}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {confession.createdAt.toDate().toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={confession.status} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewConfession(confession)}
                          >
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span className="sr-only">View</span>
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(confession.id, "approved")
                            }
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="sr-only">Approve</span>
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(confession.id, "flagged")
                            }
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selectedConfession && (
        <ConfessionModal
          confession={selectedConfession}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      {
        "bg-green-100 text-green-800": status === "approved",
        "bg-yellow-100 text-yellow-800": status === "pending",
        "bg-red-100 text-red-800": status === "flagged",
      }
    )}
  >
    {status.charAt(0).toUpperCase() + status.slice(1)}
  </span>
);

const AdminDashboard = withAuth(AdminDashboardComponent, { adminOnly: true });
export default AdminDashboard;