###  Accessibility Test Suite

Performs automated accessibility validation using **axe-core** across Chromium, Firefox, and WebKit.
Consistent cross-browser failures confirm the presence of genuine accessibility issues, demonstrating reliable and non-flaky test behavior.

<img width="1879" height="912" alt="Accessibility Suite" src="https://github.com/user-attachments/assets/5e85f329-b39f-43a1-9ef7-e646859a0e91" />

---

###  Keyboard Navigation Issue

Validates keyboard navigation for toolbar buttons.
The test failed because the **"Run sketch" button is not focusable**, indicating a keyboard accessibility issue.

<img width="1906" height="823" alt="Keyboard Navigation Failure" src="https://github.com/user-attachments/assets/a3fd1ecc-4dbb-4904-a6cc-7e69c606bd1c" />

---

###  Test Execution Steps

Shows step-by-step execution of the keyboard navigation test:

* User presses the **Tab key twice**
* Expected focus on the **"Run sketch" button**
* Focus was **not applied**

This confirms a failure in **keyboard accessibility and focus handling**.

<img width="1882" height="898" alt="Test Execution Steps" src="https://github.com/user-attachments/assets/af6008f8-469a-461f-860f-cdeda4f253b3" />

---

###  Debugging Artifacts

Includes Playwright debugging artifacts such as:

*  Video recording of test execution
*  Error context with logs and stack trace

These enable detailed analysis and faster debugging of test failures.

<img width="1875" height="922" alt="Debugging Artifacts" src="https://github.com/user-attachments/assets/67c8034a-9fa9-41b8-aeca-2febae581ef8" />
