import express from "express";
import puppeteer from "puppeteer";

const url = "https://www.goodreturns.in/petrol-price-in-assam-s4.html";

export const getPetrolPrice = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    let status = await page.goto(url, { timeout: 0 });
    if (status?.status() !== 404) {
      page.setDefaultNavigationTimeout(0);
      const tableData = await page.evaluate(() => {
        const allRows = Array.from(
          document.querySelectorAll(".gold_silver_table table tbody tr")
        );
        const data: Record<string, string>[] = [];
        for (let i = 1; i < allRows.length; i++) {
          const allColumnValues = Array.from(allRows[i].querySelectorAll("td"));
          const city = allColumnValues[0]?.querySelector("a")
            ?.innerHTML as string;
          const todayPrice = allColumnValues[1].innerHTML;
          const yesterdayPrice = allColumnValues[2].innerHTML;

          data.push({
            city,
            todayPrice,
            yesterdayPrice,
          });
        }
        return data;
      });
      await browser.close();
      return res.status(200).json({ data: tableData });
    } else {
      await browser.close();
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  } catch (err) {
    console.log("getPetrolPrice", err);
    return res.status(501);
  }
};
