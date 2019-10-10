from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os


hostname = 'localhost'
username = 'postgres'
database = 'CookBox'
schema = 'cbschema'


# conn = psycopg2.connect(
#     host=hostname,
#     user=username,
#     password=password,
#     dbname=database
# )

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import Recipes


@app.route('/')
def index():
    return 'login here!'


@app.route('/recipes', methods=['GET'])
def getAllRecipes():
    try:
        recipes = Recipes.query.all()
        return jsonify([e.serialize() for e in recipes])
    except Exception as e:
        return str(e)


@app.route('/recipes/<id>', methods=['GET'])
def getRecipe(id):
    try:
        recipe = Recipes.query.filter_by(recipe_id=id).first()
        return jsonify(recipe.serialize())
    except Exception as e:
        return str(e)


@app.route("/recipes/add", methods=['POST'])
def addRecipe():
    user_id = request.args.get('user_id')
    name = request.args.get('name')
    description = request.args.get('description')
    create_dttm = request.args.get('create_dttm')
    try:
        recipe = Recipes(
            user_id=user_id,
            name=name,
            description=description,
            create_dttm=create_dttm
        )
        db.session.add(recipe)
        db.session.commit()
        return "Recipe added. Recipe id = {}".format(recipe.recipe_id)
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run(debug=True)
