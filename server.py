from flask import Flask, request, jsonify
import random
import string
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

def generate(lenght):
    lower = random.choice(string.ascii_lowercase)
    upper = random.choice(string.ascii_uppercase)
    number = random.choice(string.digits)
    punct = random.choice(string.punctuation)
    passw = string.ascii_letters + string.digits + string.punctuation
    rest= ''.join(random.choices(passw, k=lenght-4))
    all_chars = list(lower + upper + number + punct + rest)
    random.shuffle(all_chars)

    result= ''.join(all_chars)
    assert len(result) ==lenght, generate(lenght)
    return result

    



@app.route("/generate", methods=["GET"])
def generate_password():
    lenght = request.args.get("dlugosc", default=12, type=int)
    if lenght < 12:
        return jsonify({"error": "Długość musi być > 11"}), 400
    passwd=generate(lenght)
    
    print(f"Serwer wygenerował: {passwd}")
    return jsonify({"haslo": passwd})



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)