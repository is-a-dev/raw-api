const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../../domains");

let combinedArray = [];

fs.readdir(directoryPath, function (err, files) {
    if (err) throw err;

    files.forEach(function (file) {
        const filePath = path.join(directoryPath, file);

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) throw err;

            const dataArray = [JSON.parse(data)];

            for (const item of dataArray) {
                item.domain = path.parse(file).name + ".is-a.dev";
                item.subdomain = path.parse(file).name;

                item.owner.email = item.owner.email.replace(/@/, " (at) ");
            }

            combinedArray = combinedArray.concat(dataArray);

            if (combinedArray.length === files.length) {
                fs.writeFile("raw-api/index.json", JSON.stringify(combinedArray), (err) => {
                    if (err) throw err;
                });
            }
        });
    });
});
