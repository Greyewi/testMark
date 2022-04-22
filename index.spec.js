const puppeteer = require('puppeteer');
const path = require('path')
jest.setTimeout(1_600_000)

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const COUNT_ITERATION = 5

describe('cardValid', () => {
  let browser = null;
  let page = null;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // show gui
      slowMo: 150,
      devtools: false, // show devTools
    });
    page = await browser.newPage();
  })

  afterAll(async () => {
    await browser.close();
  });

  it('test', async () => {

    for(let i = 0; i < COUNT_ITERATION; i++){
      try {
        await page.goto('https://ru.surveymonkey.com/r/TN7T2QP')
        const random = randomNumber(0, 1)
        if (random) {
          const number = await page.$('span[data-position="6"]')
          await number.click()
        } else {
          const number = await page.$('span[data-position="9"]')
          await number.click()
        }
        const btn = await page.$(".btn.small.done-button.survey-page-button.user-generated.notranslate")
        await btn.click()
      } catch(e) {
        console.log(e)
      }
    }
  })
})
 