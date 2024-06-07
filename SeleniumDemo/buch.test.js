const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
});
afterAll(async () => {
    await driver.quit();
  });
  
test("sollte die bücher listen", async () => {
  await driver.get("http://books.toscrape.com/");
  const mystryButton = await driver.findElement(By.xpath('//*[@id="default"]/div/div/div/aside/div[2]/ul/li/ul/li[2]/a'))
    await mystryButton.click()

  let articles = await driver.findElements(By.css(".product_pod"));
  expect(articles.length).toBeGreaterThan(0);
  let mystryBooks = [];

  for (let article of articles) {
    let title = await article.findElement(By.css("h3 a")).getAttribute("title");
    let price = await article.findElement(By.css('.price_color')).getText();
    let stock = await article.findElement(By.xpath('/html/body/div/div/div/div/section/div[2]/ol/li[1]/article/div[2]/p[2]')).getText();
    mystryBooks.push({title,price,stock});

    fs.writeFileSync("mystryBucher.json", JSON.stringify(mystryBooks, null, 2));
  }
  const fictionButton = await driver.findElement(By.xpath('//*[@id="default"]/div/div/div/aside/div[2]/ul/li/ul/li[9]/a'))
  await fictionButton.click()
    articles = await driver.findElements(By.css(".product_pod"));
  let fictionBooks = [];

  for (let article of articles) {
    let title = await article.findElement(By.css("h3 a")).getAttribute("title");
    let price = await article.findElement(By.css('.price_color')).getText();
    let stock = await article.findElement(By.xpath('/html/body/div/div/div/div/section/div[2]/ol/li[1]/article/div[2]/p[2]')).getText();
    fictionBooks.push({title,price,stock});
    fs.writeFileSync("fictionBucher.json", JSON.stringify(fictionBooks, null, 2));
  }
  await driver.get("http://books.toscrape.com/");
  const travelButton = await driver.findElement(By.xpath('//*[@id="default"]/div/div/div/aside/div[2]/ul/li/ul/li[1]/a'))
  await travelButton.click()
  articles = await driver.findElements(By.css(".product_pod"));
  let travelBooks = [];

  for (let article of articles) {
    let title = await article.findElement(By.css("h3 a")).getAttribute("title");
    let price = await article.findElement(By.css('.price_color')).getText();
    let stock = await article.findElement(By.xpath('/html/body/div/div/div/div/section/div[2]/ol/li[1]/article/div[2]/p[2]')).getText();
    travelBooks.push({title,price,stock});
    fs.writeFileSync("travelBucher.json", JSON.stringify(travelBooks, null, 2));
  }

},60000);

















