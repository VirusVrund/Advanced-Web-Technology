from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    return render_template(
        "index.html",
        sum_result=None,
        num1="",
        num2="",
    )


@app.route("/calculate-sum", methods=["POST"])
def calculate_sum():
    num1 = request.form.get("num1", "").strip()
    num2 = request.form.get("num2", "").strip()
    result = None

    try:
        if num1 and num2:
            result = float(num1) + float(num2)
    except ValueError:
        result = "Invalid input"

    return render_template(
        "index.html",
        sum_result=result,
        num1=num1,
        num2=num2,
    )


if __name__ == "__main__":
    app.run(debug=True)
