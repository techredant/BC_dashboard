import { useState } from "react";
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";

const pendingUsers = [
  { id: 1, name: "Sarah Otieno", email: "sarah@mail.com", county: "Nairobi", idNumber: "***4521", submitted: "2025-02-18", docs: 3 },
  { id: 2, name: "Michael Ouma", email: "michael@mail.com", county: "Mombasa", idNumber: "***7832", submitted: "2025-02-17", docs: 2 },
  { id: 3, name: "Lucy Wambui", email: "lucy@mail.com", county: "Nakuru", idNumber: "***1290", submitted: "2025-02-16", docs: 3 },
  { id: 4, name: "Tom Njoroge", email: "tom@mail.com", county: "Kiambu", idNumber: "***5643", submitted: "2025-02-15", docs: 2 },
  { id: 5, name: "Esther Auma", email: "esther@mail.com", county: "Kisumu", idNumber: "***8901", submitted: "2025-02-14", docs: 3 },
];

export default function VerificationPage() {
  const [users, setUsers] = useState(pendingUsers);

  const handleAction = (id: number, action: "approve" | "reject") => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">User Verification</h1>
        <p className="page-description">Review and verify pending user applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-warning/10"><Clock className="h-5 w-5 text-warning" /></div>
          <div>
            <p className="text-2xl font-bold font-display">{users.length}</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-success/10"><CheckCircle className="h-5 w-5 text-success" /></div>
          <div>
            <p className="text-2xl font-bold font-display">62,400</p>
            <p className="text-sm text-muted-foreground">Verified Users</p>
          </div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-destructive/10"><XCircle className="h-5 w-5 text-destructive" /></div>
          <div>
            <p className="text-2xl font-bold font-display">1,230</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </div>
        </div>
      </div>

      {/* Pending list */}
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="bg-card rounded-xl border p-5 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground font-bold text-sm font-display">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email} · {user.county}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden md:block">
                <p className="text-xs text-muted-foreground">ID: {user.idNumber}</p>
                <p className="text-xs text-muted-foreground">{user.docs} docs · Submitted {user.submitted}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title="View Documents">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => handleAction(user.id, "approve")}
                  className="px-3 py-1.5 text-xs font-medium bg-success text-success-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(user.id, "reject")}
                  className="px-3 py-1.5 text-xs font-medium bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="bg-card rounded-xl border p-12 text-center">
            <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
            <p className="font-semibold font-display">All caught up!</p>
            <p className="text-sm text-muted-foreground mt-1">No pending verifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
