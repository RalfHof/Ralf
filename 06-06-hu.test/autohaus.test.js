const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs")

beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });
  
  test("Preis und Titel vom Porsche-911", async () => {

    await driver.get("https://www.porsche-karlsruhe.de/")
    const akzeptierenButton = await driver.findElement(By.xpath('//*[@id="pwa-consent-layer-accept-all-button"]/span'))
    await akzeptierenButton.click()

    const suchFeld = await driver.findElement(By.id("search-form"))
    await suchFeld.sendKeys("Porsche-911")

    const suchButton = await driver.findElement(By.xpath('//html/body/main/div/div[3]/aside/button'))
    await suchButton.click()

    await driver.wait(until.elementLocated(By.xpath('//*[@id="main"]/div[1]')),10000)
    const title = await driver.findElement(By.xpath('////*[@id="main-content"]/div[1]/div/div[2]/div[1]/h1')).getText()
    const price = await driver.findElement(By.xpath('/html/body/main/div/div[1]/h1/span[2]')).getText()
    
    let ps5Liste = []
    ps5Liste.push({title,price})
    fs.writeFileSync("porsche-karlsruhe.json", JSON.stringify(ps5Liste, null, 2))
    
    expect(title).toBe("porsche-911")
    expect(price).toBe("60.000,– €")
  }, 30000)
