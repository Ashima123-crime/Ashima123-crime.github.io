from flask import Flask,render_template
import csv
import json
app = Flask(__name__)

@app.route('/')
def hello_name1():
   # file=r'./static/crime.csv'
   # fd=open(file)
   # fl=tuple(fd.readline().strip().split(','))
   # reader = csv.DictReader( fd, fieldnames = (fl))  
   # out = json.dumps( [ row for row in reader ] )
   # fd=open(r'./static/data.json','w')
   # fd.write(out)
   # fd.close()
   return render_template('index.html')
   
@app.route('/<abc>/<pqr>')
def hello(abc,pqr):
   return (abc)
app.run(debug = True,port=8000)


# from flask import Flask,render_template
# import csv
# import json
# app = Flask(__name__)

# def hello_name():
   # file=r'./static/crime.csv'
   # fd=open(file)
   # fl=tuple(fd.readline().strip().split(','))
   # reader = csv.DictReader( fd, fieldnames = (fl))  
   # out = json.dumps( [ row for row in reader ] )
   # fd=open(r'./static/data.json','w')
   # fd.write(out)
   # fd.close()
# hello_name()  

