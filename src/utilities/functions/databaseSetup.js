import * as SQLite from "expo-sqlite/next";

const db = SQLite.openDatabaseSync("mtf.db");

export const initDB = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS Subject (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        objectID TEXT UNIQUE,
        name TEXT NOT NULL,
        isDone INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS Module (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        objectID TEXT UNIQUE,
        subject_object_id TEXT,
        subject_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        name TEXT NOT NULL,
        isDone INTEGER DEFAULT 0,
        FOREIGN KEY(subject_id) REFERENCES Subject(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS Lesson (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        objectID TEXT UNIQUE,
        module_object_id TEXT,
        module_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        isDone INTEGER DEFAULT 0,
        FOREIGN KEY(module_id) REFERENCES Module(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS Content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        objectID TEXT UNIQUE,
        lesson_object_id TEXT,
        lesson_id INTEGER NOT NULL,
        topic TEXT NOT NULL,
        isDone INTEGER DEFAULT 0,
        FOREIGN KEY(lesson_id) REFERENCES Lesson(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS Component (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        objectID TEXT UNIQUE,
        content_object_id TEXT,
        content_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        definition TEXT NOT NULL,
        image TEXT NOT NULL,
        video TEXT NOT NULL,
        isDone INTEGER DEFAULT 0,
        FOREIGN KEY(content_id) REFERENCES Content(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS ForDownloads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        objectID TEXT UNIQUE,
        image TEXT NOT NULL,
        video TEXT NOT NULL,
        downloaded INTEGER DEFAULT 0
      );
    `);

    console.log("✅ Database initialized successfully!");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
  }
};

export const insertOrIgnore = async (tableName, data) => {
  if (!tableName || typeof data !== "object" || !Object.keys(data).length) {
    throw new Error("Invalid table name or empty data object");
  }

  const keys = Object.keys(data);
  const placeholders = keys.map(() => "?").join(", ");
  const values = Object.values(data);

  const sql = `INSERT OR IGNORE INTO ${tableName} (${keys.join(
    ", "
  )}) VALUES (${placeholders})`;

  try {
    const result = await db.runAsync(sql, values);
    return result; // 0 if ignored
  } catch (error) {
    console.error(`Failed to insert or ignore into ${tableName}:`, error);
    throw error;
  }
};

export const updateItem = async (tableName, where, data) => {
  if (
    !tableName ||
    typeof data !== "object" ||
    !Object.keys(data).length ||
    typeof where !== "object" ||
    !Object.keys(where).length
  ) {
    throw new Error(
      "Invalid table name, empty data object, or missing WHERE clause"
    );
  }

  const setKeys = Object.keys(data);
  const setPlaceholders = setKeys.map((key) => `${key} = ?`).join(", ");
  const setValues = Object.values(data);

  const whereKeys = Object.keys(where);
  const wherePlaceholders = whereKeys.map((key) => `${key} = ?`).join(" AND ");
  const whereValues = Object.values(where);

  const sql = `UPDATE ${tableName} SET ${setPlaceholders} WHERE ${wherePlaceholders}`;

  try {
    const result = await db.runAsync(sql, [...setValues, ...whereValues]);
    return result;
  } catch (error) {
    console.error(`Failed to update ${tableName}:`, error);
    throw error;
  }
};

export const getItems = async (tableName, conditions = {}) => {
  if (!tableName) throw new Error("Table name is required");

  const keys = Object.keys(conditions);
  let sql = `SELECT * FROM ${tableName}`;
  let values = [];

  if (keys.length > 0) {
    const whereClause = keys.map((key) => `${key} = ?`).join(" AND ");
    sql += ` WHERE ${whereClause}`;
    values = Object.values(conditions);
  }

  try {
    const rows = await db.getAllAsync(sql, values);
    if (rows.length === 0) return null;
    if (rows.length === 1) return rows[0];
    return rows;
  } catch (error) {
    console.error(`Failed to get items from ${tableName}:`, error);
    throw error;
  }
};

export const getItemsArray = async (tableName, conditions = {}) => {
  if (!tableName) throw new Error("Table name is required");

  const keys = Object.keys(conditions);
  let sql = `SELECT * FROM ${tableName}`;
  let values = [];

  if (keys.length > 0) {
    const whereClause = keys.map((key) => `${key} = ?`).join(" AND ");
    sql += ` WHERE ${whereClause}`;
    values = Object.values(conditions);
  }

  try {
    const rows = await db.getAllAsync(sql, values);
    return rows;
  } catch (error) {
    console.error(`Failed to get items from ${tableName}:`, error);
    throw error;
  }
};
