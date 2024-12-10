# Formcentric theme-customization-workspace
### Create custom themes based on official formcentric themes

## installation

```bash
    pnpm i
```
## env file
To successfully render forms you will need to create an env file.
```
cp .env.sampel .env
```

```
# Configure the port the development server will use
VITE_FC_PORT=1234

# Set the following variables only if you are using FC-Cloud
VITE_FC_CLOUD=true
VITE_FC_URL='<headless-server-url>'

# Use a proxy domain which needs to be added in your cloud instance 
# under admin-center/organization
VITE_FC_PROXY_URL='<proxy-url>'
```

## development server
```bash
    pnpm dev
```

## testing FC themes
The official themes will be copied to ```src/fc-themes``` when starting the development server. Use the sidebar to switch between themes and find one that you want to use for your custom theme.

## creating a custom theme
Run this command to create a custom theme. The first argument specifies the name of the official theme you want to customize and the second argument specifies the name (which is also the foldername) of your custom theme. 

The script will copy an existing fc-theme into your ```src/themes``` folder. It will show up in the sidebar under custom themes.

```
    pnpm fc-create-theme [fc-theme-name] [custom-theme-name]
```

## customizing
- Tweak the theme by changing properties in _variables.json 
- To edit the css you can change the scss partials located in ```src/themes/[themeName]/partials``` 
- To edit the html markup you can change the js template files located in ```src/themes/[themeName]/templates```
