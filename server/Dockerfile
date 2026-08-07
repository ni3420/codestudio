FROM oven/bun:1

RUN apt-get update && apt-get install -y \
    g++ \
    python3 \
    nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json .
RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run", "index.ts"]