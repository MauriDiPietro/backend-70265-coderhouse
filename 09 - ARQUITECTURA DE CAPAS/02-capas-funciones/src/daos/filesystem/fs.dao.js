import fs from "fs";
const path = './users.json'

const getMaxId = async () => {
  let maxId = 0;
  const items = await getAll();
  items.map((item) => {
    if (item.id > maxId) maxId = item.id;
  });
  return maxId;
};

export const getAll = async () => {
  try {
    if (fs.existsSync(path)) {
      const items = await fs.promises.readFile(path, "utf-8");
      const itemsJSON = JSON.parse(items);
      return itemsJSON;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    const item = {
      id: (await getMaxId()) + 1,
      ...obj,
    };
    const itemsFile = await getAll();
    itemsFile.push(item);
    await fs.promises.writeFile(path, JSON.stringify(itemsFile));
    return item;
  } catch (error) {
    throw new Error(error);
  }
};
