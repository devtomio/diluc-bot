FROM node:17-bullseye-slim as base

WORKDIR /app
ARG DATABASE_URL

ENV HUSKY=0
ENV CI=true

RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends build-essential python3 dumb-init && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get autoremove

COPY yarn.lock .
COPY package.json .
COPY yarnrc.yml .
COPY .yarn/ .yarn/
COPY prisma/ prisma/

ENTRYPOINT ["dumb-init", "--"]

FROM base as builder

ENV NODE_ENV="development"

COPY tsconfig.base.json tsconfig.base.json
COPY tsup.config.ts .
COPY src/ src/
COPY prisma/ prisma/

RUN yarn install --immutable
RUN yarn run build
RUN yarn run db:generate

FROM base as runner

ENV NODE_OPTIONS="--enable-source-maps"

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

CMD ["yarn", "run", "start"]
