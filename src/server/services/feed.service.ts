import { XMLParser } from "fast-xml-parser";

import { prisma } from "../../server/db/client";
import { isURL } from "../../utils/url";

import { getUserById } from "./user.service";

export const createFeed = async ({ url, id }: { url: string; id: number }) => {
  const feed = await prisma.feed.upsert({
    where: { url },
    create: { url },
    update: { url },
  });

  const user = await getUserById({ id });

  if (!user) {
    return;
  }

  await prisma.userFeed.upsert({
    where: {
      userId_feedId: {
        userId: user.id,
        feedId: feed.id,
      },
    },
    create: {
      userId: user.id,
      feedId: feed.id,
    },
    update: {
      userId: user.id,
      feedId: feed.id,
    },
  });

  return feed;
};

export const getFeedsFromOPML = (content: string) => {
  try {
    const urls: string[] = [];
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeValueProcessor: (name, value) => {
        if (name === "xmlUrl" && isURL(value)) {
          urls.push(value);
        }
      },
    });

    parser.parse(content);

    return urls;
  } catch (err) {
    return [];
  }
};

export const getFeedByUrl = ({ url }: { url: string }) => {
  return prisma.feed.findUnique({ where: { url }, include: { users: true } });
};

export const getAllFeeds = () => {
  return prisma.feed.findMany();
};

export const deleteFeed = ({ url }: { url: string }) => {
  return prisma.feed.delete({ where: { url } });
};
