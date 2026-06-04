#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/opt/hitc-chatbot
TARBALL=/tmp/hitc-chatbot.tgz

echo "==> [1/7] Base packages"
export DEBIAN_FRONTEND=noninteractive
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/tmp/nodesetup.log 2>&1
  apt-get install -y nodejs >/tmp/apt-node.log 2>&1
fi
command -v nginx >/dev/null 2>&1 || apt-get install -y nginx >/tmp/apt-nginx.log 2>&1
command -v pnpm >/dev/null 2>&1 || npm i -g pnpm >/tmp/npm-pnpm.log 2>&1
command -v pm2  >/dev/null 2>&1 || npm i -g pm2  >/tmp/npm-pm2.log 2>&1
echo "    node=$(node -v) pnpm=$(pnpm -v) pm2=$(pm2 -v) nginx=$(nginx -v 2>&1 | sed 's#.*/##')"

echo "==> [2/7] Extract code to $APP_DIR"
mkdir -p "$APP_DIR"
tar xzf "$TARBALL" -C "$APP_DIR"

echo "==> [3/7] Write .env.production"
cat > "$APP_DIR/.env.production" <<ENV
GOOGLE_GENERATIVE_AI_API_KEY=${GOOGLE_GENERATIVE_AI_API_KEY}
GOOGLE_MODEL=${GOOGLE_MODEL:-gemini-2.5-flash}
NODE_ENV=production
PORT=3000
ENV
chmod 600 "$APP_DIR/.env.production"

echo "==> [4/7] Install deps"
cd "$APP_DIR"
pnpm install --frozen-lockfile >/tmp/pnpm-install.log 2>&1 || pnpm install >/tmp/pnpm-install.log 2>&1

echo "==> [5/7] Build"
pnpm build >/tmp/pnpm-build.log 2>&1
echo "    build done"

echo "==> [6/7] PM2 start"
pm2 delete hitc-chatbot >/dev/null 2>&1 || true
pm2 start pnpm --name hitc-chatbot -- start
pm2 save >/dev/null 2>&1
pm2 startup systemd -u root --hp /root >/tmp/pm2-startup.log 2>&1 || true
sleep 3
curl -fsS -o /dev/null -w "    local app HTTP %{http_code}\n" http://127.0.0.1:3000/ || echo "    WARN app not responding yet"

echo "==> [7/7] Nginx reverse proxy"
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
nginx -t
systemctl enable nginx >/dev/null 2>&1 || true
systemctl restart nginx

if command -v ufw >/dev/null 2>&1 && ufw status 2>/dev/null | grep -q "Status: active"; then
  ufw allow 80/tcp >/dev/null 2>&1 || true
  ufw allow 22/tcp >/dev/null 2>&1 || true
fi

sleep 1
curl -fsS -o /dev/null -w "    via nginx :80 HTTP %{http_code}\n" http://127.0.0.1/ || echo "    WARN nginx proxy failed"
echo "==> DONE"
