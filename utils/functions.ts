import { HTTP_Response } from "./response";
import { expect, request } from "@playwright/test";
import { APP_VERSION, BASE_URL } from "../playwright.config";

export class ApiRequests {
  public static async GetResponse(api_end_point: string) {
    try {
      const context = await request.newContext({
        baseURL: BASE_URL,
      });
      const response = await context.get(`/${api_end_point}`);
      expect(response.status()).toBe(HTTP_Response.okResponse);
      expect(response.ok()).toBeTruthy();
      const res = await response.json();
      return JSON.parse(JSON.stringify(res, null, 2));
    } catch (e) {
      console.log(`[HTTP Get] Exception occurred :: ${e}`);
    }
  }
  public static async NegativeGetResponse(api_end_point: string) {
    try {
      const context = await request.newContext({
        baseURL: BASE_URL,
      });
      const response = await context.get(`/${api_end_point}`);
      expect(response.status()).toBe(HTTP_Response.notFound);
      expect(response.ok()).toBeFalsy();
      const res = await response.json();
      return JSON.parse(JSON.stringify(res, null, 2));
    } catch (e) {
      console.log(`[HTTP Get Negative] Exception occurred :: ${e}`);
    }
  }

  public static async PostResponse(api_end_point: string, payload: any) {
    try {
      const context = await request.newContext({
        baseURL: BASE_URL,
      });
      const response = await context.post(`/${api_end_point}`, {
        headers: {},
        data: payload,
      });
      expect(response.status()).toBe(HTTP_Response.recordCreated);
      expect(response.ok()).toBeTruthy();
      const res = await response.json();
      return JSON.parse(JSON.stringify(res, null, 2));
    } catch (e) {
      console.log(`[HTTP Post] Exception occurred :: ${e}`);
    }
  }

  public static async PostEmptyResponse(api_end_point: string) {
    try {
      const context = await request.newContext({
        baseURL: BASE_URL,
      });
      const response = await context.post(`/${api_end_point}`, {
        headers: {},
      });
      expect(response.status()).toBe(HTTP_Response.recordCreated);
      expect(response.ok()).toBeTruthy();
      const res = await response.json();
      return JSON.parse(JSON.stringify(res, null, 2));
    } catch (e) {
      console.log(`[HTTP Post Empty] Exception occurred :: ${e}`);
    }
  }

  public static async PutResponse(api_end_point: string, payload) {
    try {
      const context = await request.newContext({
        baseURL: BASE_URL,
      });
      const response = await context.put(`/${api_end_point}`, {
        headers: {},
        data: payload,
      });
      expect(response.status()).toBe(HTTP_Response.okResponse);
      expect.soft(response.statusText()).not.toBe("Error");
      expect.soft(response.ok()).toBeTruthy();
      expect.soft(response.status()).toBeGreaterThanOrEqual(200);
      const res = await response.json();
      return JSON.parse(JSON.stringify(res, null, 2));
    } catch (e) {
      console.log(`[HTTP Put] Exception occurred :: ${e}`);
    }
  }

  public static async PutEmptyResponse(api_end_point: string) {
    try {
      const context = await request.newContext({
        baseURL: BASE_URL,
      });
      const response = await context.put(`/${api_end_point}`, {
        headers: {},
      });
      expect(response.status()).toBe(HTTP_Response.okResponse);
      expect.soft(response.statusText()).not.toBe("Error");
      expect.soft(response.ok()).toBeTruthy();
      expect.soft(response.status()).toBeGreaterThanOrEqual(200);
      const res = await response.json();
      return JSON.parse(JSON.stringify(res, null, 2));
    } catch (e) {
      console.log(
        `[HTTP Put Empty] Exception occurred :: ${JSON.stringify(e, null, 2)}`
      );
    }
  }

  public static async DeleteResponse(api_end_point: string) {
    const context = await request.newContext({
      baseURL: BASE_URL,
    });
    const response = await context.delete(`/${api_end_point}`, {
      headers: {},
    });

    // Check if the status code is 204 (No Content) to determine if there's no JSON response.
    if (response.status() === HTTP_Response.deleteContent) {
      expect(response.status()).toBe(HTTP_Response.deleteContent);
      expect.soft(response.statusText()).not.toBe("Error");
      expect.soft(response.ok()).toBeTruthy();
      return; // Return nothing if there's no content in the response.
    } else {
      // If the status code is not 204, assume there's a JSON response and parse and return it.
      expect(response.status()).toBe(HTTP_Response.okResponse);
      expect.soft(response.statusText()).not.toBe("Error");
      expect.soft(response.ok()).toBeTruthy();

      const res = await response.json();
      return res; // Return the parsed JSON response.
    }
  }
}

export class Misc {
  public static async explicit_wait(ms: number): Promise<void> {
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));
    await sleep(ms);
  }
}
