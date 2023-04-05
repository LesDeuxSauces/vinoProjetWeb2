
import puppeteer from "puppeteer";
import fetch from "node-fetch";


/**
 * Extrait les informations sur les bouteilles de vin en parcourant les pages du site de la SAQ et les stocke dans un tableau.
 * @param {number} a - La page de départ pour l'extraction des données.
 * @param {number} b - La page finale pour l'extraction des données.
 * @returns {Promise<void>} Une promesse qui se résout une fois que toutes les données ont été extraites.
 */

async function main(a, b) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const allProduits = [];
    for (let i = a; i <= b; i++) {
        let urls = 'https://www.saq.com/fr/produits/vin?p=' + i + '&product_list_limit=96';
        await page.goto(urls);
        await page.waitForSelector('#maincontent > div > div.column.main > div.products.wrapper.grid.products-grid > ol > li')
        const produits = await page.evaluate(() => {
            const produits = document.querySelectorAll('#maincontent > div > div.column.main > div.products.wrapper.grid.products-grid > ol > li');
            return Array.from(produits).map((produit, i) => {
                const regexNumero = /[0-9]/;
                const nom = produit.querySelector('.product-item-link').innerText.replace(/\d+$/, "").trim();
                const format = produit.querySelector('strong.product.product-item-identity-format > span').innerText.split(' | ')[1].trim().split(' ')[0];
                const prix = produit.querySelector('.price').innerText.split(' ')[0].slice(0, -2).replace(',', '.');
                const code_saq = produit.querySelector('.saq-code > span:nth-child(2)').innerText;
                const url_saq = produit.querySelector('.product-item-link').href;
                const pays = produit.querySelector('strong.product.product-item-identity-format > span').innerText.split(' | ')[2].trim();
                const type = produit.querySelector('strong.product.product-item-identity-format > span').innerText.split(' | ')[0].split(' ')[1];
                const url_img = produit.querySelector('.product-image-photo').src;
                const anneeVin = produit.querySelector('.product-item-link').innerText.split(' ').pop();
                const annee = regexNumero.test(anneeVin) ? anneeVin : "";

                return { nom, format, prix, annee, code_saq, url_saq, url_img, pays, type }

            });
        });
        allProduits.push(...produits); // ajoute à chaque fois dans la variable allProduits le  produits qu'il vient de balayer

    }
   
    await browser.close();
    console.log(JSON.stringify(allProduits));


}


main(1,83);

