### ♿ Accessibility Test Suite

Runs axe-core based accessibility tests across Chromium, Firefox, and WebKit.  
Current results show consistent failures, indicating real accessibility issues detected by the test suite.

<img width="1879" height="912" alt="image" src="https://github.com/user-attachments/assets/5e85f329-b39f-43a1-9ef7-e646859a0e91" />

Validates keyboard navigation for toolbar buttons. Test failed as "Run sketch" button is not focusable, indicating a keyboard accessibility issue.
<img width="1906" height="823" alt="image" src="https://github.com/user-attachments/assets/a3fd1ecc-4dbb-4904-a6cc-7e69c606bd1c" />


Shows step-by-step execution of keyboard navigation test. After pressing Tab twice, the "Run sketch" button was not focused, indicating a failure in keyboard accessibility.
<img width="1882" height="898" alt="image" src="https://github.com/user-attachments/assets/af6008f8-469a-461f-860f-cdeda4f253b3" />


Includes Playwright debugging artifacts such as video recording and error context, enabling detailed analysis of test failures.
<img width="1875" height="922" alt="image" src="https://github.com/user-attachments/assets/67c8034a-9fa9-41b8-aeca-2febae581ef8" />
