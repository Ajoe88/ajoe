# By default, use node 14.15.3 as the base image 
ARG IMAGE=node@sha256:bef791f512bb4c3051a1210d7fbd58206538f41eea9b966031abc8a7453308fe

FROM $IMAGE

# ENV NODE_ENV=production
# Define how verbose should npm install be
ARG NPM_LOG_LEVEL=verbose
# Hide Open Collective message from install logs
ENV OPENCOLLECTIVE_HIDE=1
# Hiden NPM security message from install logs
ENV NPM_CONFIG_AUDIT=false
# Hide NPM funding message from install logs
ENV NPM_CONFIG_FUND=false

RUN apk add python make gcc g++

# Update npm to version 7
RUN npm i -g npm@7.3.0

# Set the working direcotry
WORKDIR /app

#install shared part
#COPY admin/package*.json  ./shared/
#RUN  cd shared; npm i react@17.0.1 react-dom@17.0.1 formik@2.2.5;

# Copy files specifiying dependencies
#RUN rm shared/package*.json
#RUN cp -R shared/ ./server/
#RUN cp -R shared/ ./admin/

COPY server/package*.json  ./server/
COPY admin/package*.json  ./admin/

# Install dependencies
RUN cd server; npm ci --loglevel=$NPM_LOG_LEVEL;
RUN cd admin; npm ci --loglevel=$NPM_LOG_LEVEL;

# Copy Prisma schema
COPY server/prisma/schema.prisma ./server/prisma/

# Generate Prisma client
RUN cd server; npm run prisma:generate;

# Copy all the files
COPY . .

# Build code
RUN set -e; (cd server; npm run build) 
RUN set -e; (cd admin; npm run build)
# Expose the port the server listens to
EXPOSE 3000

# Make server to serve admin built files
ENV SERVE_STATIC_ROOT_PATH=admin/build

WORKDIR /app/server
# Run server
CMD [ "node", "./dist/src/main.js"]