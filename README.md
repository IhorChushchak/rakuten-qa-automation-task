# Rakuten QA Automation Task

## Overview

This repository contains solutions for the QA Automation tasks provided as part of the interview process. Below are instructions for each task, including setup and execution details.

## Task 1: CSV Processing

To get started with Task 1, follow these steps:

1. Locate the `csv` directory in the project.
2. Open the `csv.reader.js` file.
3. Follow the comments within the file for detailed instructions on executing the CSV processing tasks.

## Task 2: Postman API Testing

For Task 2, the testing was conducted using Postman. You can access the Postman Collection via the following link:

- [https://www.postman.com/pacman9524/workspace/qa/collection/17075169-f09cc29e-97ab-4b24-a6c9-5c4c9582604b?action=share&creator=17075169] 

The collection includes all necessary descriptions and comments to guide you through the testing process.

## Task 3: Cypress UI Automation

To execute Task 3, which involves UI automation with Cypress, follow these steps:

1. **Install Cypress**: Run the following command in your terminal:
    ```bash
    npm install cypress --save-dev
    ```

2. **Open Cypress**: Start the Cypress Test Runner with:
    ```bash
    npx cypress open
    ```

3. **Execute Tests**: Within the Cypress Test Runner, navigate to `cypress/e2e/ui.cy.js` to run the UI tests. Detailed comments and instructions are provided in the following files:
    - `cypress/e2e/ui.cy.js`
    - `cypress/fixtures/form.json`
    - `cypress/support/page_objects/basketPage.js`
    - `cypress/support/page_objects/homePage.js`
    - `.circleci/config.yml`

Feel free to review the comments in these files for further guidance on the test execution.
