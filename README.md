# Formcentric Theme Customisation Workspace

Welcome to the Formcentric Theme Customisation Workspace! This toolkit allows you to customise Formcentric themes by modifying existing ones or creating your own. 
Adjust theme variables, SCSS partials, and JavaScript templates to tailor the design, markup, and styling of your forms. 
You can also add fonts and images and export your customisations for different target environments.

## Requirements
- Use the node version specified in `.nvmrc`
- [Install pnpm](https://pnpm.io/installation)
- Install dependencies using:

```bash
pnpm i
```

**Note: If you're using Windows, we highly recommend running a Linux virtual machine or using the Windows Subsystem for Linux (WSL). Currently, the Workspace is not actively tested or officially supported on Windows.**

## Usage with Formcentric-Cloud
Start the development server using
```bash
pnpm dev-cloud
```

## Usage with a self-hosted headless server


Make sure that the URL of your headless server matches the URL defined in the
`./config/local.config.json` file (initially set to http://localhost:8080).
If necessary, adjust to match.


Specify your form definition. You do this either by: <br>
– adding the definition into the input field on the user interface <br>
– or changing the `formDefinition` property in `./config/local.config.json`

Start the development server using:

```bash
pnpm dev-local
```

## Documentation

The documentation is available in the `docs` folder. To open it run:

```bash
pnpm storybook
```

## What You Can Do

### 🎨 Create Custom Themes

Start from scratch, customise or extend existing themes to match your brand identity perfectly. Choose from three flexible approaches:

- Extended FC Theme
- Full FC Theme
- Custom Theme

Create a custom theme using
 ```bash
pnpm create-theme
```

### 🛠️ Customise With Ease

Make your theme unique with multiple customisation options:

- CSS Variables
- SCSS Partials
- JavaScript Templates

### 🔄 Live Preview

Test your changes in real-time with:

- Built-in development server
- Form preview
- Instant style updates

## Why Use This Workspace?

- **Flexible**: Customise at the level that fits your needs.
- **Maintainable**: Follow a structured approach to theme development.
- **Professional**: Built on official Formcentric themes.
- **Efficient**: Live preview and hot reloading for faster development.

