FROM duskmoon/cargo-chef:nightly AS chef
WORKDIR /app

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder
COPY --from=planner /app/recipe.json recipe.json
ENV LD_LIBRARY_PATH=/usr/local/lib:/usr/local/lib64

RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends build-essential lld libssl-dev pkg-config && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get autoremove

RUN cargo chef cook --release --recipe-path recipe.json
COPY . .

RUN cargo build --release --bin diluc-bot

FROM debian:buster-slim AS runtime
WORKDIR /app

COPY --from=builder /app/target/release/diluc-bot /usr/local/bin

ENTRYPOINT ["/usr/local/bin/diluc-bot"]
