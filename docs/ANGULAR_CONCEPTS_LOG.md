# Angular Concepts Log

This document tracks the Angular concepts implemented in the **ThoughtNotes UI** project, organized chronologically based on the commit history. It serves as a learning log and reference for the features and patterns used.

---

## 1. Project Setup & Basic Structure
**Commit:** *Initial commit* (2025-04-06)
*   **Angular CLI**: Initializing a new Angular project.
*   **Project Structure**: Understanding the standard Angular folder structure (`src/app`, `assets`, `environments`).

## 2. Layout & Component Architecture
**Commit:** *Setting a canvas - Header, Footer, Sidebar - WIP* (2025-04-07)
*   **Components**: Creating basic UI building blocks (Header, Footer, Sidebar).
*   **Templates**: Using HTML templates for component structure.
*   **Styles**: Applying component-specific SCSS.

## 3. HTTP Client & Data Display
**Commit:** *Daynotes Cards are listed. Added HTTPClient.* (2025-04-13)
*   **HttpClientModule**: Importing and configuring `HttpClient` to make API requests.
*   **Observables**: Basic usage of RxJS Observables to handle HTTP responses.
*   **Directives**: Using `*ngFor` to iterate over a list of items and display cards.

## 4. Component Communication & Inputs
**Commit:** *Folders re-structured. Added Focus Header* (2025-04-17)
*   **@Input()**: Passing data from a parent component to a child component (Focus Header).
*   **Folder Structure**: Organizing components into feature-based directories for better maintainability.

## 5. Backend Integration & Mock Server
**Commit:** *Added Server for API integration...* (2025-04-27)
*   **Mock Backend**: Setting up a local server to simulate API responses.
*   **Development Environment**: Configuring the app to talk to a local API during development.

## 6. Advanced Component Design & Context
**Commit:** *Basic Sidebar design complete. Smarter Focus Header with Focus Context* (2025-04-27)
*   **Interfaces**: Defining TypeScript interfaces (e.g., `FocusContext`) to type-check data passed between components.
*   **Smart vs. Dumb Components**: Separating logic (Smart) from presentation (Dumb).

## 7. Architecture Patterns: Ports & Adapters
**Commit:** *Adding adaptability for API vs other types of backends...* (2025-05-03)
*   **Dependency Injection (DI)**: Injecting services into components.
*   **Ports and Adapters (Hexagonal Architecture)**: Abstracting data access behind an interface (`DataRepositoryPort`) to allow switching between different data sources (API, LocalStorage) without changing the business logic.

## 8. Routing & Navigation Basics
**Commit:** *Preparing for routing. Added a Dashboard component...* (2025-05-10)
*   **RouterOutlet**: Defining where routed components should be rendered.
*   **Container Components**: Creating a Dashboard component to act as a container for the main view.

## 9. Refactoring & Naming Conventions
**Commit:** *Renamed daynote to thoughtnote everywhere in UI APP.* (2025-05-18)
*   **Refactoring**: Renaming components and services to better reflect the domain language.
*   **Consistency**: Ensuring naming conventions are consistent across the codebase.

## 10. Layouts & View Encapsulation
**Commit:** *Building Tabbed & Filter Layout...* (2025-05-18)
*   **View Encapsulation**: Managing how styles are applied to components (default Emulated).
*   **Complex Layouts**: Creating tabbed interfaces and filter sidebars.

## 11. Routing Strategies
**Commit:** *Removed Ng Router-based navigation...* (2025-07-24)
*   **State Management**: Experimenting with managing state locally instead of relying solely on the URL.
*   **Component Interaction**: Using inputs and outputs to control view state.

## 12. Dynamic Routing with Parameters
**Commit:** *Implement Routing with Parameters...* (2025-08-23)
*   **Route Parameters**: Using `:dataRange` in routes to fetch specific data (Daily, Weekly, Monthly).
*   **ActivatedRoute**: Accessing route parameters inside a component.

## 13. Forms & Validation (Template-Driven & Reactive)
**Commit:** *Add Thought Note form component...* (2025-10-25) & *Add reactive Thought Note form...* (2025-11-02)
*   **Reactive Forms**: Using `FormGroup`, `FormControl`, and `Validators` for robust form handling.
*   **Angular Material Forms**: Integrating Material Design form controls (`MatInput`, `MatSelect`, `MatDatepicker`).
*   **Validation**: Implementing required fields and custom validation logic.

## 14. Signals (State Management)
**Commit:** *Using Signal for Geographical Location in Focus Context* (2025-10-31)
*   **Angular Signals**: Using `signal()` for reactive state management.
*   **Computed Signals**: Deriving state from other signals.
*   **Effects**: Reacting to signal changes (though primarily used for side effects).

## 15. Directives (Custom)
**Commit:** *Implemented highlighted directive...* (2025-12-27)
*   **Custom Directives**: Creating a reusable attribute directive (`[highlighted]`) to manipulate DOM elements.
*   **@HostBinding**: Binding host element properties (like class or style) from within the directive.

## 16. Event Handling & Component Outputs
**Commit:** *Implemented Multiple Selection and Deletion...* (2025-12-27)
*   **@Output() & EventEmitter**: Emitting custom events from child to parent components.
*   **Event Bubbling**: Handling events up the component tree.

## 17. Lazy Loading
**Commit:** *Implementation of PIPEs and Lazy Loading in Routing* (Today)
*   **Lazy Loading**: Loading feature modules or components only when requested to improve initial load time.
*   **Routes Configuration**: Setting up `loadComponent` or `loadChildren` in the router config.

## 18. Pipes (Custom & Built-in)
**Commit:** *Implementation of PIPEs and Lazy Loading in Routing* (Today)
*   **Custom Pipes**: Creating a pipe (`MoodToEmojiPipe`) to transform data in the template.
*   **Pure vs. Impure Pipes**: Understanding when pipes re-evaluate.
*   **Async Pipe**: Using `| async` to subscribe to Observables directly in the template.

## 19. Control Value Accessor (CVA)
**Commit:** *Control Value Accessor example using a MoodSelector Component* (Today)
*   **ControlValueAccessor Interface**: Creating custom form controls that integrate seamlessly with Angular Forms API.
*   **writeValue, registerOnChange, registerOnTouched**: Implementing the core methods to sync model and view.

## 20. CSS Flexbox & Layout
**Commit:** *CSS Flexbox Practice...* (Today)
*   **Flexbox**: Using CSS Flexbox for responsive 1D layouts (Row/Column).
*   **Responsive Design**: Adjusting layouts based on screen size.

## 21. Advanced Data Persistence & RxJS
**Commit:** *Refactor data handling: Update ApiDataAdapter...* (Today)
*   **Local Storage**: Implementing a `LocalStorageAdapter` to persist data in the browser.
*   **RxJS Subjects**: Using `Subject` to trigger manual refreshes (`refreshNeeded$`).
*   **SwitchMap / Tap**: Using RxJS operators to handle side effects and chain observable streams.
