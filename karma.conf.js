module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {
        // Puedes configurar opciones de Jasmine aquí
      },
      clearContext: false, // Deja visible el informe en el navegador
    },
    jasmineHtmlReporter: {
      suppressAll: true, // Elimina los detalles duplicados de pruebas fallidas
    },
    reporters: ["progress", "kjhtml"], // Habilita el reporte HTML
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
    coverageReporter: {
      type: "html",
      dir: require("path").join(__dirname, "./coverage/"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
  });
};
