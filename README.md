# TC Bloc Analysis Tool — Cloudflare Pages

Deploy this project to Cloudflare Pages. Authentication runs in Pages Functions, so no Render/Netlify server is required.

Environment variables: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`.

Cloudflare Pages gives an HTTPS `*.pages.dev` URL. For `tcblocanalysistool.com`, add the custom domain in Workers & Pages → your Pages project → Custom domains. For an apex domain, Cloudflare requires the domain to be a Cloudflare zone and its nameservers configured to Cloudflare.
