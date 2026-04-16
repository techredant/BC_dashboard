import { useState } from "react";
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const mockUsers = [
  { id: 1, name: "John Kamau", email: "john@mail.com", county: "Nairobi", status: "verified", joined: "2024-12-01", logins: 142 },
  { id: 2, name: "Mary Wanjiku", email: "mary@mail.com", county: "Kiambu", status: "pending", joined: "2025-01-15", logins: 87 },
  { id: 3, name: "Peter Odhiambo", email: "peter@mail.com", county: "Kisumu", status: "unverified", joined: "2025-02-01", logins: 23 },
  { id: 4, name: "Grace Muthoni", email: "grace@mail.com", county: "Mombasa", status: "verified", joined: "2024-11-20", logins: 201 },
  { id: 5, name: "David Kipchoge", email: "david@mail.com", county: "Uasin Gishu", status: "verified", joined: "2024-10-05", logins: 312 },
  { id: 6, name: "Faith Akinyi", email: "faith@mail.com", county: "Nakuru", status: "pending", joined: "2025-01-28", logins: 45 },
  { id: 7, name: "James Mwangi", email: "james@mail.com", county: "Nyeri", status: "verified", joined: "2024-09-12", logins: 189 },
  { id: 8, name: "Linda Chebet", email: "linda@mail.com", county: "Kericho", status: "unverified", joined: "2025-02-10", logins: 8 },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <p className="page-description">View, search and manage all platform users</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2 flex-1 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent text-sm outline-none flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1 bg-card border rounded-lg p-1">
          {["all", "verified", "pending", "unverified"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-secondary/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">User</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">County</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Joined</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Logins</th>
              <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm">{user.county}</td>
                <td className="px-5 py-3.5">
                  <span className={`badge-${user.status}`}>{user.status}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-muted-foreground">{user.joined}</td>
                <td className="px-5 py-3.5 text-sm font-medium">{user.logins}</td>
                <td className="px-5 py-3.5 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-5 py-3 border-t">
          <p className="text-xs text-muted-foreground">Showing {filtered.length} of {mockUsers.length} users</p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
            <span className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded-md">1</span>
            <button className="p-1.5 rounded-lg hover:bg-secondary"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
