var configure = require("./tasks/configure");
var theme = require("./tasks/theme");
var c = require("./config");
var config = new c();

module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      themes: config.directories.themes,
      build: config.directories.build,
      dist: config.directories.dist,
      distumd: config.directories.distumd,
      www: config.directories.www,
      extension: config.directories.src + "/extensions/*/.build/*",
    },

<<<<<<< HEAD
    grunt.initConfig({

        clean: {
            themes: config.directories.themes,
            build: config.directories.build,
            dist: config.directories.dist,
            distumd: config.directories.distumd,
            www: config.directories.www,
            extension: config.directories.src + '/extensions/*/.build/*'
        },

        copy: {
            // bundle: {
            //     files: [
            //         // node modules to go in bundle.js
            //         {
            //             expand: true,
            //             flatten: true,
            //             cwd: '.',
            //             src: config.dependencies.bundle,
            //             dest: config.directories.lib
            //         }
            //     ]
            // },
            // everything first gets built into an intermediary .build folder
            // the contents of .build are then copied into the (cleaned) dist and www folders
            build: {
                files: [
                    // uv-dist-umd
                    {
                        expand: true,
                        cwd: config.directories.distumd,
                        src: ['**'],
                        dest: config.directories.build + '/' + config.directories.distumd + '/'
                    },
                    // assets
                    {
                        expand: true,
                        flatten: true,
                        src: [config.directories.lib + '/bundle.js'],
                        dest: config.directories.build + '/uv-assets/js/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: 'src/img/*',
                        dest: config.directories.build + '/uv-assets/img/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            config.directories.src + '/_headers',
                            config.directories.src + '/collection.json',
                            config.directories.src + '/favicon.ico',
                            config.directories.src + '/index.html',
                            config.directories.src + '/mobile.html',
                            config.directories.src + '/production.html',
                            config.directories.src + '/uv-config.json',
                            config.directories.src + '/uv-helpers.js',
                            config.directories.src + '/uv.css',
                            config.directories.src + '/uv.html'
                        ],
                        dest: config.directories.build + '/'
                    },
                    // extension configuration files
                    {
                        expand: true,
                        src: ['src/extensions/**/.build/*.config.json'],
                        dest: config.directories.build + '/uv-assets/config/',
                        rename: function(dest, src) {
                            // get the extension name from the src string.
                            // src/extensions/[extension]/[locale].config.json
                            var reg = /extensions\/(.*)\/.build\/(.*.config.json)/;
                            var extensionName = src.match(reg)[1];
                            var fileName = src.match(reg)[2];
                            return dest + extensionName + '.' + fileName;
                        }
                    }
                ]
=======
    copy: {
      bundle: {
        files: [
          // node modules to go in bundle.js
          {
            expand: true,
            flatten: true,
            cwd: ".",
            src: config.dependencies.bundle,
            dest: config.directories.lib,
          },
        ],
      },
      // everything first gets built into an intermediary .build folder
      // the contents of .build are then copied into the (cleaned) dist and www folders
      build: {
        files: [
          // uv-dist-umd
          {
            expand: true,
            cwd: config.directories.distumd,
            src: ["**"],
            dest:
              config.directories.build + "/" + config.directories.distumd + "/",
          },
          // assets
          {
            expand: true,
            flatten: true,
            src: [config.directories.lib + "/bundle.js"],
            dest: config.directories.build + "/uv-assets/js/",
          },
          {
            expand: true,
            flatten: true,
            src: "src/img/*",
            dest: config.directories.build + "/uv-assets/img/",
          },
          {
            expand: true,
            flatten: true,
            src: [
              config.directories.src + "/_headers",
              config.directories.src + "/collection.json",
              config.directories.src + "/favicon.ico",
              config.directories.src + "/index.html",
              config.directories.src + "/mobile.html",
              config.directories.src + "/production.html",
              config.directories.src + "/uv-config.json",
              config.directories.src + "/uv.css",
              config.directories.src + "/uv.html",
            ],
            dest: config.directories.build + "/",
          },
          // extension configuration files
          {
            expand: true,
            src: ["src/extensions/**/.build/*.config.json"],
            dest: config.directories.build + "/uv-assets/config/",
            rename: function(dest, src) {
              // get the extension name from the src string.
              // src/extensions/[extension]/[locale].config.json
              var reg = /extensions\/(.*)\/.build\/(.*.config.json)/;
              var extensionName = src.match(reg)[1];
              var fileName = src.match(reg)[2];
              return dest + extensionName + "." + fileName;
>>>>>>> webpack-al
            },
          },
        ],
      },
      www: {
        // copy contents of /.build to /www
        files: [
          {
            cwd: config.directories.build,
            expand: true,
            src: ["**"],
            dest: config.directories.www,
          },
        ],
      },
      dist: {
        // copy contents of /.build to /dist
        files: [
          {
            cwd: config.directories.build,
            expand: true,
            src: ["**"],
            dest: config.directories.dist,
          },
        ],
      },
    },

    sync: {
      themes: {
        files: [
          {
            cwd: config.directories.npmthemes,
            expand: true,
            src: ["uv-*-theme/**"],
            dest: config.directories.themes,
          },
        ],
      },
    },

<<<<<<< HEAD
        // concat: {
        //     bundle: {
        //         cwd: '.',
        //         src: config.dependencies.bundle,
        //         dest: config.directories.lib + '/bundle.js'
        //     }
        // },
=======
    concat: {
      bundle: {
        cwd: ".",
        src: config.dependencies.bundle,
        dest: config.directories.lib + "/bundle.js",
      },
    },
>>>>>>> webpack-al

    // replace all assets paths in built theme css files
    // I think this is now only needed for the mediaelement icons svg!
    replace: {
      // ../../../modules/<module>/assets/<asset>
      // becomes
      // ../../../<module>/<asset>
      moduleassets: {
        src: [config.directories.build + "/uv-assets/themes/*/css/*/theme.css"],
        overwrite: true,
        replacements: [
          {
            from: /\((?:'|"|)(?:.*modules\/(.*)\/assets\/(.*.\w{3,}))(?:'|"|)\)/g,
            to: "('../../assets/$1/$2')",
          },
        ],
      },
      // ../../../themes/uv-<extension>-theme/assets/<asset>
      // becomes
      // ../../assets/<asset>
      themeassets: {
        src: [config.directories.build + "/uv-assets/themes/*/css/*/theme.css"],
        overwrite: true,
        replacements: [
          {
            from: /\((?:'|"|)(?:.*themes\/(.*)\/assets\/(.*.\w{3,}))(?:'|"|)\)/g,
            to: "('../../assets/$2')",
          },
        ],
      },
    },

    configure: {
      apply: {
        options: {
          default: "en-GB",
        },
      },
    },

    theme: {
      create: {
        files: [
          {
            expand: true,
            src: "./src/extensions/*/theme/theme.less",
          },
        ],
      },
      dist: {},
    },

    webpack: {
      main: function() {
        var config = require("./webpack.config.js");
        config.mode = grunt.option("dist") ? "production" : "development";
        if (config.mode === "development") {
          config.devtool = "source-map";
        }
        return config;
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-sync");
  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-webpack");

  configure(grunt);
  theme(grunt);

  grunt.registerTask("default", ["build"]);

<<<<<<< HEAD
        grunt.task.run(
            'clean:themes',
            'clean:distumd',
            'sync',
            //'copy:bundle',
            //'concat:bundle',
            'clean:extension',
            'configure:apply',
            'clean:build',
            //'copy:schema',
            'webpack',
            'copy:build',
            'theme:create',
            'theme:dist',
            'replace:moduleassets',
            'replace:themeassets',
            'clean:dist',
            'clean:www',
            'copy:dist',
            'copy:www'
        );
    });
=======
  grunt.registerTask("build", "", function() {
    grunt.task.run(
      "clean:themes",
      "clean:distumd",
      "sync",
      "copy:bundle",
      "concat:bundle",
      "clean:extension",
      "configure:apply",
      "clean:build",
      //'copy:schema',
      "webpack",
      "copy:build",
      "theme:create",
      "theme:dist",
      "replace:moduleassets",
      "replace:themeassets",
      "clean:dist",
      "clean:www",
      "copy:dist",
      "copy:www"
    );
  });
>>>>>>> webpack-al
};
