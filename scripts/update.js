const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../../domains");
const reserved = require("../../util/reserved.json");

let combinedArray = [];

for (const subdomain of reserved) {
    combinedArray.push({
        owner: {
            username: "is-a-dev"
        },
        records: {
            "URL": "https://is-a.dev/reserved"
        },
        domain: `${subdomain}.is-a.dev`,
        subdomain: subdomain,
        reserved: true
    })
}

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

                delete item.owner.email;
            }

            combinedArray = combinedArray.concat(dataArray);

            if (combinedArray.length === files.length + reserved.length) {
                fs.writeFile("raw-api/index.json", JSON.stringify(combinedArray), (err) => {
                    if (err) throw err;
                });
            }
        });
    });
});
