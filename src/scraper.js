import puppeteer from 'puppeteer';

export async function scrapeWebsite(url) {
    try {

        const browser = await puppeteer.launch({
            headless: true, // Assegura que o navegador não tenta abrir uma interface gráfica
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Estas opções são frequentemente necessárias em ambientes de servidor
        });
        const page = await browser.newPage();

        const username = 'P2265468'

        const password = 'MY315'

        await page.goto(url);

        await page.type('#control_40', username);

        await page.type('#control_42', password);

        await page.click('#control_51');

        // Espera que a navegação pós-login aconteça
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        await new Promise(resolve => setTimeout(resolve, 5000));
        // Espera até que o botão com id "control_80" apareça
        await page.waitForSelector('#control_54');
        await page.click('#control_54');
        // Espera 2 segundos
        await new Promise(resolve => setTimeout(resolve, 5000));

        await page.click('#imprimir a'); // Clica na tag <a> dentro da div "imprimir"

        // Espera pela nova aba
        const newPagePromise = new Promise(resolve => browser.once('targetcreated', target => resolve(target.page())));
        const newPage = await newPagePromise;

        // Espera a nova página carregar (ajuste conforme necessário)
        await newPage.waitForNavigation({ waitUntil: 'networkidle2' });

        // Obtém o link do PDF gerado
        const pdfLink = newPage.url(); // Captura a URL da nova aba
        console.log('Link do PDF:', pdfLink);


        await browser.close();
        console.log('Login realizado com sucesso!');
    } catch (error) {
        console.error('Erro ao fazer scraping:', error);
        throw error;
    }
}
