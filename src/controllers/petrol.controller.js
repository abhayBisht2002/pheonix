"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPetrolPrice = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = "https://www.goodreturns.in/petrol-price-in-assam-s4.html";
const getPetrolPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const browser = yield puppeteer_1.default.launch({ headless: false });
        const page = yield browser.newPage();
        let status = yield page.goto(url, { timeout: 0 });
        if ((status === null || status === void 0 ? void 0 : status.status()) !== 404) {
            page.setDefaultNavigationTimeout(0);
            const tableData = yield page.evaluate(() => {
                var _a, _b;
                const allRows = Array.from(document.querySelectorAll(".gold_silver_table table tbody tr"));
                const data = [];
                for (let i = 1; i < allRows.length; i++) {
                    const allColumnValues = Array.from(allRows[i].querySelectorAll("td"));
                    const city = (_b = (_a = allColumnValues[0]) === null || _a === void 0 ? void 0 : _a.querySelector("a")) === null || _b === void 0 ? void 0 : _b.innerHTML;
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
            yield browser.close();
            return res.status(200).json({ data: tableData });
        }
        else {
            yield browser.close();
            return res.status(400).json({
                message: "Something went wrong",
            });
        }
    }
    catch (err) {
        console.log("getPetrolPrice", err);
        return res.status(501);
    }
});
exports.getPetrolPrice = getPetrolPrice;
