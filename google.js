const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

let driver;

Given('que estoy en la página principal de Google', async function () {
  try {
    driver = new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({ implicit: 20000 }); // Aumentar el tiempo de espera implícito a 20 segundos
    await driver.get('https://www.google.com');
  } catch (error) {
    console.error('Error en Given:', error);
    if (driver) await driver.quit();
    throw error;
  }
});

When('busco {string}', async function (searchTerm) {
  try {
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys(searchTerm);
    await searchBox.submit();
  } catch (error) {
    console.error('Error en When:', error);
    if (driver) await driver.quit();
    throw error;
  }
});

Then('debería ver resultados relacionados con {string}', async function (expectedTerm) {
  try {
    await driver.wait(until.titleContains(expectedTerm), 20000); // Aumentar el tiempo de espera a 20 segundos
    const title = await driver.getTitle();
    console.log('Título de la página:', title);
    assert(title.includes(expectedTerm), `El título de la página es '${title}', pero debería contener '${expectedTerm}'`);
  } catch (error) {
    console.error('Error en Then:', error);
    if (driver) await driver.quit();
    throw error;
  } finally {
    if (driver) await driver.quit();
  }
});
