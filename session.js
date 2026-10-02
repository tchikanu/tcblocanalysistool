export async function onRequestGet({request,env}) {
  const c=(request.headers.get('Cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('tcbloc_session=')); const token=c?.slice(15); if(!token||!env.SESSION_SECRET)return Response.json({authenticated:false});
  try{const [p,s]=token.split('.'); const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(env.SESSION_SECRET),{name:'HMAC',hash:'SHA-256'},false,['verify']); const ok=await crypto.subtle.verify('HMAC',key,Uint8Array.from(atob(s),x=>x.charCodeAt(0)),new TextEncoder().encode(p)); const d=JSON.parse(atob(p)); return Response.json({authenticated:ok&&d.exp>Date.now(),email:ok?d.email:null})}catch{return Response.json({authenticated:false})}
}
