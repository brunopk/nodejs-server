ARG BUILD_FROM
FROM $BUILD_FROM

# Install requirements for add-on
RUN \
  apk add --no-cache \
    nodejs npm

# Copy data for add-on
COPY run.sh /
COPY src/ /dist
COPY .env.production /dist
COPY package.json /dist
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]