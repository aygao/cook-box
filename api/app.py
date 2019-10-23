from flask import Flask, request, jsonify
from flask_api import status
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from models import Recipes, Steps, Ingredients


@app.route('/')
def index():
    return 'login here!'


@app.route('/recipes/', methods=['GET'])
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
        return str(e), status.HTTP_404_NOT_FOUND


# @app.route("/recipes/", methods=['POST'])
# def addRecipe():
#     user_id = request.form.get('user_id')
#     name = request.form.get('name')
#     description = request.form.get('description')
#     tags = request.form.getlist('tags')
#     print(description)
#     print(name)
#     try:
#         recipe = Recipes(
#             user_id=user_id,
#             name=name,
#             description=description,
#             tags=tags
#         )
#         db.session.add(recipe)
#         db.session.commit()
#         return str(recipe.recipe_id)
#     except Exception as e:
#         return str(e)

@app.route("/recipes/", methods=['POST'])
def addRecipe():
    content = request.get_json()
    print(content)
    user_id = content.get('user_id')
    name = content.get('name')
    description = content.get('description')
    tags = content.get('tags')
    try:
        recipe = Recipes(
            user_id=user_id,
            name=name,
            description=description,
            tags=tags
        )
        db.session.add(recipe)
        db.session.commit()
        return str(recipe.recipe_id)
    except Exception as e:
        return str(e)


@app.route("/recipes/<id>", methods=['PUT'])
def updateRecipe(id):
    try:
        recipe = Recipes.query.filter_by(recipe_id=id).first()
        recipe.user_id = request.form.get('user_id')
        recipe.name = request.form.get('name')
        recipe.description = request.form.get('description')
        recipe.tags = request.form.getlist('tags')
        recipe.update_dttm = datetime.now()
        db.session.commit()
        return "Recipe " + recipe.name + " was updated"
    except Exception as e:
        return str(e)


@app.route("/recipes/<id>", methods=['DELETE'])
def deleteRecipe(id):
    try:
        Recipes.query.filter_by(recipe_id=id).delete()
        db.session.commit()
        return f"Recipe {id} was deleted"
    except Exception as e:
        return str(e)


@app.route("/recipes/ingredients/<recipe_id>", methods=['GET'])
def getIngredients(recipe_id):
    try:
        ingredients = Ingredients.query.filter_by(recipe_id=recipe_id).all()
        return jsonify([e.serialize() for e in ingredients])
    except Exception as e:
        return str(e)


@app.route("/recipes/steps/<recipe_id>", methods=['GET'])
def getSteps(recipe_id):
    try:
        steps = Steps.query.filter_by(recipe_id=recipe_id).all()
        return jsonify([e.serialize() for e in steps])
    except Exception as e:
        return str(e)


@app.route("/recipes/ingredients/", methods=['POST'])
def addIngredients():

    content = request.get_json()
    recipe_id = content.pop(len(content) - 1)

    # try:
    #     Recipes.query.filter_by(recipe_id=recipe_id).delete()
    #     db.session.commit()
    #     return f"Recipe {id} steps were deleted"
    # except Exception as e:
    #     return str(e)

    for i in range(0, len(content) - 1, 1):
        quantity = content[i].get('quantity')
        name = content[i].get('name')
        notes = content[i].get('info')
        try:
            ingredients = Ingredients(
                recipe_id=recipe_id,
                ingredient_id=i+1,
                name=name,
                quantity=quantity,
                notes=notes
            )
            db.session.add(ingredients)
            db.session.commit()
        except Exception as e:
            return str(e)
    return "ingredients added"


@app.route("/recipes/steps/", methods=['POST'])
def addSteps():
    content = request.get_json()
    recipe_id = content.pop(len(content) - 1)

    # try:
    #     Recipes.query.filter_by(recipe_id=recipe_id).delete()
    #     db.session.commit()
    #     return f"Recipe {id} steps were deleted"
    # except Exception as e:
    #     return str(e)

    for i in range(0, len(content) - 1, 1):
        info = content[i]
        try:
            steps = Steps(
                recipe_id=recipe_id,
                step_num=i+1,
                info=info
            )
            db.session.add(steps)
            db.session.commit()
        except Exception as e:
            return str(e)
    return "steps added"


if __name__ == '__main__':
    app.run(debug=True)
