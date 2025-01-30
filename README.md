# Tailwind v4 testing

This is a test of using Tailwind v4 with Next.js to determine how install and configure Tailwind v4.

Use cases:

1. Disable categories of classes we don't want available, like `bg-red-500`.
2. Reassign categories to use design system values. For example, use the design system's sizing scale of `sm`, `md`, etc.
3. Prevent Tailwind's default CSS resets from loading.

## Configuration

Prior to version 4, Tailwind used a `tailwind.config.js` [configuration file](https://v3.tailwindcss.com/docs/theme) to determine the categories of classes to enable or redefine. With version 4, that configuration happens in a CSS file.

[`globals.css`](https://github.com/genoni-studio/nextjs-tailwind-4/blob/main/src/app/globals.css) is an example of configuring Tailwind v4 and is discussed here.

### Importing Tailwind

To use all of Tailwind, you add a single import statement in a CSS file:

```css
@import "tailwindcss";
```

Which imports three files:

- `theme.css`
- `preflight.css`
- `utilities.css`

It's possible to import these selectively. For example, if the project already has a `reset.css`, you can import only `theme.css` and `utilities.css`

```diff
+ @layer theme, base, components, utilities;
+ @import "tailwindcss/theme.css" layer(theme);
- @import "tailwindcss/preflight.css" layer(base);
+ @import "tailwindcss/utilities.css" layer(utilities);
```

See Tailwind's [Preflight](https://tailwindcss.com/docs/preflight) documentation for more.

### Disable and re-map utility categories

To disable categories, for example all color utility classes, you use the following syntax:

```css
@theme {
  --color-*: initial;
}
```

You can also reassign utility classes. Here we're disabling the breakpoint category and adding custom breakpoints.

```css
@theme {
  /* Disables Tailwind's defaults */
  --breakpoint-*: initial;

  /* Custom values */
  --breakpoint-sm: 30rem;
  --breakpoint-md: 60rem;

  /* or ... */
  --breakpoint-tablet: 30rem;
  --breakpoint-desktop: 60rem;
}
```

and in the HTML:

```html
<div class="sm:flex-col">box</div>
```

or, if using the `--breakpoint-tablet: 30rem` configuration:

```html
<div class="tablet:flex-col">box</div>
```

Similarly, we can reassign the default `spacing` classes to use the design system scale.

```css
@theme {
  /* Disables Tailwind's defaults */
  --spacing-*: initial;

  /* Custom values */
  --spacing-xxx-sm: 0.125rem;
  --spacing-xx-sm: 0.25rem;
  --spacing-x-sm: 0.5rem;
  --spacing-sm: 0.75rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.25rem;
  --spacing-x-lg: 1.5rem;
  --spacing-xx-lg: 2rem;
  --spacing-xxx-lg: 2.5rem;
}
```

and in the HTML:

```diff
- <div class="mb-4">box</div>
- <div class="p-2">box</div>
+ <div class="mb-sm">box</div>
+ <div class="p-x-sm">box</div>
```

**Note:** this approach works for "themeable" categories, that is, groups of classes that could change from project to project. This includes color, font sizes, spacing, etc. Tailwind's documentation has a [list of themeable categories](https://tailwindcss.com/docs/theme#theme-variable-namespaces). Utility categories like `flex` cannot be disabled or remapped using the `@theme` approach.

## Dark mode

In both options, a user preference would use JavaScript to set a `data-attr` or `class` to control light/dark mode.

### Option 1

This is essential the same as it has in the past. We define a variable with a light color and scope the dark color.

```css
:root {
  --color-fg-base: black;
  --color-bg-base: white;
}

[data-theme="dark"] {
  --color-fg-base: white;
  --color-bg-base: black;
}

/* Custom utility classes */

@utility fg-base {
  color: var(--color-fg-base);
}

@utility bg-base {
  background-color: var(--color-bg-base);
}
```

### Option 2

This uses the more modern [`light-dark()` CSS function](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark). This has a few advantages:

1. Easier to grep and troubleshoot.
2. All CSS variables are grouped together under `:root` instead of dividing up and scoping the light and dark variables.
3. Makes forcing light or dark mode easier.

It has [good browser support](https://caniuse.com/?search=light-dark).

```css
:root {
  color-scheme: light dark;
}

:root {
  --color-black: black;
  --color-white: white;
}

/* Force dark/light mode  */

[data-theme="light"] {
  color-scheme: light;
}

[data-theme="dark"] {
  color-scheme: dark;
}

/* Custom utility classes */

@utility fg-base {
  color: light-dark(var(--color-black), var(--color-white));
}

@utility bg-base {
  background-color: light-dark(var(--color-white), var(--color-black));
}
```

#### Usage:

- [`layout.tsx`](https://github.com/genoni-studio/nextjs-tailwind-4/blob/f24d377b4e661507e19c1432461eef48cba3c61a/src/app/layout.tsx#L26) has example of `fg-base` and `[data-theme="dark"]`.
- [`page.tsx`](https://github.com/genoni-studio/nextjs-tailwind-4/blob/f24d377b4e661507e19c1432461eef48cba3c61a/src/app/page.tsx#L3) has example of `fg-base`.

By using the `@utility` function, Tailwind will be aware of this class and will include it in the autocomplete. And like all Tailwind classes, this CSS won't be included in the bundle if the class is not used.

## Custom classes

Similar to above, entirely custom classes can be added:

```css
@utility foobar {
  background: purple;
}
```

## Editor setup

1. Developers should use the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) plugin. This provides a number of useful features, including autocomplete and syntax highlighting.
2. Also strongly recommended is Tailwind's [Prettier plug-in](https://github.com/tailwindlabs/prettier-plugin-tailwindcss), installed in the project, that sorts classes and cleans up whitespace in the editor. This plug-in has been installed in this demo repo.

See the [Editor setup](https://tailwindcss.com/docs/editor-setup) section in Tailwind's documentation for more details.
