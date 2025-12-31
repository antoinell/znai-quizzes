/*
 * Copyright 2025 znai maintainers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ZnaiQuiz from './doc-elements/znai-quizzes/Quizzes';

// Extend the znai library with the quiz component
declare global {
  interface Window {
    znai?: {
      elementsLibrary?: {
        library?: {
          [key: string]: any;
        };
      };
    };
  }
}

// Register the component when the script loads
function registerZnaiQuizComponent() {
  // Wait for znai to be available
  const checkAndRegister = () => {
    if (window.znai?.elementsLibrary?.library) {
      // Register the ZnaiQuiz component
      window.znai.elementsLibrary.library.ZnaiQuiz = ZnaiQuiz;
      console.log('ZnaiQuiz component registered successfully');
    } else {
      // Retry after a short delay
      setTimeout(checkAndRegister, 100);
    }
  };
  
  checkAndRegister();
}

// Auto-register when script loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerZnaiQuizComponent);
  } else {
    registerZnaiQuizComponent();
  }
}

// Also export for manual registration if needed
export { ZnaiQuiz, registerZnaiQuizComponent };
export default registerZnaiQuizComponent;