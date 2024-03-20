from openai import OpenAI
import subprocess
import base64
import os
from dotenv import load_dotenv

load_dotenv()

model = OpenAI()
# This will limit the time in which requests are made to the API, if the request takes longer than 30 seconds, it will raise a TimeoutError
model.timeout = 50

# Read the image file and convert it to base64 which chatgpt can understand
def image_b64(image):
  with open(image, "rb") as f:
    return base64.b64encode(f.read()).decode()

def url2screenshot(url):
  print(f"Crawling {url}")

  if os.path.exists("screenshot.jpg"):
    os.remove("screenshot.jpg")

  result = subprocess.run(
    ["node", "screenshot.js", url],
    capture_output=True,
    text=True
  )

  exitcode = result.returncode
  output = result.stdout

  if not os.path.exists("screenshot.jpg"):
    print("ERROR")
    return "Failed to scrape the website"
  
  b64_image = image_b64("screenshot.jpg")
  return b64_image

def visionExtract(b64_image, prompt):
  response = model.chat.completions.create(
      model="gpt-4-vision-preview",
      messages=[
          {
              "role": "system",
              "content": "You a web scraper, your job is to extract information based on a screenshot of a website & user's instruction",
          }
      ] + [
          {
              "role": "user",
              "content": [
                  {
                      "type": "image_url",
                      "image_url": {
                        "url": f"data:image/jpeg;base64,{b64_image}",
                        "detail": "high"
                        } 
                  },
                  {
                      "type": "text",
                      "text": prompt,
                  }
              ]
          }
      ],
      max_tokens=1200,
  )

  message = response.choices[0].message
  message_text = message.content

  if "ANSWER_NOT_FOUND" in message_text:
    print("ERROR: Answer not found")
    return "I was unable to find the answer on that website. Please pick another one"
  else:
    print(f"GPT: {message_text}")
    return message_text

def visionCrawl(url, prompt):
  b64_image = url2screenshot(url)

  print("Image captured")
  
  if b64_image == "Failed to scrape the website":
    return "I was unable to crawl that site. Please pick a different one."
  else:
    return visionExtract(b64_image, prompt)

response = visionCrawl("https://www.formula1.com/en/results.html/2023/drivers.html", "Give me the driver standings for the 2023 F1 season in json format.")
print(response)