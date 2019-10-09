#!/usr/bin/python
import psycopg2
from flask import Flask, Response
from flask import jsonify
#from flask_sqlalchemy import SQLAlchemy
import pandas as pd
import pandas.io.sql as psql
import json

hostname = 'localhost'
username = 'postgres'
password = 'swinub'
database = 'CookBox'
schema = 'cbschema'

# Simple routine to run a query on a database and print the results:
def queryRecipes(conn, schema, table, id = 0):

    query = "SELECT * FROM cbschema.recipes"
    if id != 0:
        query = f"SELECT * FROM cbschema.recipes WHERE recipe_id = {id}"
    # cur.execute(query)
    df = psql.read_sql(query, conn)
    # df = DataFrame(curr.fetchall(), columns = ["recipe_id", "name"])
    # data = pd.read_sql(query, cur)
    print(df)
    return df

    # cur.execute( "SELECT recipe_id, name FROM cbschema.recipes" )

    # for recipe_id, name in cur.fetchall() :
    #     print(recipe_id, name)


conn = psycopg2.connect( host=hostname, user=username, password=password, dbname=database )
app = Flask(__name__)

@app.route('/')
def main():
    return 'Server Works!'
  
@app.route('/recipes', methods=['GET'])
def getAllRecipes():
    res = queryRecipes(conn, schema, "recipes")
    res_json =  json.loads(res.to_json(orient='records'))
    return jsonify(res_json)
    # print(res)

@app.route('/recipes/<id>', methods=['GET'])
def getRecipe(id):
    res = queryRecipes(conn, schema, "recipes", id)
    res_json =  json.loads(res.to_json(orient='records'))
    return jsonify(res_json)


# @app.after_request
# def after_request(response):
#     return response

if __name__ == '__main__':
    app.run(debug = True)