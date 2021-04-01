from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.firefox.options import Options
from selenium import webdriver
  
options = Options()
# options.headless = True
firefox_binary = FirefoxBinary('/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox-bin')
driver = webdriver.Firefox(options=options, firefox_binary=firefox_binary)
driver.get("http://localhost:3000/grid")
  
for i in range(400):
    index = i + 1
    element = driver.find_element_by_id("grid_" + str(index))
    element.screenshot("grids/grid_" + str(index) + ".png")

driver.quit()