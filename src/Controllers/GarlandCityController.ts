import { Request, Response } from "express";
import puppeteer from "puppeteer";
import { getAllPropertiesDetails, getAllUrl } from "../service/GarlandService";
import data from "../Info.json";
import fs from "fs/promises";
import path from "path";
export const garlandCityController = async (req: Request, res: Response) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const getAllStreetUrls = await getAllUrl(
      page,
      data.GarlandcityUrl,
      data.GarlendAllStreet
    );
    const links = [];
    for (const key of getAllStreetUrls) {
      const allPropertiesUrls = await getAllUrl(
        page,
        key,
        data.GarlandAllProperties
      );
      links.push(...allPropertiesUrls);
    }

    const finalData = [];
    for (const key of links) {
      const output = await getAllPropertiesDetails(
        page,
        key,
        data.propertyTitle,
        data.propertyValues
      );
      finalData.push(output);
    }

    await fs.writeFile(
      path.join(__dirname, "../data/city.json"),
      JSON.stringify(finalData)
    );
    console.log("done");
    await browser.close();
    res.send("getAllStreetUrls");
  } catch (error) {
    console.log(error);
  }
};
