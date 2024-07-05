FROM --platform=linux/arm64 node:20.10.0-alpine as builder
WORKDIR /usr/src/app

RUN apk add --no-cache bash
RUN npm install -g pnpm && pnpm --version

ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY . .
RUN pnpm run build

FROM --platform=linux/arm64 node:20.10.0-alpine as runner
RUN npm install -g pnpm && pnpm --version
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/pnpm-lock.yaml .
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["pnpm", "run", "start"]