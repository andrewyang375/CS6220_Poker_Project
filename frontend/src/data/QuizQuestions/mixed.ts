
import { Topic } from '.'

export const mixed: Topic = {
  "topic": "Mixed Practice",
  "level": "Intermediate",
  "totalQuestions": 10,
  "totalScore": 100,
  "questions": [
    {
      "question": "You're in a tournament with 12 big blinds. You're in the cutoff with A♠ K♣. UTG raises to 2.5x, MP calls, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Fold",
        "All-in",
        "Raise to 6x"
      ],
      "type": "MCQs",
      "correctAnswers": ["All-in"],
      "score": 10,
      "explanations": {
        "Call": "Calling with AK and 12 BBs is too passive. You want to get all-in with this hand.",
        "Fold": "Folding AK with 12 BBs would be a major mistake. This is a premium hand that should be played aggressively.",
        "All-in": "Correct! With 12 BBs and AK, you should go all-in. This hand is too strong to fold and you want to maximize fold equity.",
        "Raise to 6x": "Raising to 6x with 12 BBs is too small. You're committing too many chips to not go all-in."
      }
    },
    {
      "question": "You're playing a $1/$2 cash game. You raised pre-flop with A♠ K♣ and the flop comes A♦ 7♠ 2♣. UTG bets $8, MP calls, and action is to you. What should you do?",
      "choices": [
        "Raise to $25",
        "Call",
        "Fold",
        "Raise to $40"
      ],
      "type": "MCQs",
      "correctAnswers": ["Raise to $25"],
      "score": 10,
      "explanations": {
        "Raise to $25": "Correct! You have top pair with top kicker on a dry board. Raising builds the pot and gets value from worse aces.",
        "Call": "Calling is too passive. You want to raise for value and protect against draws.",
        "Fold": "Folding top pair with top kicker would be a major mistake. This is a strong hand.",
        "Raise to $40": "This is too large. It will fold out too many hands that you want to get value from."
      }
    },
    {
      "question": "You're in early position (UTG) at a 6-max table with Q♠ Q♣. Action is to you. What should you do?",
      "choices": [
        "Raise to 3x",
        "Call",
        "Fold",
        "Raise to 5x"
      ],
      "type": "MCQs",
      "correctAnswers": ["Raise to 3x"],
      "score": 10,
      "explanations": {
        "Raise to 3x": "Correct! QQ is a premium hand that should be raised for value. 3x is the standard sizing from UTG.",
        "Call": "Calling with QQ from UTG is too passive. You want to raise for value and narrow the field.",
        "Fold": "Folding QQ from UTG would be a major mistake. This is a premium hand.",
        "Raise to 5x": "5x is too large from UTG. It will fold out too many hands and reduce your potential winnings."
      }
    },
    {
      "question": "You're on the button with 9♠ 8♠. The flop comes 7♠ 6♣ 2♠. UTG bets $10, MP calls, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Raise to $30",
        "Fold",
        "Raise to $50"
      ],
      "type": "MCQs",
      "correctAnswers": ["Raise to $30"],
      "score": 10,
      "explanations": {
        "Call": "Calling is too passive. You have a straight draw and flush draw - this is a very strong hand that should be raised.",
        "Raise to $30": "Perfect! You have a straight draw and flush draw. Raising builds the pot and gives you multiple ways to win.",
        "Fold": "Folding with a straight draw and flush draw would be a major mistake. This is a very strong drawing hand.",
        "Raise to $50": "This is too large. It will fold out too many hands and reduce your potential winnings."
      }
    },
    {
      "question": "You're in a tournament with 8 big blinds. You're in the small blind with 7♠ 6♠. The button raises to 2.5x, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Fold",
        "All-in",
        "Raise to 4x"
      ],
      "type": "MCQs",
      "correctAnswers": ["All-in"],
      "score": 10,
      "explanations": {
        "Call": "Calling with 8 BBs is too passive. You need to be aggressive to survive in tournaments.",
        "Fold": "Folding 76s with 8 BBs is too tight. This is a good hand to shove with for fold equity.",
        "All-in": "Correct! With 8 BBs and 76s, you should go all-in. You have good fold equity and can win the pot without a showdown.",
        "Raise to 4x": "Raising to 4x with 8 BBs is too small. You're committing too many chips to not go all-in."
      }
    },
    {
      "question": "You're playing a $2/$5 cash game. You're in the big blind with K♠ Q♣. The flop comes K♦ 9♠ 3♣. UTG bets $12, MP calls, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Raise to $35",
        "Fold",
        "Raise to $60"
      ],
      "type": "MCQs",
      "correctAnswers": ["Call"],
      "score": 10,
      "explanations": {
        "Call": "Correct! You have top pair with a good kicker on a dry board. Calling is the right play to keep the pot manageable.",
        "Raise to $35": "Raising is too aggressive. You want to keep the pot small and see what develops on the turn.",
        "Fold": "Folding top pair with a good kicker would be a major mistake. This is a strong hand.",
        "Raise to $60": "This is way too large. It will fold out too many hands and reduce your potential winnings."
      }
    },
    {
      "question": "You're in middle position with A♠ A♣. The flop comes A♦ 7♠ 2♣. UTG bets $15, MP calls, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Raise to $45",
        "Fold",
        "Raise to $75"
      ],
      "type": "MCQs",
      "correctAnswers": ["Raise to $45"],
      "score": 10,
      "explanations": {
        "Call": "Calling is too passive. You have a set of aces - this is an extremely strong hand that should be raised for value.",
        "Raise to $45": "Perfect! You have a set of aces. Raising builds the pot and gets value from worse hands.",
        "Fold": "Folding a set of aces would be a major mistake. This is one of the strongest hands in poker.",
        "Raise to $75": "This is too large. It will fold out too many hands that you want to get value from."
      }
    },
    {
      "question": "You're in the cutoff with 8♠ 7♠. UTG limps, MP limps, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Raise to 3x",
        "Fold",
        "Raise to 5x"
      ],
      "type": "MCQs",
      "correctAnswers": ["Raise to 3x"],
      "score": 10,
      "explanations": {
        "Call": "Calling with 87s in the CO against limpers is too passive. You have position and should raise to isolate.",
        "Raise to 3x": "Perfect! 87s is a good hand to raise in the CO against limpers. You have position and can play post-flop well.",
        "Fold": "Folding 87s in the CO against limpers is too tight. This is a profitable spot to raise.",
        "Raise to 5x": "5x is too large against limpers. 3x is sufficient to isolate and build the pot."
      }
    },
    {
      "question": "You're in a tournament with 15 big blinds. You're in early position with J♠ T♣. Action is to you. What should you do?",
      "choices": [
        "Raise to 3x",
        "Call",
        "Fold",
        "All-in"
      ],
      "type": "MCQs",
      "correctAnswers": ["Fold"],
      "score": 10,
      "explanations": {
        "Raise to 3x": "Raising JT from early position is too aggressive. This hand is not strong enough to raise from UTG.",
        "Call": "Calling with JT from early position is too loose. This hand is not strong enough to call from UTG.",
        "Fold": "Correct! JT is too weak to play from early position. You need a much stronger hand to raise from UTG.",
        "All-in": "Going all-in with JT from early position is way too aggressive. This hand is not strong enough."
      }
    },
    {
      "question": "You're on the button with 6♠ 5♠. The flop comes 4♠ 3♣ 2♠. UTG bets $10, MP calls, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Raise to $30",
        "Fold",
        "Raise to $50"
      ],
      "type": "MCQs",
      "correctAnswers": ["Raise to $30"],
      "score": 10,
      "explanations": {
        "Call": "Calling is too passive. You have a straight draw and flush draw - this is a very strong hand that should be raised.",
        "Raise to $30": "Perfect! You have a straight draw and flush draw. Raising builds the pot and gives you multiple ways to win.",
        "Fold": "Folding with a straight draw and flush draw would be a major mistake. This is a very strong drawing hand.",
        "Raise to $50": "This is too large. It will fold out too many hands and reduce your potential winnings."
      }
    }
  ]
}
