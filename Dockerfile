FROM --platform=linux/arm64 node:20.10.0-alpine as builder
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm run build

FROM --platform=linux/arm64 node:20.10.0-alpine as runner
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/pnpm-lock.yaml .
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["pnpm", "run", "start"]