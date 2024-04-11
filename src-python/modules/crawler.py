from playwright.async_api import async_playwright, Playwright
from pathlib import Path

# https://www.webofscience.com/wos/woscc/advanced-search
async def run_wos(playwright: Playwright, query: str):
    chromium = playwright.chromium 
    browser = await chromium.launch(channel="chrome",headless=False)
    page = await browser.new_page()
    await page.goto("https://www.webofscience.com/wos/woscc/advanced-search")
    await page.wait_for_selector('#onetrust-accept-btn-handler')
    await page.locator("#onetrust-accept-btn-handler").click()
    await page.get_by_placeholder("Enter or edit your query here").click()
    await page.get_by_placeholder("Enter or edit your query here").fill(query)
    await page.get_by_label("Query editor").locator("button").filter(has_text="Search").click()
    # await page.get_by_role("button", name="Search", exact=True).click();
    # If "Accept all" button is there, accept all
    await page.locator("button").filter(has_text="Export expand_more").click() 
    await page.get_by_text("BibTeX", exact=True).click()
    async with page.expect_download() as download_info:
    # Perform the action that initiates download
        await page.get_by_text(" Export ", exact=True).click()
    download = await download_info.value
    # Wait for the download process to complete and save the downloaded file somewhere
    await download.save_as(Path.home().joinpath('Downloads', download.suggested_filename))
    
async def run_ieee(playwright: Playwright):
# ieee yi "items per page" i 100 yaparak ve "Showing 1-25 of 14,726 resultsfor" kismindaki 14,726/100 yaparak page sayisini hesapla ve 2 den crawlayarak durmadan indir
    chromium = playwright.chromium 
    browser = await chromium.launch(channel="chrome",headless=False)
    page = await browser.new_page()
    await page.goto("https://ieeexplore.ieee.org/search/advanced")
    await page.get_by_label("main").click()
    await page.get_by_label("main").fill("(\"Document Title\":hackathon) OR (\"Document Title\":teaching)")
    await page.get_by_label("Search", exact=True).click()
    await page.get_by_text("Export").click()
    await page.locator("#allResults").click()
    async with page.expect_download() as download_info:
        await page.get_by_role("button", name="Download").click()
    download = await download_info.value
    # Wait for the download process to complete and save the downloaded file somewhere
    await download.save_as(Path.home().joinpath('Downloads', download.suggested_filename))

async def run_acm(playwright: Playwright, query: str):
    chromium = playwright.chromium # or "firefox" or "webkit".
    browser = await chromium.launch(channel="chrome",headless=False)
    page = await browser.new_page()
    await page.goto("https://dl.acm.org/search/advanced")
    await page.get_by_role("link", name="Use necessary cookies only").click()
    await page.get_by_placeholder("Enter Search term").locator("nth=0").type(query,delay=100)
    await page.locator("#advanced-search-btn").click()
    await page.wait_for_timeout(1000)
    await page.locator('.item-results__checkbox').click()
    await page.wait_for_timeout(1000)
    await page.locator('.item-results__checkbox').click()
    await page.wait_for_timeout(1000)
    await page.locator('.item-results__checkbox').click()
    await page.wait_for_selector(".icon-export")
    async with page.expect_download() as download_info:
        await page.locator("#allResultstab > div > a").click()
    download = await download_info.value
    # Wait for the download process to complete and save the downloaded file somewhere
    await download.save_as(Path.home().joinpath('Downloads', download.suggested_filename))
    await page.wait_for_timeout(40000)
    await browser.close()

async def crawl_n_download(library: str, query: str):
    async with async_playwright() as playwright:
        if library == "wos": 
            await run_wos(playwright,query)
