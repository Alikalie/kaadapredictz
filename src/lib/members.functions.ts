import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const moderateRoles = ["content_admin", "support_admin", "prediction_analyst"] as const;

async function assertSuperAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "super_admin" });
  if (error || !data) throw new Error("Super admin access required.");
}

export const listMembers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertSuperAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const db = supabaseAdmin as any;
    const [{ data: users }, { data: profiles }, { data: roles }, { data: subs }] = await Promise.all([
      supabaseAdmin.auth.admin.listUsers({ perPage: 1000 }),
      db.from("profiles").select("*"),
      db.from("user_roles").select("user_id, role"),
      db.from("vip_subscriptions").select("user_id, expires_at"),
    ]);
    return (users?.users ?? []).map((u) => {
      const p = (profiles ?? []).find((x: any) => x.id === u.id) ?? {};
      return {
        id: u.id,
        email: u.email ?? "",
        joined: u.created_at,
        full_name: (p.full_name as string | null) ?? null,
        phone: (p.phone as string | null) ?? null,
        country: (p.country as string | null) ?? null,
        roles: (roles ?? []).filter((r: any) => r.user_id === u.id).map((r: any) => String(r.role)),
        vip_expires_at: ((subs ?? []).find((s: any) => s.user_id === u.id)?.expires_at as string | undefined) ?? null,
      };
    });
  });

export const updateMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      id: z.string().uuid(),
      full_name: z.string().max(120).nullable(),
      phone: z.string().max(40).nullable(),
      country: z.string().max(80).nullable(),
      role: z.enum(["member", ...moderateRoles]),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertSuperAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const db = supabaseAdmin as any;
    const { error: pe } = await db.from("profiles").upsert({ id: data.id, full_name: data.full_name, phone: data.phone, country: data.country });
    if (pe) throw new Error(pe.message);
    const { data: isSuper } = await db.from("user_roles").select("id").eq("user_id", data.id).eq("role", "super_admin").maybeSingle();
    if (isSuper) throw new Error("Super admin roles cannot be changed here.");
    const { error: de } = await db.from("user_roles").delete().eq("user_id", data.id).in("role", moderateRoles as unknown as string[]);
    if (de) throw new Error(de.message);
    if (data.role !== "member") {
      const { error: ie } = await db.from("user_roles").insert({ user_id: data.id, role: data.role });
      if (ie) throw new Error(ie.message);
    }
    return { ok: true };
  });
