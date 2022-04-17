tailscaled --tun=userspace-networking --socks5-server=localhost:1055 &

until tailscale up --authkey=${TAILSCALE_AUTHKEY} --hostname=railway-app --advertise-exit-node; do
    sleep 1
done

export ALL_PROXY=socks5://localhost:1055/

/usr/local/bin/diluc-bot
