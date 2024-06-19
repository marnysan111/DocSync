FROM oven/bun:latest

# RUN bun install
WORKDIR /usr/src/app

COPY ./app/package.json /usr/src/app
COPY ./app/bun.lockb /usr/src/app

RUN bun install
# Set the entrypoint
CMD ["bun", "run", "dev"]
