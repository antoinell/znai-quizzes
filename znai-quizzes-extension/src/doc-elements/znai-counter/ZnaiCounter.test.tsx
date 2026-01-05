
/*
 * Copyright 2026 znai maintainers
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

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ZnaiCounter } from './ZnaiCounter';

describe('ZnaiCounter', () => {
    it('renders with default initial count and handles increment/decrement', () => {
        render(<ZnaiCounter />);

        // Check initial rendering
        expect(screen.getByText('Counter Component')).toBeInTheDocument();
        expect(screen.getByText('History:')).toBeInTheDocument();

        // Find buttons
        const incrementButton = screen.getByText('Increment');
        const decrementButton = screen.getByText('Decrement');
        const resetButton = screen.getByText('Reset');

        expect(incrementButton).toBeInTheDocument();
        expect(decrementButton).toBeInTheDocument();
        expect(resetButton).toBeInTheDocument();

        // Test increment functionality
        fireEvent.click(incrementButton);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('0 → 1')).toBeInTheDocument();

        // Test decrement functionality
        fireEvent.click(decrementButton);
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('0 → 1 → 0')).toBeInTheDocument();

        // Test multiple increments
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('0 → 1 → 0 → 1 → 2')).toBeInTheDocument();
    });

    it('renders with custom initial count and step, and handles reset', () => {
        render(<ZnaiCounter initialCount={10} step={5} />);


        const incrementButton = screen.getByText('Increment');
        const decrementButton = screen.getByText('Decrement');
        const resetButton = screen.getByText('Reset');

        // Test increment with custom step
        fireEvent.click(incrementButton);
        expect(screen.getByText('15')).toBeInTheDocument(); // 10 + 5
        expect(screen.getByText('10 → 15')).toBeInTheDocument();

        // Test decrement with custom step
        fireEvent.click(decrementButton);
        expect(screen.getByText('10')).toBeInTheDocument(); // 15 - 5
        expect(screen.getByText('10 → 15 → 10')).toBeInTheDocument();

        // Add more changes to test reset functionality
        fireEvent.click(incrementButton); // Should be 15
        fireEvent.click(incrementButton); // Should be 20
        expect(screen.getByText('20')).toBeInTheDocument();
        expect(screen.getByText('10 → 15 → 10 → 15 → 20')).toBeInTheDocument();

        // Test reset functionality
        fireEvent.click(resetButton);

        // Verify history was actually reset (not just showing same number)
        // Should find the display count and the reset history, but not the long history
        expect(screen.queryByText('10 → 15 → 10 → 15 → 20')).not.toBeInTheDocument();
    });
});