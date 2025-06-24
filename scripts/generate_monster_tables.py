import requests
from bs4 import BeautifulSoup, Tag
import json
import time
import os
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://browiki.org"
MEMORIAL_URL = f"{BASE_URL}/wiki/Memorial_das_Ondas"
API_KEY = os.getenv("DIVINE_PRIDE_API_KEY")
DIVINE_PRIDE_API = f"https://www.divine-pride.net/api/database/Monster/{{}}?apiKey={API_KEY}"

def get_monster_links():
    resp = requests.get(MEMORIAL_URL)
    soup = BeautifulSoup(resp.text, "html.parser")
    # Procura o header da seção "Modo - Bosque" por texto
    bosque_header = None
    for header in soup.find_all(['h2', 'h3']):
        if header.get_text(strip=True).lower().startswith("modo - bosque"):
            bosque_header = header
            break
    if not bosque_header:
        raise Exception("Seção 'Modo - Bosque' não encontrada.")
    monsters = []
    next_tag = bosque_header
    while True:
        next_tag = next_tag.find_next_sibling()
        if next_tag is None or (isinstance(next_tag, Tag) and next_tag.name in ["h2", "h3"]):
            break
        # Procura em tabelas
        if isinstance(next_tag, Tag) and next_tag.name == "table":
            for a in next_tag.find_all("a", href=True):
                href = a.get("href", "")
                monsters.append((a.text.strip(), BASE_URL + href))
    return monsters

def get_monster_id(monster_url):
    return monster_url.split("/")[-2]

def get_monster_xp(monster_id):
    url = DIVINE_PRIDE_API.format(monster_id)
    resp = requests.get(url)
    if resp.status_code == 200:
        data = resp.json()
        stats = data.get("stats", {})
        if not stats:
            return "", "", ""
        base_exp = stats.get("baseExperience", "")
        job_exp = stats.get("jobExperience", "")
        level = stats.get("level", "")
        return base_exp, job_exp, level
    return "", "", ""

if __name__ == "__main__":
    monsters = get_monster_links()
    result = []
    for name, url in monsters:
        monster_id = get_monster_id(url)
        base_exp, job_exp, level = get_monster_xp(monster_id)
        result.append({
            "nome": name,
            "id": monster_id,
            "base_exp": base_exp,
            "job_exp": job_exp,
            "level": level
        })
        print(f"{name}({monster_id}) - {level} - {base_exp}/{job_exp}")
        time.sleep(0.2)  # Para não sobrecarregar a API
    with open("src/lib/tables/monsters.json", "w", encoding="utf-8") as jsonfile:
        json.dump(result, jsonfile, ensure_ascii=False, indent=2)
