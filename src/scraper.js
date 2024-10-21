import puppeteer from 'puppeteer';

export async function scrapeWebsite(url) {
    try {
        console.log('Iniciando o processo de scraping...');

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        console.log('Navegador aberto com sucesso.');

        const page = await browser.newPage();
        console.log('Nova página criada.');

        const username = 'P2265468';
        const password = 'MY315';

        console.log('Acessando a URL:', url);
        await page.goto(url);
        console.log('Página carregada.');

        console.log('Digitando username...');
        await page.type('#control_40', username);
        console.log('Username digitado.');

        console.log('Digitando password...');
        await page.type('#control_42', password);
        console.log('Password digitado.');

        console.log('Clicando no botão de login...');
        await page.click('#control_51');

        // Espera que a navegação pós-login aconteça
        console.log('Aguardando a navegação pós-login...');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('Navegação concluída.');

        console.log('Aguardando 5 segundos...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Espera até que o botão com id "control_54" apareça
        console.log('Aguardando o botão "Último Resultado" aparecer...');
        await page.waitForSelector('#control_54');
        console.log('Botão "Último Resultado" encontrado. Clicando...');
        await page.click('#control_54');

        console.log('Aguardando 5 segundos...');
        await new Promise(resolve => setTimeout(resolve, 5000));

        console.log('Clicando no link de imprimir...');
        await page.click('#imprimir a'); // Clica na tag <a> dentro da div "imprimir"

        // Espera pela nova aba
        const newPagePromise = new Promise(resolve => browser.once('targetcreated', target => resolve(target.page())));
        const newPage = await newPagePromise;
        console.log('Nova aba criada para o PDF.');

        // Espera a nova página carregar (ajuste conforme necessário)
        console.log('Aguardando a nova página carregar...');
        await newPage.waitForNavigation({ waitUntil: 'networkidle2' });
        console.log('Nova página carregada.');

        // Obtém o link do PDF gerado
        const pdfLink = newPage.url(); // Captura a URL da nova aba
        console.log('Link do PDF:', pdfLink);

        await browser.close();
        console.log('Login realizado com sucesso e navegador fechado.');
        return pdfLink
    } catch (error) {
        console.error('Erro ao fazer scraping:', error);
        throw error;
    }
}
