# Implementation Plan

- [ ] 1. Analyze current HTML structure and identify button locations
  - Read the comparison.html file completely to understand the current structure
  - Identify if toggle buttons exist in both hero section and Interactive Comparison section
  - Document the exact line numbers and HTML structure of both sections
  - _Requirements: 1.4, 2.1_

- [ ] 2. Remove toggle buttons from hero section (if present)
  - Locate the hero section in comparison.html
  - Remove any toggle button HTML elements from the hero section
  - Remove the instruction text related to toggle buttons from hero section
  - Verify the "SEE THE DIFFERENCE" heading and preview boxes remain intact
  - _Requirements: 1.1, 1.4_

- [ ] 3. Verify toggle buttons exist in Interactive Comparison section
  - Confirm toggle buttons are present in the Interactive Comparison section
  - Verify the HTML structure matches the design specification
  - Ensure both "TRADITIONAL Serif" and "MODERN Sans-serif" buttons are present
  - Verify the buttons are positioned above the text input area
  - _Requirements: 2.1_

- [ ] 4. Update JavaScript event listeners (if needed)
  - Review the existing JavaScript code that handles toggle button clicks
  - Verify that `document.querySelectorAll('.toggle-btn')` correctly selects buttons
  - Ensure event listeners are attached correctly after DOM content is loaded
  - Test that clicking buttons triggers the expected behavior
  - _Requirements: 5.1, 5.3_

- [ ] 5. Add ARIA attributes for accessibility
  - Add `aria-pressed="true"` to the active toggle button
  - Add `aria-pressed="false"` to the inactive toggle button
  - Update ARIA attributes dynamically when buttons are clicked
  - Add descriptive `aria-label` attributes to buttons if not present
  - _Requirements: 2.2, 2.3_

- [ ]* 5.1 Write property test for toggle button exclusivity
  - **Property 1: Toggle button exclusivity**
  - **Validates: Requirements 2.2, 2.3, 2.5**
  - Generate random sequences of button clicks
  - Verify exactly one button has active class after each click
  - Use fast-check library with minimum 100 iterations

- [ ]* 5.2 Write property test for font synchronization
  - **Property 2: Sample display font synchronization**
  - **Validates: Requirements 2.2, 2.3, 5.3**
  - Generate random button click sequences
  - Verify sample display font-family matches clicked button's typeface
  - Use fast-check library with minimum 100 iterations

- [ ] 6. Verify default initialization state
  - Ensure the serif button has the `active` class on page load
  - Verify the sample display uses serif font-family on page load
  - Test that the initialization works after page navigation and return
  - _Requirements: 5.2, 5.4_

- [ ]* 6.1 Write property test for text content preservation
  - **Property 3: Text content preservation**
  - **Validates: Requirements 3.2**
  - Generate random text strings
  - Input text and toggle between typefaces
  - Verify text content remains unchanged while font-family changes
  - Use fast-check library with minimum 100 iterations

- [ ]* 6.2 Write property test for input text synchronization
  - **Property 4: Input text synchronization**
  - **Validates: Requirements 3.1**
  - Generate random text strings
  - Input text and verify sample display updates with exact text
  - Test with various text lengths and special characters
  - Use fast-check library with minimum 100 iterations

- [ ] 7. Test integration with existing features
  - Test that text input field updates sample display correctly
  - Test that size controls work with both serif and sans-serif
  - Test that clearing input field shows default text
  - Verify smooth transitions between typeface changes
  - _Requirements: 3.1, 3.4, 3.5_

- [ ]* 7.1 Write property test for typeface independence from size changes
  - **Property 5: Typeface independence from size changes**
  - **Validates: Requirements 3.5**
  - Generate random font sizes
  - Select a typeface, change size, verify font-family unchanged
  - Test with both serif and sans-serif selections
  - Use fast-check library with minimum 100 iterations

- [ ]* 7.2 Write property test for active state styling
  - **Property 6: Active state styling consistency**
  - **Validates: Requirements 2.4**
  - Generate random button click sequences
  - Verify active button has correct CSS classes applied
  - Check for accent color background and elevated shadow
  - Use fast-check library with minimum 100 iterations

- [ ] 8. Test responsive behavior on mobile
  - Test toggle buttons on mobile viewport sizes
  - Verify buttons remain in Interactive Comparison section (not fixed)
  - Test touch interactions on mobile devices
  - Verify layout adjustments for smaller screens
  - _Requirements: 4.2, 4.4_

- [ ]* 8.1 Write unit tests for DOM structure
  - Test hero section contains zero toggle buttons
  - Test Interactive Comparison section contains two toggle buttons
  - Test buttons appear before text input in DOM order
  - Test default text appears when input is cleared
  - _Requirements: 1.4, 2.1, 3.4_

- [ ]* 8.2 Write unit tests for edge cases
  - Test behavior when no button is initially active
  - Test behavior with duplicate event listener prevention
  - Test navigation away and return resets state
  - Test invalid typeface data-type values default to serif
  - _Requirements: 5.4, 5.5_

- [ ] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Perform manual cross-browser testing
  - Test on Chrome (latest version)
  - Test on Firefox (latest version)
  - Test on Safari (latest version)
  - Test on mobile browsers (iOS Safari, Chrome Android)
  - _Requirements: All_

- [ ] 11. Final verification and cleanup
  - Review all code changes for consistency
  - Verify no console errors or warnings
  - Ensure all CSS styles apply correctly
  - Confirm all requirements are met
  - _Requirements: All_
