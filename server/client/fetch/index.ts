export default function ajax<T>(url: string, body: object): Promise<T> {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json; charset=utf-8");
  return fetch(url, {
    headers,
    // method: "POST",
    credentials: "include",
    mode: "cors",
    body: JSON.stringify(body),
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}
