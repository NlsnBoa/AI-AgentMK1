# Webscraping Chatbot and Agent using ChatGPT Vision Model
**Created using Python, Javascript and image to text with ChatGPT Vision**

## Javascript and Node installation
- Ensure you are on 18.17.0 or higher of node
- you can use NVM to change the version of Node
  
  ```
  nvm use 18.17.0
  ```

## Python installation
- Ensure Python3 is available

## OpenAI's ChatGPT Vision Installation
### ENV and Api Key
- create an ENV with your openai api key or use OpenAI's Virtual Enviroment

  or

### Virtual Enviroment 
- download the OpenAI vm. This will ensure evey package you might need is ready

```markdown
python3 -m venv openai-env
```

- Then activate the enviroment using:

```markdown
source openai-env/bin/activate
```

## Usage 
To begin the use of the Agent is fairly simple. 

Run the following file in the terminal and you can begin chatting with the agent. 

```
node web_agent.js
```

The actions the webscraping agent can perform are as follows:

1. The agent will do an initial google search based on your initial question.
2. Using puppeteer it take a screenshot of the current web browser and change the html to have a "red border" around links or buttons.
3. On your next question an underlying process will use ChatGPT Vision to tell puppeteer which link to click next relavent to your request.
4. The agent will repeat steps 2, 3 and 4 until it can no longer click on anymore links. (This is a drawback I am seeking to solve)
