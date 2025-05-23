FROM node@sha256:ed0e340edf19b7014fd6b0a5f7048b73826b6ae6104132184243f9422b1e9957

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /action

COPY \
  ./plugins/sign-tag/index.js \
  ./@mnrendra/semantic-release-plugin-publish-github-action/index.js

COPY \
  ./dist/index.js \
  ./index.js

COPY \
  ./clean-package.config.json \
  ./package.json \
  ./

RUN \
  apt-get update -qq >/dev/null && \
  apt-get install -y --no-install-recommends -qq git gnupg ca-certificates >/dev/null && \
  npx clean-package && \
  npm install && \
  npm cache clean --force && \
  npm cache verify && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# ENV NODE_PATH=/action/node_modules

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["node", "/action/index.js"]
