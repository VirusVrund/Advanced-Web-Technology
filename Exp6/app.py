from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
tasks = []


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html", tasks=tasks)


@app.route("/add-task", methods=["POST"])
def add_task():
    task = request.form.get("task", "").strip()
    if task:
        tasks.append({"id": len(tasks), "text": task, "completed": False})
    return redirect(url_for("index"))


@app.route("/complete-task/<int:task_id>", methods=["POST"])
def complete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks[task_id]["completed"] = not tasks[task_id]["completed"]
    return redirect(url_for("index"))


@app.route("/delete-task/<int:task_id>", methods=["POST"])
def delete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks.pop(task_id)
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(debug=True)
