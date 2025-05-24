FROM node@sha256:ed0e340edf19b7014fd6b0a5f7048b73826b6ae6104132184243f9422b1e9957

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /action

COPY \
  plugins/sign-tag/index.js \
  @mnrendra/semantic-release-plugin-publish-github-action/index.js

COPY \
  package.json \
  package-lock.json \
  dist/index.js \
  .

RUN \
  ls -laihs && \
  ls -laihs /action && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
    ca-certificates \
    git \
    gnupg \
  && \
  npm ci --production --silent && \
  npm cache clean --force && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* ~/.npm/_cacache

ENTRYPOINT ["node", "/action/dist/index.js"]
