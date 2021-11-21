FROM node

WORKDIR /diluc-bot
COPY ["package.json", "yarn.lock", ".yarnrc.yml", "tsconfig.base.json", "./"]

ADD .yarn /diluc-bot/.yarn
ADD scripts /diluc-bot/scripts
ADD src /diluc-bot/src

RUN yarn && yarn build

COPY . .

CMD ["yarn", "start"]
