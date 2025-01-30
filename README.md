# Tailwind v4 testing

This is a test of using Tailwind v4 with Next.js to determine how install and control the classes it provides.

Some use cases:

1. Disable categories of classes we don't want available, like `bg-red-500`.
2. Reassign categories to use design system values. For example, use the design system's sizing scale of `sm`, `md`, etc.
3. Prevent Tailwind's default CSS resets from loading

```diff
- <div class="mb-4">box</div>
+ <div class="mb-sm">box</div>
```

## Configuration

Prior to version 4, Tailwind used a config file to determine what categories of classes to enable or redefine. With version 4, that configuration happens in a CSS file.

### Importing Tailwind

To use all of Tailwind, you add a single import statement in a CSS file:

```css
@import "tailwindcss";
```

Which imports three files:

- `theme.css`
- `preflight.css`
- `utilities.css`

It's possible to import these selectively. For example, if the project already has its `reset.css`, you can import only `theme.css` and `utilities.css`

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

You can also reassign utility classes. Here we're disabling the breakpoint category and creating new ones.

```css
@theme {
  --breakpoint-*: initial;

  /* Custom values */
  --breakpoint-sm: 30rem;
  --breakpoint-md: 60rem;
}
```

See [`globals.css`](https://github.com/genoni-studio/nextjs-tailwind-4/blob/main/src/app/globals.css) for a more complete example.

**Note:** this approach works for "themeable" categories, that is, groups of classes that could change from project to project. This includes color, font sizes, spacing, etc. Tailwind's documentation has a [list of themeable categories](https://tailwindcss.com/docs/theme#theme-variable-namespaces). Utility categories like `flex` cannot be disabled using the `@theme` approach.

## Editor setup

1. Developers should use the [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) plugin. This provides a number of useful features, including autocomplete and syntax highlighting.
2. Also helpful is Tailwind's [Prettier plug-in](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) that sorts classes in the editor. This plug-in has been installed in this demo repo.

See the [Editor setup](https://tailwindcss.com/docs/editor-setup) section in Tailwind's documentation for more details.

## Known issues

I found one issue with [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) plugin where disabled spacing values, like `pb-2`, appeared in the VS Code autocomplete even though there were, in fact, disabled in Tailwind and would not apply. There is an [issue](https://github.com/tailwindlabs/tailwindcss-intellisense/issues/1133) already tracking this problem and should be fixed by early Feb 2025.
