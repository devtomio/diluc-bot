# ================ #
#    Base Stage    #
# ================ #

FROM node:17-bullseye-slim as base

WORKDIR /usr/src/app

ENV HUSKY=0
ENV CI=true

RUN apt-get update && \
    apt-get upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends build-essential python3 dumb-init && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get autoremove

COPY --chown=node:node yarn.lock .
COPY --chown=node:node package.json .
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node .yarn/ .yarn/

ENTRYPOINT ["dumb-init", "--"]

# ================ #
#   Builder Stage  #
# ================ #

FROM base as builder

ENV NODE_ENV="development"

COPY --chown=node:node tsconfig.base.json tsconfig.base.json
COPY --chown=node:node tsup.config.ts .
COPY --chown=node:node src/ src/
COPY --chown=node:node prisma/ prisma/

RUN yarn install --immutable
RUN yarn run build

# ================ #
#   Runner Stage   #
# ================ #

FROM base AS runner

ENV NODE_OPTIONS="--enable-source-maps"

COPY --chown=node:node --from=builder /usr/src/app/dist dist
COPY --chown=node:node --from=builder /usr/src/app/prisma prisma

RUN yarn workspaces focus --all
RUN chown node:node /usr/src/app/
RUN chown node:node /usr/src/app/node_modules/.prisma

USER node

CMD [ "yarn", "run", "start" ]
