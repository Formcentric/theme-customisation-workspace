# Formcentric Theme Customization Workspace

### Create custom themes based on official Formcentric themes

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Creating a Custom Theme](#creating-a-custom-theme)
4. [Customization](#customization)

---
## Installation

```bash
pnpm i
```

## Usage
### For Formcentric cloud users:
```bash
pnpm dev-cloud
```
#### Changing forms
You can change the preview form by using the dropdown in the sidebar. If you need to test your design with your custom form you can by adjusting the ```./config/cloudConfig.json``` file. The fcForms property holds the forms the sidebar dropdown will render. Add new objects for your own forms or remove existing ones.

```
{
    "id":  "<form-embed-id>", // see the screenshot below 
    "name": "Contact form" // this is used by the dropdown as a display name
},        
```

<img src="./assets/embed-id.png" alt="finding a form embed-id in the fc-cloud" width="800"/>


### For users with a self-hosted headless server:
1. Check if the URL of your headless-server matches the predefined URL in ```./config/localConfig.json``` (http://localhost:8080) and adjust it if needed.

2. Start the development server using

    ```bash
    pnpm dev-local
    ```
3. Set your form definition either in ```./config/localConfig.json``` or paste it inside the input field of our user interface (located in the sidebar below the *Formcentric* logo). <br>**NOTE:** If you decide to use the input the definition will only be saved in the apps localstorage. To permanently use the form definition adjust the **fcFormDefinition** property of the localConfig.json file.

## Creating a custom theme
Run this command to create a custom theme. The first argument specifies the name of the official theme you want to customize and the second argument specifies the name (which is also the foldername) of your custom theme. 

The script will copy an existing fc-theme into your ```src/themes``` folder. It will show up in the sidebar under custom themes.

```
    pnpm fc-create-theme [fc-theme-name] [custom-theme-name]
```

## Customization
- Tweak the theme by changing properties in _variables.json 
- To edit the css you can change the scss partials located in ```src/themes/[themeName]/partials``` 
- To edit the html markup you can change the js template files located in ```src/themes/[themeName]/templates```
