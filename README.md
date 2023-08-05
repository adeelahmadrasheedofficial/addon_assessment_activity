# Overview
Please Follow the steps given below to Run test on your Local development machine.

- cd project directory
- npm install. (Will take some time... )
- npx playwright test  --project=chromium

### Environment:
  - By default we are pointing to Dev enviroment  https://jsonplaceholder.typicode.com

### Current app version:  
 - 'app-version': '1.0.0'   

### See Monocart Report

You can check Test cases Report in HTML format inside reporter/index.html

### Running on Specific Browswer
- npx playwright test tests --project=chromium
### Running specific tests
- npx playwright test 001-sample.spec.js --project=chromium

This test suite is just for demonstration purpose as an additional activity along with the main assemnt. So if you have any questions, you can reach out to me. I'll be more than happy to explain. Happy Testing :)