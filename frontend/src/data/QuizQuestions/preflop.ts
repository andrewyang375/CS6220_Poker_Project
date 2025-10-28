
import { Topic } from '.'

export const preflop: Topic = {
  "topic": "Pre-Flop Strategy",
  "level": "Intermediate",
  "totalQuestions": 10,
  "totalScore": 100,
  "questions": [
    {
      "question": "You're in early position (UTG) at a 6-max table with A♠ K♣. Action is to you. What should you do?",
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
        "Raise to 3x": "AK is a premium hand that should be raised for value. 3x is the standard sizing from UTG to build the pot and narrow the field.",
        "Call": "Calling with AK from UTG is too passive. You want to raise for value and information.",
        "Fold": "Folding AK from UTG would be a major mistake. This is one of the strongest starting hands in poker.",
        "Raise to 5x": "5x is too large from UTG. It will fold out too many hands and reduce your potential winnings."
      }
    },
    {
      "question": "You're on the button with 7♠ 6♠. UTG limps, MP limps, and action is to you. What should you do?",
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
        "Call": "Calling with 76s on the button is too passive. You have position and should raise to isolate the limpers.",
        "Raise to 3x": "Perfect! 76s is a good hand to raise on the button against limpers. You have position and can play post-flop well.",
        "Fold": "Folding 76s on the button against limpers is too tight. This is a profitable spot to raise.",
        "Raise to 5x": "5x is too large against limpers. 3x is sufficient to isolate and build the pot."
      }
    },
    {
      "question": "You're in the small blind with 2♠ 2♣. The button raises to 3x, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Fold",
        "Raise to 9x",
        "Call and check-raise flop"
      ],
      "type": "MCQs",
      "correctAnswers": ["Call"],
      "score": 10,
      "explanations": {
        "Call": "Correct! 22 is a good hand to call with in the SB. You have good implied odds if you hit a set.",
        "Fold": "Folding 22 in the SB against a button raise is too tight. The pot odds and implied odds make this profitable.",
        "Raise to 9x": "Raising 22 from the SB is generally not recommended. You want to see a cheap flop and hit a set.",
        "Call and check-raise flop": "This is too aggressive with 22. You want to see a cheap flop first."
      }
    },
    {
      "question": "You're in middle position with K♠ Q♣. UTG raises to 3x, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Fold",
        "Raise to 9x",
        "Call and 3-bet if re-raised"
      ],
      "type": "MCQs",
      "correctAnswers": ["Call"],
      "score": 10,
      "explanations": {
        "Call": "KQ is a good hand to call with in MP. It has good playability and can make strong hands post-flop.",
        "Fold": "Folding KQ in MP against a UTG raise is too tight. This is a profitable call.",
        "Raise to 9x": "Raising KQ from MP against a UTG raise is too aggressive. You want to see a flop with this hand.",
        "Call and 3-bet if re-raised": "This is too complex. Just call and see the flop."
      }
    },
    {
      "question": "You're in the big blind with A♠ 2♠. UTG raises to 3x, MP calls, CO calls, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Fold",
        "Raise to 9x",
        "Call and lead flop"
      ],
      "type": "MCQs",
      "correctAnswers": ["Call"],
      "score": 10,
      "explanations": {
        "Call": "A2s is a good hand to call with in the BB. You have good pot odds and can make strong hands post-flop.",
        "Fold": "Folding A2s in the BB with these pot odds is too tight. The implied odds make this profitable.",
        "Raise to 9x": "Raising A2s from the BB is too aggressive. You want to see a cheap flop with this hand.",
        "Call and lead flop": "This is too aggressive. Just call and see what develops."
      }
    },
    {
      "question": "You're on the button with J♠ T♣. UTG raises to 3x, MP calls, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Fold",
        "Raise to 9x",
        "Call and float flop"
      ],
      "type": "MCQs",
      "correctAnswers": ["Call"],
      "score": 10,
      "explanations": {
        "Call": "JT is a good hand to call with on the button. You have position and good playability post-flop.",
        "Fold": "Folding JT on the button against a UTG raise is too tight. This is a profitable call.",
        "Raise to 9x": "Raising JT from the button against a UTG raise is too aggressive. You want to see a flop.",
        "Call and float flop": "This is too complex. Just call and see the flop."
      }
    },
    {
      "question": "You're in early position (UTG) with 9♠ 9♣. Action is to you. What should you do?",
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
        "Raise to 3x": "99 is a premium hand that should be raised for value. 3x is the standard sizing from UTG.",
        "Call": "Calling with 99 from UTG is too passive. You want to raise for value and narrow the field.",
        "Fold": "Folding 99 from UTG would be a major mistake. This is a strong starting hand.",
        "Raise to 5x": "5x is too large from UTG. It will fold out too many hands and reduce your potential winnings."
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
      "question": "You're in the small blind with A♠ K♣. The button raises to 3x, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Raise to 9x",
        "Fold",
        "Call and check-raise flop"
      ],
      "type": "MCQs",
      "correctAnswers": ["Raise to 9x"],
      "score": 10,
      "explanations": {
        "Call": "Calling with AK from the SB is too passive. You want to raise for value and narrow the field.",
        "Raise to 9x": "Correct! AK is a premium hand that should be 3-bet for value. 9x is a good sizing to get value from worse hands.",
        "Fold": "Folding AK from the SB would be a major mistake. This is one of the strongest starting hands in poker.",
        "Call and check-raise flop": "This is too complex. Just 3-bet pre-flop for value."
      }
    },
    {
      "question": "You're in the big blind with 3♠ 2♣. UTG raises to 3x, MP calls, CO calls, and action is to you. What should you do?",
      "choices": [
        "Call",
        "Fold",
        "Raise to 9x",
        "Call and lead flop"
      ],
      "type": "MCQs",
      "correctAnswers": ["Fold"],
      "score": 10,
      "explanations": {
        "Call": "Calling with 32o in the BB is too loose. This hand has very little playability post-flop.",
        "Fold": "Correct! 32o is too weak to call with in the BB. You need a much stronger hand to call here.",
        "Raise to 9x": "Raising 32o from the BB is way too aggressive. This hand has no value.",
        "Call and lead flop": "This is too aggressive with such a weak hand. Just fold."
      }
    }
  ]
}
