# FreeSWITCH Documentation

This repository contains the documentation for FreeSWITCH, published at https://developer.signalwire.com/freeswitch.

## Instructions for contributors
### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Building the Docker image

```
$ docker build -t freeswitch-docs .
$ docker run --rm -it -p 8080:80 freeswitch-docs
```

The site will be available on port 8080 on your local machine.
