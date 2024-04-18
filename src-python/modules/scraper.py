from playwright.async_api import async_playwright, Playwright
from pathlib import Path
import os
from typing import Union

# To extend the automation future collaborators can get help from https://playwright.dev/python/docs/codegen

def get_available_file_name(suggested_name: str):
    counter = 2
    filename = "{0}-{1}"
    if not os.path.isfile(Path.home().joinpath('Downloads', suggested_name)):
        return suggested_name
    while os.path.isfile(Path.home().joinpath('Downloads', filename.format(counter,suggested_name))):
        counter += 1
    filename = filename.format(counter,suggested_name)
    return filename

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
    await page.locator("button").filter(has_text="Export expand_more").click() 
    await page.get_by_text("BibTeX", exact=True).click()
    async with page.expect_download() as download_info:
        await page.get_by_text(" Export ", exact=True).click()
    download = await download_info.value
    available_file_name = get_available_file_name(download.suggested_filename)
    await download.save_as(Path.home().joinpath('Downloads', available_file_name))
    return available_file_name
    
async def run_ieee(playwright: Playwright):
    # Idea: Use "items per page" "100" and grab 14,726 from "Showing 1-25 of 14,726 resultsfor" and scrape each page with number of "14,726/100" and download per each page
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
    available_file_name = get_available_file_name(download.suggested_filename)
    await download.save_as(Path.home().joinpath('Downloads', available_file_name))
    return available_file_name

async def run_acm(playwright: Playwright, query: str):
    chromium = playwright.chromium
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
    available_file_name = get_available_file_name(download.suggested_filename)
    await download.save_as(Path.home().joinpath('Downloads', available_file_name))
    return available_file_name

async def download_data(library: str, query: str) -> Union[str,None]:
    async with async_playwright() as playwright:
        if library == "wos": 
            downloaded_file_name = await run_wos(playwright,query)
            return downloaded_file_name
