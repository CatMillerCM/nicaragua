import { fireEvent, render, screen, within, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

describe('RavePI', () => {
  const initialFetch = global.fetch;

  beforeAll(() => {
    global.fetch = (url) => {
      if (url === 'https://nicaragua-api.cat-miller.com/parties') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { name: 'Party 1', location: 'granada', day: 'friday', instagram: 'party1' },
            { name: 'Party 2', location: 'san juan del sur', day: 'saturday', instagram: 'party2' },
            { name: 'Party 3', location: 'granada', day: 'wednesday', instagram: 'party3' },
          ]),
        });
      } else if (url === 'https://nicaragua-api.cat-miller.com/locations') {
        return Promise.resolve({
          json: () => Promise.resolve(['granada', 'san juan del sur']),
        });
      } else if (url === 'https://nicaragua-api.cat-miller.com/parties?location=granada&day=friday') {
        return Promise.resolve({
          json: () => Promise.resolve([
            { name: 'Party 1', location: 'granada', day: 'friday', instagram: 'party1' },
          ]),
        });
      }
      return Promise.resolve({ json: () => Promise.resolve([]) });
    };
  });

  afterAll(() => {
    global.fetch = initialFetch;
  });

  describe('when initial page loads', () => {
    beforeEach(async () => {
      render(<App />);

      await screen.findByText(/ravepi/i);
    });

    it('should render a location dropdown that contains the locations from the API, plus the placeholder', async () => {
      const dropdowns = await screen.findAllByRole('combobox');
      const locationOptions = within(dropdowns[0]).getAllByRole('option');
      const locationNames = locationOptions.map(option => option.textContent);
      
      expect(locationNames).toEqual(['Filter by location', 'granada', 'san juan del sur']);
    });

    it('should render a day dropdown that contains the days from the declared array, plus the placeholder', async () => {
      const dropdowns = await screen.findAllByRole('combobox');
      const dayOptions = within(dropdowns[1]).getAllByRole('option');
      const dayNames = dayOptions.map(option => option.textContent);
      
      expect(dayNames).toEqual(['Filter by day', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'fluctuating']);
    });

    it('should render a "Search" button and a "Clear" button which are both disabled', () => {
      const searchButton = screen.queryByRole('button', { name: /search/i });
      const clearButton = screen.queryByRole('button', { name: /clear/i });

      expect(searchButton).toBeDefined();
      expect(clearButton).toBeDefined();
      expect(searchButton).toBeDisabled();
      expect(clearButton).toBeDisabled();
    });

    it('should render all party cards for all days and locations', async () => {
      const partyNameElements = screen.getAllByText(/^Party/);
      const partyNameTexts = partyNameElements.map((el) => el.textContent);

      expect(partyNameTexts).toEqual(['Party 1', 'Party 2', 'Party 3']);
    });

    describe('and then the user selects a filter/s', () => {
      beforeEach(async () => {
        const dropdowns = await screen.findAllByRole('combobox');
        const locationDropdown = dropdowns[0];
        const dayDropdown = dropdowns[1];

        await userEvent.selectOptions(locationDropdown, 'granada');
        await userEvent.selectOptions(dayDropdown, 'friday');
      });

      it('should choose the selected filter/s', () => {
        expect((screen.getByText('granada')).selected).toBeTruthy();
        expect((screen.getByText('friday')).selected).toBeTruthy();
      });

      it('should enable the "Search" and "Clear" buttons', () => {        
        const searchButton = screen.getByRole('button', { name: /search/i });
        const clearButton = screen.getByRole('button', { name: /clear/i });
      
        expect(searchButton).toBeEnabled();
        expect(clearButton).toBeEnabled();
      });

      describe('and then the user clicks "Search"', () => {
        beforeEach(async () => {
          const searchButton = screen.getByRole('button', { name: /search/i });

          fireEvent.click(searchButton);

          await waitFor(() => {
            const partyNameElements = screen.getAllByText(/^Party/);
            expect(partyNameElements.length).toBeLessThan(3);
          });
        });

        it('should render party cards that match the filter/s', async () => {
          const partyNameElements = screen.getAllByText(/^Party/);
          const partyNameTexts = partyNameElements.map((el) => el.textContent);
    
          expect(partyNameTexts).toEqual(['Party 1']);
        });

        describe('and then the user clicks "Clear"', () => {
          beforeEach(async () => {
            const clearButton = screen.getByRole('button', { name: /clear/i });

            fireEvent.click(clearButton);

            await waitFor(() => {
              const partyNameElements = screen.getAllByText(/^Party/);
              expect(partyNameElements.length).toBeGreaterThan(1);
            });
          });

          it('should render all party cards for all days and locations', async () => {
            const partyNameElements = screen.getAllByText(/^Party/);
            const partyNameTexts = partyNameElements.map((el) => el.textContent);
      
            expect(partyNameTexts).toEqual(['Party 1', 'Party 2', 'Party 3']);
          });
        });
      });
    });
  });
});
