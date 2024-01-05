# 💅 Styles
- [CSS Framework](#css-framework)
- [Fonts](#fonts)
- [Icons](#icons)
  - [Library icons](#library-icons)
  - [Custom Icons](#custom-icons)

## <a name="css-framework"></a> 🖼️  CSS Framework
This boilerplate uses [Bulma](https://bulma.io/documentation/) as the main css framework. As Bulma comes with too few utilities, classes and variables are added for spacing and typography, and other layout concerns (see `helpers.scss`).

⚠️ Bulma recently integrated a wider use of `!important` in its helpers classes. Be careful with classes used in components that may not be overriden afterwards.
### Customize
Go to `assets/styles/base/_variables.scss` and start replacing Bulma variables value with your own to custom the framework. See [Bulma customizable variables](https://bulma.io/documentation/customize/variables/)

👉 Visit `/design-system` to see how it affects styles and components.
Name	Size	Pixels	Preview
### Colors
Generate Bulma classes such as `has-background-$color` and `has-text-$color` with more colors than the default ones. Example for a custom color named `secondary` :
`````scss
// variables.scss
$secondary: #c499ea;
/* stylelint-disable function-name-case, function-no-unknown */
$secondary-invert: findColorInvert($secondary);
$secondary-light: findLightColor($secondary);
/* stylelint-enable function-name-case, function-no-unknown */
$custom-colors: (
  'secondary': $secondary,
  'secondary-light': $secondary-light,
  'secondary-invert': $secondary-invert,
);
`````
Now you can use `button is-secondary is-light` 🎉

Note that Bulma `findDarkColor()` does exist but doesn't work, Bulma issue 🤷

### Spacing
A multiple-of-4 scale is used to generate more spacing classes see override of Bulma variable `$spacing-values` in `variables.scss`. Classes works as specified in Bulma documentation.
### Font-Size
A more complete type scale is available with `.font-size-*`. Classes are generated with the same multiple-of-4 scale than for spacing. Note that Bulma typography sizes helpers are not overriden by those classes.
### Multiple of 4 scale
| Class suffix | Rem | px   |
| ------ | --- |------|
| auto | auto | auto
| 0 | 0 | 0px
| 0.5 | 0.125rem | 2px
| 1 | 0.25rem | 4px
| 1.5 | 0.375rem | 6px
| 2 | 0.5rem | 8px
| 2.5 | 0.625rem | 10px
| 3 | 0.75rem | 12px
| 3.5 | 0.875rem | 14px
| 4 | 1rem | 16px
| 5 | 1.25rem | 20px
| 6 | 1.5rem | 24px
| 7 | 1.75rem | 28px
| 8 | 2rem | 32px
| 9 | 2.25rem | 36px
| 10 | 2.5rem | 40px
| 11 | 2.75rem | 44px
| 12 | 3rem | 48px
| 4 | 3.5rem | 56px
| 16 | 4rem | 64px
| 20 | 5rem | 80px
| 24 | 6rem | 96px
| 28 | 7rem | 112px
| 32 | 8rem | 128px
| 36 | 9rem | 144px
| 40 | 10rem | 160px
| 44 | 11rem | 176px
| 48 | 12rem | 192px
| 52 | 13rem | 208px
| 56 | 14rem | 224px
| 60 | 15rem | 240px
| 64 | 16rem | 256px
| 68 | 17rem | 272px
| 72 | 18rem | 288px
| 76 | 19rem | 304px
| 80 | 20rem | 320px
| 84 | 21rem | 336px
| 88 | 22rem | 352px
| 92 | 23rem | 368px
| 96 | 24rem | 384px

## <a name="fonts"></a> 🔡  Fonts
The boilerplate does not come with a specific font.
### Add fonts
1. Go to `assets/styles/base/_fonts.scss` and follow the steps.
2. Customize Bulma fonts-related variables in `assets/styles/base/_variables.scss`.

👉 Visit `/design-system` to see how it affects text.

## <a name="icons"></a> ✳  Icons
The `Icon` component is designed to support custom icons and [Font Awesome](https://fontawesome.com/) icons. The component will check the custom icons library, then Font Awesome, and will finally render a bar `❚` if no icon was found.

👉 Visit `/design-system` to see available icons and their names.

### <a name="library-icons"></a> Library icons : Font Awesome
When `Icon` component meets a Font Awesome icon, it renders the `FontAwesomeIcon` component from the library. All properties supported by this component can be passed to `Icon` under the `iconLibraryProps` property. See [List of properties](https://fontawesome.com/v5/docs/web/use-with/react).
#### Add icons
1. Go to `services/fontAwesomeLibrary`
2. Add your icon in the import from `'@fortawesome/free-solid-svg-icons'` or from another type of icons (ex.: brands).
3. Pass your icon to the `library.add()` function

👉 `<FontAwesomeIcon>` component will search the icon by default in the solid library (aka `fas`). Specify the library your icon with an array `['fab', 'iconName']`.

#### Remove Font Awesome
1. Remove the `fontAwesomeLibrary` import in `src/index` and `services/index`
2. In `Icon.jsx` remove `FontAwesomeIcon`, `iconsList` import and the part in `renderIcon` that renders `FontAwesomeIcon`
3. Delete `services/fontAwesomeLibrary`
4. Uninstall all Font Awesome dependencies

### <a name="custom-icons"></a> Custom icons
#### Add a custom icon
1. Move your icon `.svg` file to `assets/img/icons/`
2. Open your icon file
3. Add an id : `icon-$name` (id has to be unique, kebab-cased, and not creating conflict with another icon library) as below
4. Remove `width` and `height` attributes.
5. Replace color codes with `currentColor` (except for colored icons such as flags)
6. Go to `assets/img/icons/index.js` and add an export line for your icon (use camelCase for you icon name here)

```html
<!-- Your icon file -->
<svg id="icon-chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
```
```js
// assets/img/icons/index.js
...
export { default as chevronLeft } from 'assets/img/icons/icon-chevron-left.svg';
```
Don't forget to remove `icon-kinoba.svg` from the assets 😉

#### Remove custom icons
1. Remove the `customIcons` import from `Icon.jsx` and the part in `renderIcon` that renders custom svg
2. Remove the whole icons folder in the assets