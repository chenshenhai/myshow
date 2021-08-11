import path from 'path';
import fs from 'fs';

export function removeFullDir(dirPath: string) {
  let files = [];
	if (fs.existsSync(dirPath)) {
		files = fs.readdirSync(dirPath);
		files.forEach((filename) => {
      let curPath = path.join(dirPath, filename);
      const stat = fs.statSync(curPath);
			if(stat.isDirectory()) {
				removeFullDir(curPath);
			} else if (stat.isFile()) {
        // fs.unlinkSync(curPath);
        fs.rmSync(curPath);
      } else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(dirPath);
	}
}

export function makeFullDir(dirPath: string) {
	if (fs.existsSync(dirPath)) {
		return true;
	} else {
		if (makeFullDir(path.dirname(dirPath))) {
			fs.mkdirSync(dirPath);
			return true;
		}
	}
}