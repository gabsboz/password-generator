from flask import Flask, request, jsonify
import random
import string
from flask_cors import CORS  

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

def generate(length):
    lower = random.choice(string.ascii_lowercase)
    upper = random.choice(string.ascii_uppercase)
    number = random.choice(string.digits)
    punct = random.choice(string.punctuation)
    passw = string.ascii_letters + string.digits + string.punctuation
    rest = ''.join(random.choices(passw, k=length-4))
    
    all_chars = list(lower + upper + number + punct + rest)
    random.shuffle(all_chars)

    result = ''.join(all_chars)
    return result

@app.route("/generate", methods=["GET"])
def generate_password():
    try:
        length = request.args.get("dlugosc", default=12, type=int)
        if length < 12:
            return jsonify({"error": "Długość musi być większa niż 11"}), 400
        passwd = generate(length)
        print(f"Serwer wygenerował hasło: {passwd}")
        return jsonify({"haslo": passwd})
    except ValueError:
        return jsonify({"error": "Nieprawidłowa wartość parametru 'dlugosc'"}), 400

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
