import puppeteer from 'puppeteer';

export async function GET() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.example-real-estate-site.com');

    // Example: Scrape the latest market insight from the homepage
    const latestInsight = await page.evaluate(() => {
      const insightElement = document.querySelector('.latest-market-insight');
      return insightElement ? insightElement.textContent : 'No insight available';
    });

    await browser.close();

    return Response.json({ latestInsight });
  } catch (error) {
    console.error('Error during web scraping:', error);
    return Response.json({ error: 'Failed to scrape data' }, { status: 500 });
  }
}