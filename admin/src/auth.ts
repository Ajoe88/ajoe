import { EventEmitter } from "events";

export type Credentials = {
  username: string;
  password: string;
  accessToken: string;
};

const CREDENTIALS_LOCAL_STORAGE_ITEM =  "token"; //"credentials";

const eventEmitter = new EventEmitter();

export function isAuthenticated(): boolean {
  return Boolean(getCredentials());
}

export function listen(listener: (authenticated: boolean) => void): void {
  eventEmitter.on("change", () => {
    listener(isAuthenticated());
  });
}

export function setCredentials(credentials: Credentials) {
  localStorage.setItem(
    CREDENTIALS_LOCAL_STORAGE_ITEM,
    credentials.accessToken
  );
}

export function getCredentials(): String | null {
  const raw = localStorage.getItem(CREDENTIALS_LOCAL_STORAGE_ITEM);
  if (raw === null) {
    return null;
  }
  return raw;
}

export function removeCredentials(): void {
  localStorage.removeItem(CREDENTIALS_LOCAL_STORAGE_ITEM);
}
