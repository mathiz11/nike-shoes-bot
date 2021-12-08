require("dotenv").config({ path: __dirname + "/.env" });
const puppeteer = require("puppeteer");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");

async function sendSignalPhotoMessage(message) {
  const form = new FormData();
  form.append("chat_id", process.env.SIGNAL_USER);
  form.append("photo", fs.createReadStream(process.env.SCREENSHOT_PATHNAME));
  form.append("caption", message);

  axios
    .post(
      `https://api.telegram.org/bot${process.env.SIGNAL_API_KEY}/sendPhoto`,
      form,
      {
        headers: form.getHeaders(),
      }
    )
    .then((res) => {
      console.log("Information : Confirmation sended.");
    })
    .catch((err) => console.error(err));
}

(async () => {
  const isFloatSize = process.env.SHOES_SIZE.includes(".");

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });

  const page = await browser.newPage();
  await page.goto(process.env.SHOES_URL);

  const rejectCookieButton = await page.$(
    `#gen-nav-commerce-header-v2 > div.pre-modal-window.is-active > div > div:nth-child(3) > div > div.mt5-sm.mb5-sm.mt2-md.mb7-md > div:nth-child(1) > div.ncss-col-sm-12.ncss-col-md-6.mt3-sm > button`
  );
  if (rejectCookieButton) await rejectCookieButton.click();

  await page.screenshot({ path: process.env.SCREENSHOT_PATHNAME });

  const allShoesSizes = await page.$$(
    process.env.ALL_SHOES_SIZE_CONTAINER_CLASS
  );

  let selectedShoesSize;
  for (const sizeContainer of allShoesSizes) {
    const size = await sizeContainer.evaluate((s) => s.lastChild.textContent);
    if (
      size.includes(process.env.SHOES_SIZE) &&
      (isFloatSize || (!isFloatSize && !size.includes(".")))
    ) {
      selectedShoesSize = sizeContainer;
    }
  }

  if (selectedShoesSize) {
    if (!(await selectedShoesSize.$("input:disabled"))) {
      sendSignalPhotoMessage(
        `Votre paire est maintenant disponible en ${process.env.SHOES_SIZE} ! 🏃\n${process.env.SHOES_URL}`
      );
    }
    // } else {
    //   sendSignalPhotoMessage("Votre paire n'est pas encore disponible... 😢");
    // }
  } else {
    sendSignalPhotoMessage("Un problème est survenu. ❌");
  }

  await browser.close();
})();
