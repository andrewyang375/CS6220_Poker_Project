# Poker Theory Practice

A comprehensive poker strategy learning platform with interactive flashcards and AI explanations. Master poker theory through hands-on practice with realistic scenarios and detailed feedback.

## 🎯 Features

- **5 Poker Strategy Categories**: Pre-Flop, Post-Flop, Tournament, Cash Game, and Mixed Practice
- **Interactive Flashcards**: 4 multiple choice answers per question with detailed explanations
- **AI Explanations**: Learn why each answer is correct or incorrect
- **No Time Pressure**: Take your time to understand each concept
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable learning

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CS6220_Poker_Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎮 How It Works

### Quiz Categories

1. **Pre-Flop Strategy** - Position, hand selection, and opening ranges
2. **Post-Flop Play** - Betting, bluffing, value betting, and board texture
3. **Tournament Strategy** - Stack management, ICM, and tournament decisions
4. **Cash Game Theory** - Bankroll management and table dynamics
5. **Mixed Practice** - Random selection from all categories

### Learning Flow

1. **Select a Category** - Choose from 5 poker strategy topics
2. **Answer Questions** - Read realistic poker scenarios and select your response
3. **Get AI Feedback** - Receive detailed explanations for each answer choice
4. **Learn Theory** - Understand the reasoning behind correct poker decisions
5. **Track Progress** - See your results and improve over time

### Question Format

Each question presents a realistic poker scenario with:
- **Specific hand notation** (A♠ K♣, Q♠ Q♣, etc.)
- **4 answer choices** with different strategic options
- **Detailed explanations** for why each answer is correct or incorrect
- **Poker theory insights** and learning tips

## 🛠️ Development

### Project Structure

```
src/
├── components/          # React components
│   ├── ExplanationModal/    # AI explanation popup
│   ├── QuestionScreen/      # Quiz interface
│   ├── QuizTopicsScreen/    # Category selection
│   └── ResultScreen/        # Results display
├── data/               # Quiz questions and topics
│   └── QuizQuestions/      # Question data files
├── context/            # React context for state management
├── hooks/              # Custom React hooks
└── utils/              # Helper functions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Questions

1. Open the appropriate category file in `src/data/QuizQuestions/`
2. Add a new question object with:
   - `question`: The poker scenario
   - `choices`: Array of 4 answer options
   - `correctAnswers`: Array with the correct answer
   - `explanations`: Object with explanations for each choice
   - `score`: Points for correct answer

Example:
```typescript
{
  "question": "You're in early position with A♠ K♣. Action is to you. What should you do?",
  "choices": ["Raise to 3x", "Call", "Fold", "Raise to 5x"],
  "correctAnswers": ["Raise to 3x"],
  "score": 10,
  "explanations": {
    "Raise to 3x": "AK is a premium hand that should be raised for value.",
    "Call": "Calling with AK from early position is too passive.",
    "Fold": "Folding AK would be a major mistake.",
    "Raise to 5x": "5x is too large and will fold out too many hands."
  }
}
```

## 🎯 Learning Objectives

This app helps you master:

- **Position Play** - Understanding table position and its impact on decisions
- **Hand Selection** - Knowing which hands to play in different situations
- **Bet Sizing** - Choosing appropriate bet sizes for different scenarios
- **Bluffing Theory** - When and how to bluff effectively
- **Value Betting** - Extracting maximum value from strong hands
- **Tournament Strategy** - ICM considerations and stack management
- **Cash Game Theory** - Bankroll management and table dynamics

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- Real AI integration for explanations
- User progress tracking and statistics
- Difficulty levels and adaptive learning
- Multiplayer quiz modes
- Integration with poker training sites
- Mobile app development

---

**Ready to improve your poker game? Start practicing now!** 🃏