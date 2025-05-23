# Container image that runs your code
# FROM alpine@sha256:a8560b36e8b8210634f77d9f7f9efd7ffa463e380b75e2e74aff4511df3ef88c
FROM node@sha256:ed0e340edf19b7014fd6b0a5f7048b73826b6ae6104132184243f9422b1e9957

# Set noninteractive mode untuk apt
ENV DEBIAN_FRONTEND=noninteractive

#
COPY package.json /package.json
COPY package-lock.json /package-lock.json

COPY bin/index.js /index.js
COPY bin/script.js /script.js
COPY bin/plugin.js /plugin.js

COPY bin/script.sh /script.sh
COPY bin/importgpg.sh /importgpg.sh
COPY bin/gpg-wrapper.sh /gpg-wrapper.sh

COPY setup.sh /setup.sh

#
RUN chmod +x /setup.sh
RUN /setup.sh

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["/index.js"]
