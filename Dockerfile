FROM rust:slim-bullseye as base

WORKDIR /usr/src/app

ENV CI=true
ENV RUSTFLAGS="-C target-cpu=native"

RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends build-essential python3 curl dumb-init lld libssl-dev pkg-config openrc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get autoremove

RUN curl -fsSL https://tailscale.com/install.sh | sh

ENTRYPOINT ["dumb-init", "--"]

FROM base as builder

COPY Cargo.lock .
COPY Cargo.toml .

RUN mkdir src && \
    echo "// blank" > src/lib.rs && \
    cargo build --release && \
    rm -r src

COPY src/ src/
COPY start.sh .

RUN cargo build --release

FROM base as runner

COPY --from=builder /usr/src/app/target/release/diluc-bot /usr/local/bin/diluc-bot
COPY --from=builder /usr/src/app/start.sh .

# Permission Issues
RUN chmod +x ./start.sh

CMD ["./start.sh"]
