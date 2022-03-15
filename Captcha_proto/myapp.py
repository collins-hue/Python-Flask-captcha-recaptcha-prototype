import datetime
import os
import random
import sqlite3

from flask import Flask, render_template, request

app = Flask(__name__,

            static_url_path='/static',
            static_folder='static',
            template_folder='Templates',
            )
con = sqlite3.connect("Remote.db")

#first, uncomment below code to create db the comment it out after runing the application
#con.execute('CREATE TABLE remotebase (name TEXT, user_id TEXT, image TEXT, time TIMESTAMP)')
con.close()

time = datetime.datetime.now()
imgs = os.listdir('/home/montego/flaskjects/static/input')
imgs = ['' + file for file in imgs]


@app.route("/", methods=["POST", "GET"])
def main():
    photo = random.sample(imgs, k=1)

    msg = "msg"

    if request.method == "POST":
        try:
            image = photo.__str__()
            name = request.form['name']
            user_id = request.form['user_id']

            with sqlite3.connect("Remote.db") as con:
                cur = con.cursor()
                cur.execute('INSERT INTO remotebase (name,user_id,image,time) VALUES (?,?,?,?)',
                            (name, user_id, image, time))
                con.commit()
                msg = "User Successfully added"

        except:
            con.rollback()
            msg = "Error, UURGHH"
            con.close()
        finally:
            return render_template("index.html", msg=msg, photo=photo)
            con.close()
    else:
        return render_template("index.html", photo=photo)


@app.route("/letscallitadminpage", methods=["POST", "GET"])
def adminpage():
    photo = random.sample(imgs, k=1)
    msg = "msg"
    con = sqlite3.connect("Remote.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("select * from remotebase")
    rows = cur.fetchall()
    if request.method == "POST":
        try:
            image = photo.__str__()
            name = request.form['name']
            user_id = request.form['user_id']

            with sqlite3.connect("Remote.db") as con:
                cur = con.cursor()
                cur.execute('INSERT INTO remotebase (name,user_id,image,time) VALUES (?,?,?,?)',
                            (name, user_id, image, time))
                con.commit()
                msg = "User Successfully added"

        except:
            con.rollback()
            msg = "Error, UURGHH"
            con.close()
        finally:
            return render_template("admin.html", msg=msg, photo=photo)
            con.close()
    else:
        return render_template("admin.html", rows=rows, photo=photo)


@app.route("/letscallitdelete", methods=["POST", "GET"])
def admindel():
    msg = "msg"
    con = sqlite3.connect("remotebase.db")
    con.row_factory = sqlite3.Row
    cur = con.cursor()
    cur.execute("select * from remotebase")
    rows = cur.fetchall()
    if request.method == "POST":
        try:
            name = request.form['name']
            with sqlite3.connect("register.db") as con:
                cur = con.cursor()
                cur.execute('DELETE FROM remotebase  WHERE name = ?',
                            [name])
                con.commit()
                msg = "User deleted successfully"
        except:
            con.rollback()
            msg = "failed"
        finally:
            return render_template("delet.html", msg=msg, rows=rows)
            con.close()
    else:
        return render_template("delet.html", rows=rows)


if __name__ == "__main__":
    app.run()
