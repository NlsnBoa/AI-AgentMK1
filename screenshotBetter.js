const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const url = "https://www.linkedin.com/in/nelson-herrera-swe/";
const timeout = 10000;

(async () => {
    try {
        console.log("Launching browser");
        const browser = await puppeteer.launch({
            headless: false, // Consider toggling this for testing
            executablePath: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
            userDataDir: '/Users/danyherrera/Library/Application Support/Google/Chrome Canary/Default', 
            ignoreDefaultArgs: ["--enable-automation"],
            dumpio: true,
        });

        const page = await browser.newPage();
        await page.setViewport({
            width: 1200,
            height: 1200,
            deviceScaleFactor: 1,
        });
        console.log("Navigating to URL");
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeout });

        // Check if redirected to login page (simple check based on URL)
        if (page.url().includes("linkedin.com/login")) {
            console.log("Redirected to login page. Consider automating login or checking session state.");
            // Optionally, insert login automation steps here
        } else {
            console.log("Page loaded successfully.");
            await page.screenshot({
                path: "screenshot.jpg",
                fullPage: true,
            });
        }

        await browser.close();
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();
