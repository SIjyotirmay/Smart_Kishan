from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
from torchvision import transforms
import io, json

app = Flask(__name__)
CORS(app)  # Allow all origins

# Load model & labels
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = torch.load("./models/vgg16_plantvillage.pth.pth", map_location=device)
model.eval()

with open("classes.json", "r") as f:
    idx2label = json.load(f)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225]),
])

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    img = Image.open(file.stream).convert("RGB")
    x = transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(x)
        probs = torch.softmax(outputs, dim=1)[0]
        top_idx = probs.argmax().item()

    return jsonify({
        "disease": idx2label[str(top_idx)],
        "confidence": float(probs[top_idx])
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
