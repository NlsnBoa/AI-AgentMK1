const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// const url = process.argv[2];
const url = "https://www.formula1.com/en/results.html/2023/drivers.html"
const timeout = 8000;

(async () => {
    try
    {
        const browser = await puppeteer.launch( {
        headless: false,
        executablePath: '/Applications/Google Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary',
        userDataDir: '/Users/danyherrera/Library/Application\ Support/Google/Chrome\ Canary/Default', 
        dumpio: true,
        } );

        const page = await browser.newPage();

        await page.setViewport( {
            width: 1200,
            height: 1200,
            deviceScaleFactor: 1,
        } );

        // This navigates to the URL and waits until the page is fully loaded
        await page.goto(url, { waitUntil: 'networkidle0', timeout: timeout });

        // Click the Accept button
        const frame = await page.frames().find(f => f.url().includes('https://consent.formula1.com/index.html?hasCsp=true&message_id=1033523&consentUUID=00bbffa9-53aa-4ab8-9262-5a4bf7305800&preload_message=true&version=v1'));
        if (!frame == undefined) {
            await frame.waitForSelector('[aria-label="ACCEPT ALL"]', {visible: true});
            await frame.click('[aria-label="ACCEPT ALL"]');
            await page.waitForTimeout(timeout);
        }

        await page.screenshot({
            path: "screenshot.jpg",
            fullPage: true,
        });

        await browser.close();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();