cd "/mnt/c/Users/jonlu/OneDrive/Documents/MS Courses/1 Fall 2025/Big Data/CS6220_Poker_Project/llm"


curl -fsSL https://ollama.com/install.sh | sh

ollama pull qwen2.5:7b
ollama pull llama3.1:8b-q5_K_M
ollama pull deepseek-coder:7b-q4_K_M
ollama pull gemma2:9b-q4_K_M