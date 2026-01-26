# Plan: Add Tip of the Day Feature to Budgeting App

Add a "Tip of the Day" feature that displays financial education tips. The component will show rotating financial knowledge covering budgeting, investing, and savings strategies. It integrates into the existing Dashboard with minimal changes to the current architecture.

## Steps

1. Create a `tips.json` data file in `src/data/` with financial tips covering budgeting, savings, and investing categories.

2. Add a `Tip` interface to `src/types/index.ts` defining tip structure (id, content, category).

3. Create a custom hook `useTipOfTheDay.ts` in `src/hooks/` to manage tip selection logic and localStorage persistence.

4. Create `TipOfTheDay.tsx` component in `src/components/` with a simple button and display area, following the existing styling pattern.

5. Import and add `<TipOfTheDay />` to `src/components/Dashboard.tsx` at the top of the layout.

6. Test the feature by clicking the button to verify tips cycle and persist across sessions.

## Further Considerations

1. **Tip Rotation Strategy**: Should tips rotate daily (same tip all day), show random tips on each click, or display a "tip of the day" that resets daily? Recommend random on-click for immediate user engagement.

2. **Visual Integration**: Should the tip be displayed as a card/box with styling, or keep minimal styling matching current components? Recommend simple box styling to match app's plain HTML/CSS approach.

3. **Data Source**: Store tips in local `tips.json` file, or fetch from an API? Recommend local JSON file for simplicity; can be migrated to API later.

## Implementation Details

### Tips Data Structure

```json
[
  {
    "id": "tip-001",
    "content": "Build an emergency fund with 3-6 months of living expenses.",
    "category": "savings"
  },
  ...
]
```

### Type Definition

```typescript
interface Tip {
  id: string;
  content: string;
  category: 'budgeting' | 'savings' | 'investing';
}
```

### Hook Pattern

Follow the existing `useBudget` hook pattern with state management for current tip selection and localStorage persistence.

### Component Integration

Add to Dashboard at the top, before forms, with a simple button to fetch a new tip and display area.

## Acceptance Criteria

- [ ] Tips display correctly with readable content
- [ ] Button triggers new tip selection
- [ ] Tips persist across page reloads (localStorage)
- [ ] Styling consistent with existing app (minimal CSS)
- [ ] No errors in console
- [ ] All three categories (budgeting, savings, investing) represented
