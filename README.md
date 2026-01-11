# Budget App (Vite + React + TypeScript)

## Overview
The Budgeting App is a simple and intuitive application designed to help users manage their finances by tracking income and expenses. It provides a summary of potential savings and visualizes the budget data through charts.

## Features
- Input for income and expenses
- Summary of total income, expenses, and potential savings
- Visual representation of budget data using charts
- Persistent storage of user inputs using local storage

## Project Structure
```
budgeting-app
├── src
│   ├── App.tsx
│   ├── index.tsx
│   ├── components
│   │   ├── IncomeForm.tsx
│   │   ├── ExpenseForm.tsx
│   │   ├── Summary.tsx
│   │   └── Chart.tsx
│   ├── hooks
│   │   └── useBudget.ts
│   ├── services
│   │   └── storage.ts
│   ├── styles
│   │   └── globals.css
│   └── types
│       └── index.ts
├── public
│   └── index.html
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd budgeting-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the application:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000` to access the app.
3. Input your income and expenses in the respective forms.
4. View the summary of your finances and the visual chart representation.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Notes
- Seed data and default categories are in the useBudget hook.
- Main components are located in the `src/components` directory.
- To run tests, use the command `npm run test` (Vitest) — tests for calculation utilities.