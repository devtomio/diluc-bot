FROM rust:slim-bullseye as base

WORKDIR /usr/src/app

ENV CI=true
ENV RUSTFLAGS="-C target-cpu=native"

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

RUN mkdir src && \
    echo "// blank" > src/lib.rs && \
    cargo build --release && \
    rm -r src

COPY src/ src/

RUN cargo build --release

FROM base as runner

COPY --from=builder /usr/src/app/target/release/diluc-bot /usr/local/bin/diluc-bot

ENTRYPOINT ["/usr/local/bin/diluc-bot"]
