# Container image that runs your code
# FROM alpine@sha256:a8560b36e8b8210634f77d9f7f9efd7ffa463e380b75e2e74aff4511df3ef88c
FROM node@sha256:ed0e340edf19b7014fd6b0a5f7048b73826b6ae6104132184243f9422b1e9957

# Set noninteractive mode untuk apt
ENV DEBIAN_FRONTEND=noninteractive

#
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y --no-install-recommends git gnupg
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#
RUN git config --global --add safe.directory /github/workspace

#
COPY package.json /package.json
COPY package-lock.json /package-lock.json
COPY config.js /config.js
COPY index.js /index.js

#
RUN npm ci

#
RUN chmod +x /index.js

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["/index.js"]
