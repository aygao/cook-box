from app import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime


class Recipes(db.Model):
    __tablename__ = 'recipes'
    __table_args__ = ({"schema": "cbschema"})

    recipe_id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(5000))
    tags = db.Column(db.ARRAY(db.String(255)))
    notes = db.Column(db.String(5000))
    create_dttm = db.Column(db.DateTime, nullable=False)
    update_dttm = db.Column(db.DateTime)
    steps = relationship("Steps", backref="recipes", passive_deletes=True)
    ingredients = relationship("Ingredients", backref="recipes", passive_deletes=True)

    def __init__(self, name, user_id, description, tags):
        self.name = name
        self.user_id = user_id
        self.description = description
        self.tags = tags
        self.create_dttm = datetime.now()

    def __repr__(self):
        return '<id {}>'.format(self.recipe_id)

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


class Steps(db.Model):
    __tablename__ = 'steps'
    __table_args__ = ({"schema": "cbschema"})

    recipe_id = db.Column(
        db.BigInteger,
        ForeignKey('cbschema.recipes.recipe_id', ondelete='CASCADE'),
        primary_key=True)
    step_num = db.Column(db.BigInteger, primary_key=True)
    info = db.Column(db.String(5000))
    create_dttm = db.Column(db.DateTime, nullable=False)
    update_dttm = db.Column(db.DateTime)

    def __init__(self, recipe_id, step_num, info):
        self.recipe_id = recipe_id
        self.step_num = step_num
        self.info = info
        self.create_dttm = datetime.now()

    def __repr__(self):
        return '<id {}>'.format(self.step_num)

    def serialize(self):
        return {
            'recipe_id': self.recipe_id,
            'step_num': self.step_num,
            'info': self.info,
            'create_dttm': self.create_dttm,
            'update_dttm': self.update_dttm
        }


class Ingredients(db.Model):
    __tablename__ = 'ingredients'
    __table_args__ = ({"schema": "cbschema"})

    recipe_id = db.Column(
        db.BigInteger,
        ForeignKey('cbschema.recipes.recipe_id', ondelete='CASCADE'),
        primary_key=True)
    ingredient_id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255))
    quantity = db.Column(db.String(100))
    notes = db.Column(db.String(255))
    create_dttm = db.Column(db.DateTime, nullable=False)
    update_dttm = db.Column(db.DateTime)

    def __init__(self, recipe_id, ingredient_id, name, quantity, notes):
        self.recipe_id = recipe_id
        self.ingredient_id = ingredient_id
        self.name = name
        self.quantity = quantity
        self.notes = notes
        self.create_dttm = datetime.now()

    def __repr__(self):
        return '<id {}>'.format(self.ingredient_id)

    def serialize(self):
        return {
            'recipe_id': self.recipe_id,
            'ingredient_id': self.ingredient_id,
            'name': self.name,
            'quantity': self.quantity,
            'notes': self.notes,
            'create_dttm': self.create_dttm,
            'update_dttm': self.update_dttm
        }
