import re

def get_legal_moves(instruction: str) -> list[str]:
    """Extract legal moves from the instruction string.

    Args:
        instruction (str): The instruction string containing legal moves.
    """
    # Regular expression to match legal moves
    legal_moves_pattern = r"<(FOLD|CHECK|CALL|BET \d+|RAISE \d+|ALL IN)>"
    legal_moves = re.findall(legal_moves_pattern, instruction)
    return legal_moves