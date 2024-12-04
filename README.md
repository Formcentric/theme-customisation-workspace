# Formcentric theme-customization workspace
### Create custom themes based on official formcentric themes

## installation

```bash
    pnpm i
```

## development server
```bash
    pnpm dev
```

## testing FC themes
The official themes will be copied to ```src/fc-themes``` when starting the development server. To test out included Formcentric themes change the fc-theme data-attribute of the formapp div inside ```src/index.html```. 

```
    data-fc-theme-dir="/src/fc-themes"
    data-fc-theme="<themeName>"
```

## creating a custom theme
Run this command to create a custom theme. The first argument is the name of the official theme you want to customize and the second argument specifies a name for your custom theme. 

The script will copy an existing fc-theme into your ```src/themes``` folder.

```
    pnpm fc-create-theme [fc-theme-name] [custom-theme-name]
```

## customizing
- To edit the css you can change the scss partials located in ```src/themes/[themeName]/partials``` 
- To edit the html markup you can change the js template files located in ```src/themes/[themeName]/templates```
