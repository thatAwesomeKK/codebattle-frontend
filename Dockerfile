# Builder stage
FROM node:20.10.0-alpine as builder
WORKDIR /usr/src/app

# Install bash (if needed)
RUN apk add --no-cache bash

# Install pnpm locally
RUN npm install -g pnpm@latest

# Set environment variable
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Runner stage
FROM node:20.10.0-alpine as runner
WORKDIR /usr/src/app

# Install pnpm globally in the runner stage (if needed)
RUN npm install -g pnpm@latest

# Copy necessary files from builder stage
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/pnpm-lock.yaml .
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next

# Expose the port on which the application will run
EXPOSE 3000

# Define the entry point to start the application
ENTRYPOINT ["pnpm", "run", "start"]
