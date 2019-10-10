from app import db
from datetime import datetime


class Recipes(db.Model):
    __tablename__ = 'recipes'
    __table_args__ = ({"schema": "cbschema"})

    recipe_id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(5000))
    tags = db.Column(db.ARRAY(db.String(255)))
    create_dttm = db.Column(db.DateTime, nullable=False)
    update_dttm = db.Column(db.DateTime)

    def __init__(self, name, user_id, description, tags, create_dttm):
        self.name = name
        self.user_id = user_id
        self.description = description
        self.tags = tags
        self.create_dttm = datetime.now()

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'recipe_id': self.recipe_id,
            'name': self.name,
            'user_id': self.user_id,
            'description': self.description,
            'tags': self.tags,
            'create_dttm': self.create_dttm,
            'update_dttm': self.update_dttm
        }


# class RecipeSteps(db.Model):

#     step_id = db.Column(db.Integer, primary_key=True)
#     recipe_id = db.Column(db.Integer)
#     name = db.Column(db.String(80), nullable=False)
#     step_number = db.Column(db.Integer)

#     def __repr__(self):
#         return '<recipeSteps %r>' % self.name
