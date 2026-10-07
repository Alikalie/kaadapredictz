<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use a shared public data module for public pages and protected server functions for CMS writes, keeping all routes independently indexable.
- Parent content routes render Outlet for category/article children, so direct navigation and typed links resolve independently.
- Member accounts use immediate email/password activation; profile data and VIP requests remain owner-scoped through authenticated server functions.
- Admin management uses server-verified user_roles and protected server functions; client state never grants admin access.
