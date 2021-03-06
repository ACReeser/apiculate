apiculate
=========

Document, search, and live-query your APIs.

apic u late : 
  ending abruptly in a small distinct point

Apiculate is an HTML5 API documentation viewer that allows you to write up your endpoints in JSON, search them, group them, and send requests to your server.

## Project Setup

- Apiculate is an AngularJS app that takes JSON and renders it into a nice searchable view.
- A demo of apiculate out-of-the box is ~~here~~ coming soon!
- A demo of apiculate with the Gist API is ~~here~~ coming soon!

## Endpoint Format

For the complete documentation see [the ghpage](http://acreeser.github.io/apiculate)

```
apiculate = {
  endpoints: [
    {
      method: "GET",
      url: "/index.html",
      params: [
        {
          key: "cachebuster",
          type: "Number",
          example: 5
        }
      ]
    }
  ]
}
```

## Testing

Jasmine testing is planned

## Deploying

Apiculate is a set of static files. Just host them on any server (like Mongoose), add your own JSON via script ~~or by specifying a server endpoint~~ (coming soon!) and apiculate will render the view.


## Contributing changes
_Please open github issues_

### Dependencies
Creating a release requires several Grunt plugins:
- grunt-contrib-copy
- grunt-contrib-concat
- grunt-contrib-cssmin
- grunt-contrib-uglify
- grunt-contrib-compress
- grunt-html-smoosher
- grunt-useminPrepare
- grunt-usemin

After installing grunt and these plugins, run "grunt release" to minify, inline, and zip the source files.

## License
  MIT
