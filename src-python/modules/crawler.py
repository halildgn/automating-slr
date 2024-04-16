from playwright.async_api import async_playwright, Playwright
from pathlib import Path
import os


def get_available_file_name(suggested_name: str):
    count = 1
    filename = "{suggested_file_name}-{counter}.bib"
    while os.path.isfile(Path.home().joinpath('Downloads', filename.format(suggested_file_name = suggested_name , counter=count))):
        count += 1
    filename = filename.format(suggested_file_name = suggested_name , counter=count)
    return filename

# https://www.webofscience.com/wos/woscc/advanced-search
async def run_wos(playwright: Playwright, query: str):
    chromium = playwright.chromium 
    browser = await chromium.launch(headless=True)
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
    available_file_name = get_available_file_name(download.suggested_filename)
    await download.save_as(Path.home().joinpath('Downloads', available_file_name))
    await browser.close()
    return available_file_name
    
async def run_ieee(playwright: Playwright):
# Use "items per page" "100" and grab 14,726 from "Showing 1-25 of 14,726 resultsfor" and crawl pages with "14,726/100" and download per each page
    chromium = playwright.chromium 
    browser = await chromium.launch(headless=True)
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
    available_file_name = get_available_file_name(download.suggested_filename)
    await download.save_as(Path.home().joinpath('Downloads', available_file_name))
    await browser.close()
    return available_file_name

async def run_acm(playwright: Playwright, query: str):
    chromium = playwright.chromium # or "firefox" or "webkit".
    browser = await chromium.launch(headless=True)
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
    available_file_name = get_available_file_name(download.suggested_filename)
    await download.save_as(Path.home().joinpath('Downloads', available_file_name))
    await browser.close()
    return available_file_name

async def crawl_n_download(library: str, query: str):
    async with async_playwright() as playwright:
        if library == "wos": 
            downloaded_file_name = await run_wos(playwright,query)
            return downloaded_file_name
