import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import Homepage from './Homepage.jsx';
import { ThemeProvider } from './ThemeContext.jsx';

describe('Main Application Logic', () => {
    it('should return true for a valid condition', () => {
        expect(true).toBe(true);
    });

    it('renders Homepage inside ThemeProvider without crashing', () => {
        const { getByText } = render(
            <ThemeProvider>
                <Homepage />
            </ThemeProvider>
        );
        // You can adjust this assertion based on visible text in Homepage
        // For example, if Homepage renders a heading "Pokemon Search":
        expect(getByText(/enter a pokemon's name or pokedex number/i)).toBeTruthy();
    });
});