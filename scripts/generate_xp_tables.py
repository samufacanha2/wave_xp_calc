import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("DIVINE_PRIDE_API_KEY")
EXPERIENCE_API = f"https://www.divine-pride.net/api/database/Experience?apiKey={API_KEY}"

if __name__ == "__main__":
    resp = requests.get(EXPERIENCE_API)
    if resp.status_code == 200:
        data = resp.json()
        with open("src/lib/tables/xp_tables.json", "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print("Arquivo xp_tables.json gerado com sucesso!")
    else:
        print(f"Erro ao consultar API: {resp.status_code}")
