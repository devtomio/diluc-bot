FROM rust:slim-bullseye as base

WORKDIR /usr/src/app

ENV CI=true

RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends build-essential python3 dumb-init lld libssl-dev pkg-config && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get autoremove

ENTRYPOINT ["dumb-init", "--"]

FROM base as builder

COPY Cargo.lock .
COPY Cargo.toml .
COPY redis/ redis/
COPY src/ src/

RUN cargo install --path .

FROM base as runner

COPY --from=builder /usr/src/app/redis ./redis
COPY --from=builder /usr/local/cargo/bin/diluc-bot /usr/local/bin/diluc-bot

ENTRYPOINT ["/usr/local/bin/diluc-bot"]
