import { getCredentials } from "../auth";

export function createBasicAuthorizationHeader(
  username: string,
  password: string
): string {
  return `Basic ${btoa(`${username}:${password}`)}`;
}

export function createJwtAuthorizationHeader(): String | null {
  return getCredentials()
}
