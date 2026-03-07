# Design Document

## Overview

This design document outlines the approach for relocating the interactive typeface toggle buttons from the hero section to the Interactive Comparison section of the comparison page. The change involves modifying the HTML structure and ensuring all JavaScript event handlers continue to function correctly. The design maintains visual consistency while improving the user experience by co-locating interactive controls with their immediate feedback area.

## Architecture

The comparison page follows a single-page structure with embedded styles and scripts. The architecture consists of:

1. **Hero Section** - Static visual comparison at the top of the page
2. **Interactive Comparison Section** - Dynamic demonstration area with user controls
3. **Event Handling Layer** - JavaScript that manages toggle button clicks and updates the sample display

The relocation involves:
- Removing the toggle buttons from the hero section HTML
- Adding the toggle buttons to the Interactive Comparison section HTML
- Verifying that existing JavaScript selectors continue to work
- Ensuring CSS styles apply correctly in the new location

## Components and Interfaces

### Hero Section Component

**Current State:**
- Contains "SEE THE DIFFERENCE" heading
- Displays two preview boxes (serif and sans-serif)
- Includes toggle buttons with instruction text

**Target State:**
- Contains "SEE THE DIFFERENCE" heading
- Displays two preview boxes (serif and sans-serif)
- Removes toggle buttons and instruction text
- Maintains all existing CSS styling for preview boxes

### Interactive Comparison Section Component

**Current State:**
- Contains "CHAPTER 02 • LIVE DEMO" heading
- Displays instruction text for toggle buttons
- Contains toggle buttons (to be relocated here)
- Includes text input field with character counter
- Contains sample display area
- Includes size controls

**Target State:**
- All current elements remain
- Toggle buttons are already present in this section
- No structural changes needed (buttons are already in the correct location based on code analysis)

### Toggle Button Component

**Interface:**
```html
<button class="toggle-btn [active]" data-type="[serif|sans]">
    <div class="btn-label">[Traditional|Modern]</div>
    <div class="btn-title">[Serif|Sans-serif]</div>
</button>
```

**States:**
- `active`: Applied to the currently selected typeface button
- `hover`: Applied when user hovers over button
- `default`: Base state for inactive buttons

**Behavior:**
- Clicking a button adds `active` class to clicked button
- Clicking a button removes `active` class from sibling button
- Clicking a button updates the sample display font-family

### Sample Display Component

**Interface:**
```html
<div class="sample-display">
    <p id="sampleText" class="sample-text [serif|sans]">
        [User text or default text]
    </p>
</div>
```

**States:**
- `serif`: Applies Georgia font-family
- `sans`: Applies Arial/Helvetica font-family
- `empty`: Displays placeholder text when input is empty

## Data Models

### Toggle State

```javascript
{
    activeType: 'serif' | 'sans',  // Currently selected typeface
    sampleElement: HTMLElement,     // Reference to sample text element
    buttons: NodeList               // Collection of toggle button elements
}
```

### User Input State

```javascript
{
    customText: string,             // User-entered text
    fontSize: number,               // Current font size in pixels
    defaultText: string             // Fallback text when input is empty
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Toggle button exclusivity

*For any* sequence of toggle button clicks, exactly one toggle button should have the `active` class applied at any given time
**Validates: Requirements 2.2, 2.3, 2.5**

### Property 2: Sample display font synchronization

*For any* toggle button click, the sample display element's font-family should match the clicked button's typeface (serif or sans-serif)
**Validates: Requirements 2.2, 2.3, 5.3**

### Property 3: Text content preservation

*For any* custom text input and any sequence of typeface toggles, the text content should remain unchanged while only the font-family changes
**Validates: Requirements 3.2**

### Property 4: Input text synchronization

*For any* text typed into the input field, the sample display should update to show that exact text in the currently selected typeface
**Validates: Requirements 3.1**

### Property 5: Typeface independence from size changes

*For any* selected typeface and any font size adjustment, the font-family should remain unchanged when the font size is modified
**Validates: Requirements 3.5**

### Property 6: Active state styling consistency

*For any* toggle button with the active class, the button should display with accent color background and elevated shadow styling
**Validates: Requirements 2.4**

## Error Handling

### Missing DOM Elements

**Scenario:** Toggle buttons or sample display elements are not found in the DOM

**Handling:**
- JavaScript should check for element existence before attaching event listeners
- Console warnings should be logged if expected elements are missing
- Page should degrade gracefully without throwing errors

### Duplicate Event Listeners

**Scenario:** Page navigation causes event listeners to be attached multiple times

**Handling:**
- The app router's `_clearAll()` method removes tracked listeners on navigation
- Event listeners are re-attached when page content is loaded
- No manual cleanup is required in the comparison page script

### Invalid Typeface Selection

**Scenario:** Toggle button has unexpected data-type value

**Handling:**
- Default to 'serif' if data-type is not 'serif' or 'sans'
- Log warning to console for debugging
- Apply fallback font-family to prevent visual breakage

## Testing Strategy

### Unit Testing

Unit tests will verify:
- DOM structure of hero section (no toggle buttons present)
- DOM structure of Interactive Comparison section (toggle buttons present)
- CSS class application when toggle buttons are clicked
- Sample display font-family updates correctly

### Property-Based Testing

Property-based tests will use a JavaScript PBT library (fast-check) to verify:
- Toggle button exclusivity across random click sequences
- Text content preservation across random typeface switches
- Correct initialization state on repeated page loads

### Manual Testing

Manual testing will verify:
- Visual appearance matches design specifications
- Hover effects work correctly on toggle buttons
- Mobile responsive behavior is maintained
- Smooth transitions between typeface changes
- Integration with text input and size controls

### Browser Compatibility Testing

Testing will be performed on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Implementation Notes

### HTML Structure Changes

Based on code analysis, the toggle buttons are already located in the Interactive Comparison section. The task is to verify this is the only location and remove any duplicate buttons from the hero section if they exist.

### CSS Considerations

All existing CSS for `.toggle-btn`, `.toggle-controls`, and `.interactive-panel` should continue to work without modification since the class names and structure remain unchanged.

### JavaScript Event Handling

The existing JavaScript uses `document.querySelectorAll('.toggle-btn')` which will continue to work correctly. The event listeners attach to all buttons with the `.toggle-btn` class regardless of their location in the DOM.

### Accessibility

- Toggle buttons should maintain proper ARIA attributes
- Active button should have `aria-pressed="true"`
- Inactive button should have `aria-pressed="false"`
- Button labels should be descriptive for screen readers

### Performance

- No performance impact expected
- Event delegation is not necessary for two buttons
- CSS transitions should use GPU-accelerated properties (transform, opacity)
