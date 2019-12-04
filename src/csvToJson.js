import csvtojson from "csvtojson";
import fs from "fs";

const csvToJson = () => {
  if (fs.existsSync("./example.txt")) {
    fs.unlinkSync("./example.txt");
  }
  csvtojson()
    .fromFile("./node_mentoring_t1_2_input_example.csv")
    .subscribe(
      json => {
        appendFile(json);
      },
      err => {
        console.log(err);
        throw new Error(err);
      },
      () => {
        console.log(
          `Successfully created file named example.txt with data from csv to json`
        );
      }
    );
};

const appendFile = json => {
  fs.appendFile("example.txt", JSON.stringify(json) + "\n", err => {
    if (err) {
      console.log("Failed to append txt file, ", err);
      throw new Error(err);
    }
  });
};

csvToJson();