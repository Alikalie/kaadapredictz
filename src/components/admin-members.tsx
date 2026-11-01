import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listMembers, updateMember } from "@/lib/members.functions";

type Member = Awaited<ReturnType<typeof listMembers>>[number];
const roleLabels: Record<string, string> = {
  super_admin: "Super admin",
  content_admin: "Content admin",
  support_admin: "Support admin",
  prediction_analyst: "Predictions analyst",
};

function roleOf(m: Member) {
  if (m.roles.includes("super_admin")) return "super_admin";
  return m.roles.find((r: string) => r !== "super_admin") ?? "member";
}

export function AdminMembers({ search }: { search: string }) {
  const list = useServerFn(listMembers);
  const save = useServerFn(updateMember);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Member | null>(null);

  const load = async () => {
    setLoading(true);
    try { setMembers(await list()); setError(""); } catch (e) { setError((e as Error).message); }
    setLoading(false);
  };
  useEffect(() => { void load(); }, []);

  const q = search.toLowerCase();
  const rows = members.filter((m) => `${m.full_name ?? ""} ${m.email} ${m.country ?? ""}`.toLowerCase().includes(q));

  return (
    <div>
      <div className="mb-5">
        <h2 className="font-display text-2xl font-black">Members</h2>
        <p className="text-sm text-muted-foreground">{rows.length} accounts</p>
      </div>
      {error && <p role="alert" className="mb-5 border-l-2 border-destructive px-4 text-sm text-destructive">{error}</p>}
      {loading ? <p>Loading…</p> : (
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">VIP</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => {
                const vip = m.vip_expires_at && new Date(m.vip_expires_at) > new Date();
                const role = roleOf(m);
                return (
                  <tr key={m.id} className="border-t border-border">
                    <td className="px-4 py-4"><p className="font-bold">{m.full_name || "Unnamed"}</p><p className="text-xs text-muted-foreground">{m.email}</p></td>
                    <td className="px-4 py-4 text-muted-foreground">{m.phone || "—"}<br />{m.country || ""}</td>
                    <td className="px-4 py-4">
                      {vip ? <span className="text-primary font-bold">Active until {new Date(m.vip_expires_at!).toLocaleDateString()}</span>
                        : m.vip_expires_at ? <span className="text-muted-foreground">Expired</span> : <span className="text-muted-foreground">Free</span>}
                    </td>
                    <td className="px-4 py-4">{role === "member" ? "Member" : roleLabels[role]}</td>
                    <td className="px-4 py-4 text-right"><Button size="sm" variant="outline" onClick={() => setEditing(m)}>Edit</Button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit member</DialogTitle></DialogHeader>
          {editing && (
            <form className="grid gap-4" onSubmit={async (e) => {
              e.preventDefault();
              const d = new FormData(e.currentTarget);
              const v = (k: string) => (String(d.get(k) ?? "").trim() || null);
              try {
                await save({ data: { id: editing.id, full_name: v("full_name"), phone: v("phone"), country: v("country"), role: (String(d.get("role") ?? roleOf(editing))) as "member" } });
                setEditing(null); await load();
              } catch (err) { setError((err as Error).message); setEditing(null); }
            }}>
              <p className="text-sm text-muted-foreground">{editing.email}</p>
              <label className="grid gap-2 text-sm">Full name<Input name="full_name" defaultValue={editing.full_name ?? ""} /></label>
              <label className="grid gap-2 text-sm">Phone<Input name="phone" defaultValue={editing.phone ?? ""} /></label>
              <label className="grid gap-2 text-sm">Country<Input name="country" defaultValue={editing.country ?? ""} /></label>
              {roleOf(editing) === "super_admin" ? (
                <p className="text-sm">Role: <b>Super admin</b> (cannot be changed)</p>
              ) : (
                <label className="grid gap-2 text-sm">Role
                  <select name="role" defaultValue={roleOf(editing)} className="h-10 border border-input bg-background px-3">
                    <option value="member">Member</option>
                    <option value="content_admin">Content admin</option>
                    <option value="support_admin">Support admin</option>
                    <option value="prediction_analyst">Predictions analyst</option>
                  </select>
                </label>
              )}
              <Button type="submit">Save member</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
