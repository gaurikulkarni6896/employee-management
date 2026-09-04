from flask import Flask, request, jsonify
from flask_cors import CORS

from database import get_db_connection, create_table

app = Flask(__name__)
CORS(app)

create_table()


# GET - Get all employees
@app.route("/api/employees", methods=["GET"])
def get_employees():

    connection = get_db_connection()

    employees = connection.execute(
        "SELECT * FROM employees"
    ).fetchall()

    connection.close()

    return jsonify([dict(employee) for employee in employees])


# GET - Get employee by ID
@app.route("/api/employees/<int:id>", methods=["GET"])
def get_employee(id):

    connection = get_db_connection()

    employee = connection.execute(
        "SELECT * FROM employees WHERE id = ?",
        (id,)
    ).fetchone()

    connection.close()

    if employee is None:
        return jsonify({
            "message": "Employee not found"
        }), 404

    return jsonify(dict(employee))


# POST - Create employee
@app.route("/api/employees", methods=["POST"])
def create_employee():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    department = data.get("department")

    if not name or not email or not department:
        return jsonify({
            "message": "All fields are required"
        }), 400

    connection = get_db_connection()

    cursor = connection.execute(
        """
        INSERT INTO employees
        (name, email, department)
        VALUES (?, ?, ?)
        """,
        (name, email, department)
    )

    connection.commit()

    employee_id = cursor.lastrowid

    connection.close()

    return jsonify({
        "message": "Employee created successfully",
        "id": employee_id
    }), 201


# PUT - Update employee
@app.route("/api/employees/<int:id>", methods=["PUT"])
def update_employee(id):

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    department = data.get("department")

    connection = get_db_connection()

    cursor = connection.execute(
        """
        UPDATE employees
        SET name = ?, email = ?, department = ?
        WHERE id = ?
        """,
        (name, email, department, id)
    )

    connection.commit()

    connection.close()

    if cursor.rowcount == 0:
        return jsonify({
            "message": "Employee not found"
        }), 404

    return jsonify({
        "message": "Employee updated successfully"
    })


# DELETE - Delete employee
@app.route("/api/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):

    connection = get_db_connection()

    cursor = connection.execute(
        "DELETE FROM employees WHERE id = ?",
        (id,)
    )

    connection.commit()

    connection.close()

    if cursor.rowcount == 0:
        return jsonify({
            "message": "Employee not found"
        }), 404

    return jsonify({
        "message": "Employee deleted successfully"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)