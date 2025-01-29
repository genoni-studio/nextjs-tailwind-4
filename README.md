# Tailwind v4 testing

This is a test of using Tailwind v4 with Next.js to determine how best to disable categories and re-map them to custom themes.

For example, we may want to use our own spacing values from our design system instead of the default Tailwind theme.

```diff
- <div class="mb-4">box</div>
+ <div class="mb-sm">box</div>
```

## Configuration

Prior to version 4, Tailwind used a config file to determine what categories of classes to load. With version 4, that configuration happens in a CSS file.
To disable categories, for example the all color classes, you use the following syntax:

```css
@theme {
  --color-*: initial;
}
```

You can also reassign utility classes. Here we're disabling the default breakpoint classes and creating new ones.

```css
@theme {
  --breakpoint-*: initial;

  /* Custom values */
  --breakpoint-sm: 30rem;
  --breakpoint-md: 60rem;
}
```

Note: this approach works for "themeable" categories, that is, groups of classes that could change from project to project. The Tailwind docs have a [list of themeable categories](https://tailwindcss.com/docs/theme#theme-variable-namespaces). Layout classes like `flex` cannot be disabled using the `@theme` approach.
