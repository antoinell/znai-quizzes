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

import {ZnaiCounter} from './doc-elements/znai-counter/ZnaiCounter';

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
async function registerZnaiCounterComponent() {
  const checkAndRegister = async () => {
    try {
      // Import from the module map
      const module = await import('/znai-components.es.js?url');

      // Check if elementsLibrary exists
      if (module.elementsLibrary?.library) {
        module.elementsLibrary.library.ZnaiCounter = ZnaiCounter;
        console.log('ZnaiSelect component registered successfully');
        return true;
      } else {
        console.warn('elementsLibrary not found in znai-components');
        return false;
      }
    } catch (e) {
      console.error('Failed to import znai-components:', e);
      return false;
    }
  };

  // Try immediate registration
  const success = await checkAndRegister();

  // If failed, retry with polling
  if (!success) {
    let attempts = 0;
    const maxAttempts = 10;

    const interval = setInterval(async () => {
      attempts++;
      const retrySuccess = await checkAndRegister();

      if (retrySuccess || attempts >= maxAttempts) {
        clearInterval(interval);
        if (!retrySuccess) {
          console.warn(`Failed to register ZnaiCounter after ${maxAttempts} attempts`);
        }
      }
    }, 500); // Check every 500ms
  }
}

// Auto-register when script loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerZnaiCounterComponent);
  } else {
    registerZnaiCounterComponent();
  }
}

// Also export for manual registration if needed
export { ZnaiCounter, registerZnaiCounterComponent };
export default registerZnaiCounterComponent;