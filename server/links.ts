import { randomBytes } from "crypto";
import { Link, Click } from "./models";

/**
 * Create a new link
 * @param url
 */
export async function createLink(url: string) {
  const count = await Link.count();
  const link = await Link.create({
    id: Math.floor(Math.random() * ((count + 1) * (1 << 16))).toString(36),
    url
  });
  return link.toJSON();
}

/**
 * Click a link
 * @param id
 * @param ip
 * @param referer
 * @param userAgent
 */

export async function click(
  id: string,
  ip?: string,
  referer?: string,
  userAgent?: string
): Promise<null | Link> {
  const link = await Link.findByPk(id);
  if (link === null) return null;
  Click.create({
    id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36),
    LinkId: id,
    ip,
    referer,
    userAgent
  });
  return link;
}

/**
 * returns all clicks of a link
 * @param LinkId
 */
export function clicks(LinkId: string): Promise<Click[]> {
  return Click.findAll({
    where: {
      LinkId
    }
  });
}

/**
 * Delete link and its click
 * @param id
 */
export async function removeLink(id: string): Promise<boolean> {
  const count = await Link.destroy({
    where: {
      id
    }
  });
  return count !== 0;
}
