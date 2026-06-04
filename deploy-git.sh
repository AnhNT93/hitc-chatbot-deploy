#!/usr/bin/env bash
# Run from inside the cloned repo. Requires GOOGLE_GENERATIVE_AI_API_KEY in env.
set -euo pipefail
APP_DIR="$(pwd)"

echo "==> [1/6] Base packages"
export DEBIAN_FRONTEND=noninteractive
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/tmp/nodesetup.log 2>&1
  apt-get install -y nodejs >/tmp/apt-node.log 2>&1
fi
command -v nginx >/dev/null 2>&1 || apt-get install -y nginx >/tmp/apt-nginx.log 2>&1
command -v pnpm >/dev/null 2>&1 || npm i -g pnpm >/tmp/npm-pnpm.log 2>&1
command -v pm2  >/dev/null 2>&1 || npm i -g pm2  >/tmp/npm-pm2.log 2>&1
echo "    node=$(node -v) pnpm=$(pnpm -v) pm2=$(pm2 -v)"

echo "==> [2/6] Write .env.production"
: "${GOOGLE_GENERATIVE_AI_API_KEY:?Set GOOGLE_GENERATIVE_AI_API_KEY before running}"
cat > "$APP_DIR/.env.production" <<ENV
GOOGLE_GENERATIVE_AI_API_KEY=${GOOGLE_GENERATIVE_AI_API_KEY}
GOOGLE_MODEL=${GOOGLE_MODEL:-gemini-2.5-flash}
NODE_ENV=production
PORT=3000
ENV
chmod 600 "$APP_DIR/.env.production"

echo "==> [3/6] Install deps"
pnpm install --frozen-lockfile >/tmp/pnpm-install.log 2>&1 || pnpm install >/tmp/pnpm-install.log 2>&1

echo "==> [4/6] Build"
pnpm build >/tmp/pnpm-build.log 2>&1
echo "    build done"

echo "==> [5/6] PM2 start"
pm2 delete hitc-chatbot >/dev/null 2>&1 || true
pm2 start pnpm --name hitc-chatbot --cwd "$APP_DIR" -- start
pm2 save >/dev/null 2>&1
pm2 startup systemd -u root --hp /root >/tmp/pm2-startup.log 2>&1 || true
sleep 3
curl -fsS -o /dev/null -w "    local app HTTP %{http_code}\n" http://127.0.0.1:3000/ || echo "    WARN app not up yet (see: pm2 logs hitc-chatbot)"

echo "==> [6/6] Nginx reverse proxy :80 -> :3000"
cat > /etc/nginx/sites-available/hitc-chatbot <<'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_buffering off;
    }
}
NGINX
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/hitc-chatbot /etc/nginx/sites-enabled/hitc-chatbot
nginx -t && systemctl enable nginx >/dev/null 2>&1 && systemctl restart nginx
sleep 1
curl -fsS -o /dev/null -w "    via nginx :80 HTTP %{http_code}\n" http://127.0.0.1/ || echo "    WARN nginx proxy failed"
echo "==> DONE — http://103.17.140.71/"
