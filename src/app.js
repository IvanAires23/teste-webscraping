import express from 'express';
import { scrapeWebsite } from './scraper.js';

const app = express();

app.get('/scrape', async (req, res) => {
    try {
        const result = await scrapeWebsite('https://resultados.laboratorioplatano.com.br/shift/lis/platano/elis/s01.iu.web.Login.cls');
        res.status(200).send({ pdfLink: result })
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao fazer o scraping');
    }
});

export default app