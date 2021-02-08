# By default, use node 14.15.3 as the base image
ARG IMAGE=node@sha256:bef791f512bb4c3051a1210d7fbd58206538f41eea9b966031abc8a7453308fe

FROM $IMAGE as base

# help us to install and build all dependencies in a separate container
FROM base as development

WORKDIR /app
# Update npm to version 7
RUN npm i -g npm@7.5.2

# Copy package.json package-lock.json files to specifiying directory
COPY server/package*.json ./server/
COPY admin/package*.json ./admin/

RUN npm config set registry https://registry.npm.taobao.org;
# Install dependencies
RUN cd server; npm ci --only=development;
RUN cd admin; npm ci --only=development;

# Copy Prisma schema
COPY server/prisma/schema.prisma ./server/prisma/
# Generate Prisma client
RUN cd server; npm run prisma:generate;

COPY . .

RUN set -e; (cd server; npm run build) 
RUN set -e; (cd admin; npm run build)

FROM base as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working direcotry
WORKDIR /app

# Copy package.json package-lock.json files to specifiying directory
COPY server/package*.json server/
COPY admin/package*.json admin/

# Install dependencies
RUN cd server; npm i --only=production;
RUN cd admin; npm i --only=production;

# Copy all the files
COPY . .

COPY --from=development /app/admin/build app/
COPY --from=development /app/server/dist server/

# Expose the port the server listens to
EXPOSE 3000

# Make server to serve admin built files
ENV SERVE_STATIC_ROOT_PATH=admin/build

# Run server
CMD [ "node", "server/dist/main"]