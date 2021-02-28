FROM node@sha256:bef791f512bb4c3051a1210d7fbd58206538f41eea9b966031abc8a7453308fe as base

# ENV NODE_ENV=production
# Define how verbose should npm install be
ARG NPM_LOG_LEVEL=verbose
# Hide Open Collective message from install logs
ENV OPENCOLLECTIVE_HIDE=1
# Hiden NPM security message from install logs
ENV NPM_CONFIG_AUDIT=false
# Hide NPM funding message from install logs
ENV NPM_CONFIG_FUND=false

RUN apk update && apk add python make g++ automake libtool && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

# Update npm to version 7
# RUN npm config set registry https://registry.npm.taobao.org
RUN npm i -g npm@7.3.0

COPY server/package*.json  ./server/
COPY admin/package*.json  ./admin/

# Install dependencies
# SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/
RUN cd admin; npm ci --loglevel=$NPM_LOG_LEVEL;
RUN cd server; npm ci --loglevel=$NPM_LOG_LEVEL;

COPY . .

# Generate Prisma client
RUN cd server; npm run prisma:generate;

RUN set -e; (cd server; npm run build)
RUN set -e; (cd admin; npm run build)

FROM base as production

# Set the working direcotry
WORKDIR /app
# Copy all the files

COPY --from=base /usr/src/app/ .


# Expose the port the server listens to
EXPOSE 3000

# Make server to serve admin built files
ENV SERVE_STATIC_ROOT_PATH=../admin/build

WORKDIR /app/server/
# Run server
CMD [ "node", "dist/src/main"]                                                                                           53        53,1          All