export async function onRequestPost({request,env}) {
  const email=String(env.ADMIN_EMAIL||'').trim().toLowerCase(); const password=String(env.ADMIN_PASSWORD||''); const secret=String(env.SESSION_SECRET||'');
  if(!email||!password||!secret) return Response.json({error:'Authentication is not configured.'},{status:500});
  let b; try{b=await request.json()}catch{return Response.json({error:'Invalid request.'},{status:400})}
  if(String(b.email||'').trim().toLowerCase()!==email || String(b.password||'')!==password) return Response.json({error:'Invalid email or password.'},{status:401});
  const payload=btoa(JSON.stringify({email,exp:Date.now()+43200000}));
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const sig=btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(payload)))));
  return new Response(JSON.stringify({ok:true}),{headers:{'Content-Type':'application/json','Set-Cookie':`tcbloc_session=${payload}.${sig}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=43200`}});
}
