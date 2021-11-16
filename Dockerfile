FROM node

WORKDIR /diluc-bot
COPY . .

RUN yarn && yarn tsc -b src

CMD ["yarn", "start"]
