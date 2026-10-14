const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8'};
http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end('Bad Request'); return; }
  const safe = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '').replace(/^[/\\]+/, '');
  const file = path.resolve(root, safe || 'index.html');
  if (file !== root && !file.startsWith(root+path.sep)) {res.writeHead(403).end('Forbidden'); return;}
  fs.stat(file,(err,st)=>{
    if(err || !st.isFile()){res.writeHead(404).end('Not Found');return;}
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {'Content-Type':types[ext]||'application/octet-stream','Cache-Control':ext==='.html'?'no-cache':'public, max-age=86400'});
    fs.createReadStream(file).pipe(res);
  });
}).listen(Number(process.env.PORT)||8000,'0.0.0.0',()=>console.log('PyM Tech disponible en puerto '+(process.env.PORT||8000)));
