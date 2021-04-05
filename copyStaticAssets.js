const shell = require("shelljs");

shell.mkdir("dist/models/migration_seeds/");
shell.cp("-R", "src/models/migration_seeds/*.json", "dist/models/migration_seeds/");
shell.cp("-R", "src/swagger.json", "dist/");
shell.cp(".env", "dist/.env");
