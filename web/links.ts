const LINK_STORAGE_KEY = "links";

export type Click = {
  id: string;
  ip?: string;
  linkId: string;
  referer?: string;
  userAgent?: string;
  createdAt: Date;
};

export type Link = {
  id: string;
  url: string;
  createdAt: Date;
};

let links: Link[] = [];
let subscriptions: Callback[] = [];

type Callback = (links: Link[]) => void;
type Unsubscribe = () => void;

export function subscribe(cb: Callback): Unsubscribe {
  subscriptions = [...subscriptions, cb];
  cb(links);
  return () => {
    subscriptions = subscriptions.filter(item => item === cb);
  };
}

export async function createLink(url: string): Promise<Link> {
  const response = await fetch("/api/link", {
    method: "post",
    body: JSON.stringify({ url: url }),
    headers: {
      "content-type": "application/json"
    }
  });
  const json = await response.json();
  const link: Link = {
    id: json.id,
    url: json.url,
    createdAt: new Date(json.createdAt)
  };
  updateLinks([...links, link]);
  return link;
}

function updateLinks(nextLinks: Link[]) {
  links = nextLinks;
  localStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(links));
  subscriptions.forEach(cb => cb(links));
}

export async function clicks(id: string): Promise<Click[]> {
  const data = await (await fetch(`/api/link/${id}/clicks`)).json();
  data.forEach((item: Click) => {
    item.createdAt = new Date(item.createdAt);
  });
  return data;
}

export function init() {
  const data = localStorage.getItem(LINK_STORAGE_KEY);
  if (data === null) return;
  updateLinks(JSON.parse(data));
}

export async function remove(id: string): Promise<boolean> {
  const response = await fetch(`/links/${id}`, { method: "delete" });
  const removed = response.status === 200;
  if (removed) {
    updateLinks(links.filter(link => link.id !== id));
  }
  return removed;
}
