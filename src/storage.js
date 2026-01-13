import { app } from "electron";
import filesystem from "fs";
import path from "path";

const dataPath = path.join(app.getPath("userData"), "data.json");

function readData() {
	try {
		return JSON.parse(filesystem.readFileSync(dataPath, "utf8"));
	} catch (error) {
	}
	return {};
}

export const set = (key, val) => {
	const data = readData();
	data[key] = val;
	filesystem.writeFileSync(dataPath, JSON.stringify(data));
};

export const get = key => readData()[key];

export default {
    get,
    set
}