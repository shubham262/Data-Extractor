import { Page } from "puppeteer";
import { ResponseObject } from "../types";

export const getAllUrl = async (
  page: Page,
  url: string,
  selector: string
): Promise<Array<string>> => {
  let allUrls = [] as Array<string>;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });
    allUrls = await page.$$eval(selector, (elements) => {
      return elements.map((el) => el.href);
    });

    return allUrls;
  } catch (error) {
    throw error;
  }
};

export const getAllPropertiesDetails = async (
  page: Page,
  url: any,
  titleSelector: string,
  valuesSelector: string
): Promise<ResponseObject> => {
  let data = {} as ResponseObject;
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 0 });

    const propertyTitle = await page.$$eval(titleSelector, (elements) => {
      return elements.map((el) => el.textContent);
    });

    const values = await page.$$eval(valuesSelector, (elements) => {
      return elements.map((el) => el.textContent);
    });

    for (let i = 0; i < propertyTitle?.length; i++) {
      data[propertyTitle[i]] = values[i];
    }
    return data;
  } catch (error) {
    console.log(error);
  }
  return data;
};
