/**
 * Sentire by PC - IndexNow Protocol Integration (Bing, Yandex, Seznam, Naver)
 * Programmatically notifies search engines when canonical URLs are created, updated, or retired.
 */

export const INDEXNOW_KEY = "c7e48b39401b4424a1b0288f3478912e";
export const INDEXNOW_KEY_LOCATION = "https://sentirebypc.com/c7e48b39401b4424a1b0288f3478912e.txt";
export const PRODUCTION_HOST = "sentirebypc.com";

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

/**
 * Submits an array of canonical URLs to the IndexNow API.
 */
export async function submitToIndexNow(urlList: string[]): Promise<{ success: boolean; status?: number; error?: string }> {
  const payload: IndexNowPayload = {
    host: PRODUCTION_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urlList.map((u) => (u.startsWith("http") ? u : `https://${PRODUCTION_HOST}${u}`)),
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return {
      success: response.ok || response.status === 200 || response.status === 202,
      status: response.status,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
}
