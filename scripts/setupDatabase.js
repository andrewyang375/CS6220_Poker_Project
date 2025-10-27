import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database setup for future use
const setupDatabase = () => {
  const dbPath = path.join(__dirname, '..', 'data', 'poker_quiz.db');
  
  // Ensure data directory exists
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    // Create poker_quiz table
    db.run(`
      CREATE TABLE IF NOT EXISTS poker_quiz (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        wrong_answer1 TEXT NOT NULL,
        wrong_answer2 TEXT NOT NULL,
        wrong_answer3 TEXT NOT NULL,
        difficulty_level TEXT DEFAULT 'Intermediate',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index for better performance
    db.run(`CREATE INDEX IF NOT EXISTS idx_difficulty ON poker_quiz(difficulty_level)`);
    
    console.log('Database setup completed successfully!');
    console.log(`Database location: ${dbPath}`);
  });

  db.close();
};

// Function to populate database from the generated poker data
const populateDatabase = () => {
  const dbPath = path.join(__dirname, '..', 'data', 'poker_quiz.db');
  const db = new sqlite3.Database(dbPath);

  // Read the generated poker data
  const pokerDataPath = path.join(__dirname, '..', 'src', 'data', 'QuizQuestions', 'poker.ts');
  const pokerDataContent = fs.readFileSync(pokerDataPath, 'utf8');
  
  // Extract the questions from the TypeScript file
  const questionsMatch = pokerDataContent.match(/questions:\s*\[(.*?)\]/s);
  if (!questionsMatch) {
    console.error('Could not extract questions from poker.ts');
    return;
  }

  // This is a simplified version - in production, you'd want to properly parse the TypeScript
  console.log('Database setup script created. To populate with real data, implement proper parsing of the poker.ts file.');
  
  db.close();
};

// Run setup
setupDatabase();
populateDatabase();
