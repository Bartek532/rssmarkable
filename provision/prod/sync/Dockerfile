FROM zenika/alpine-chrome:117-with-node

USER root

RUN apk add --update --no-cache openssl

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g corepack
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/sync/package.json ./apps/sync/

COPY packages/database/package.json ./packages/database/
COPY packages/config/package.json ./packages/config/
COPY packages/shared/package.json ./packages/shared/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build:sync && pnpm prune --prod

WORKDIR /app/apps/sync

EXPOSE 3001

CMD ["node", "dist/main"]
